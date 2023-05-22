import fs from 'fs'
import { resolve, join } from 'path'
import { electCompRules, electRules } from './index'
import { presetRules } from '../presetRules/index'
import {
  error,
  isArray,
  isFunction,
  isObject,
  isString,
  isPromise,
  warn
} from '../utils/index'
const sass = require('sass')
// import postcss from "postcss"
import { getEnv } from '../utils/envInfo'
import { addFix, removeFix } from '../utils/style'

interface StaticRules {
  [propname: string]: string
}
interface DynamicRules {
  [propname: string]: [RegExp, Function]
}
interface Rules {
  rules?: Array<Function>
  shortcuts?: string
}
interface Preset {
  rules?: Array<StaticRules | DynamicRules>
  shortcuts?: string
}
interface CssFile {
  input: string
  prefix: string
  suffix: string
  rmPrefix: string
  rmSuffix: string
}

interface UserConfig {
  prefix?: string
  suffix?: string
  unit?: string
  cssFile?: string | CssFile
  presets?: Array<Preset | Function>
  rules?: any[]
  shortcuts?: any[]
}
interface Optios {
  userConfig: UserConfig
}
// 创建规则的基础匹配表

export const createStyleSheet = (optios: Optios) => {
  return new Promise(async (resolve, reject) => {
    let { userConfig = {} } = optios
    let preset = presetRules(userConfig)

    if (userConfig.presets && isArray(userConfig.presets)) {
      for (let fun of userConfig.presets) {
        let pre
        if (typeof fun === 'function') {
          pre = await fun()
        } else if (typeof fun === 'object') {
          pre = fun
        }
        if (isPromise(fun)) {
          continue
        }
        if (!pre) {
          continue
        }
        // 合并rules
        if (preset.rules && pre.rules && isArray(pre.rules)) {
          preset.rules = preset.rules.concat(pre.rules)
        }

        if (preset.composition && pre.shortcuts && isArray(pre.shortcuts)) {
          preset.composition = preset.composition.concat(pre.shortcuts)
        }
      }
    }

    // 合并用户配置
    if (userConfig.rules && isArray(userConfig.rules)) {
      preset.rules = preset.rules.concat(userConfig.rules)
    }

    if (userConfig.shortcuts && isArray(userConfig.shortcuts)) {
      preset.composition = preset.composition.concat(userConfig.shortcuts)
    }

    // 区分动态和静态的规则
    let { dynamicRules, staticRules } = electRules(preset, userConfig)

    // 组合规则 组合是由多个单一的规则拼接在一起
    // Combi of atoms composition
    let { dynamicCompRules } = electCompRules(preset, staticRules, dynamicRules)

    // TODO
    // 根据css,自动生成动态的css 正则规则

    // 设置一个css文件地址,或者文件夹,读取内部的文件,生成css规则
    if (userConfig.cssFile) {
      let rulesByCssFile = await genRulesByCssFile(userConfig)
      // console.log('==== rulesByCssFile :', rulesByCssFile);

      staticRules = Object.assign(staticRules, rulesByCssFile)
    }
    resolve({
      staticRules,
      dynamicRules,
      dynamicCompRules
    })
    return {
      staticRules,
      dynamicRules,
      dynamicCompRules
    }
  })
}

/**
 * 设置一个css文件地址,或者文件夹,读取内部的文件,生成css规则
 * @param {string} fileOrDir 文件地址,或者文件夹
 * @return {object}
 * TODO
 * less转换的问题
 */
export const genRulesByCssFile = (userConfig: UserConfig) => {
  return new Promise(async (resolve, reject) => {
    const envInfo = getEnv()
    // cssFile: {
    // 	input:'./style/index.scss',
    // 	prefix: 'ff',
    // 	suffix: 'ff',
    // 	rmPrefix: 'ff',
    // 	rmSuffix: 'ff',
    // },
    let cssFile = ''
    if (typeof userConfig.cssFile === 'string') {
      cssFile = userConfig.cssFile
    } else if (userConfig.cssFile && isObject(cssFile)) {
      cssFile = userConfig.cssFile.input as string
    }

    let fileOrDir = join(envInfo.projectRoot, cssFile)

    let rules = await getFileCss(fileOrDir, userConfig)
    resolve(rules)
    return rules
  })
}

export function getFileCss(fileOrDir: string, userConfig: UserConfig) {
  return new Promise((rsl, reject) => {
    fs.stat(fileOrDir, async (err1, stats) => {
      if (err1) {
        let err: string = err1 + ''
        if (err.includes('no such file or directory')) {
          error('找不到当前文件或者路径：' + fileOrDir)
        }
        error(err)
        rsl({})
        return
      }

      if (stats.isFile()) {
        let rulesObj = await getFileRulers(fileOrDir, userConfig)
        rsl(rulesObj)
      }

      if (stats.isDirectory()) {
        fs.readdir(fileOrDir, async (err, files) => {
          if (err) {
            rsl({})
            throw err
          }

          let res = {}
          for (let file of files) {
            const filesDir = resolve(fileOrDir, './' + file)
            let fileres = await getFileCss(filesDir, userConfig)
            res = Object.assign(res, fileres)
          }
          rsl(res)
        })
      }
    })
  })
}

const getFileRulers = (fileOrDir: string, userConfig: UserConfig) => {
  return new Promise(async (resolve, reject) => {
    let cssStr: string = '',
      rulesObj = {}

    // 判断文件类型
    if (fileOrDir.endsWith('.scss')) {
      cssStr = asssCompile(fileOrDir)
      // writeFile(cssStr)
    } else if (fileOrDir.endsWith('.less')) {
      // TODO 测试
      // cssStr = await lessCompile(fileOrDir)
      // writeFile(cssStr)
    } else {
      try {
        cssStr = fs.readFileSync(fileOrDir, 'utf-8')
      } catch (err) {}
    }

    // cssFile: {
    // 	input:'./style/index.scss',
    // 	prefix: 'ff',
    // 	suffix: 'ff',
    // 	rmPrefix: 'ff',
    // 	rmSuffix: 'ff',
    // },
    // 添加前缀后缀,移除前缀后缀
    let { prefix, suffix, cssFile } = userConfig
    let rmPrefix: string, rmSuffix: string
    if (typeof cssFile === 'string') {
    } else if (cssFile && isObject(cssFile)) {
      prefix = cssFile.prefix
      suffix = cssFile.suffix
      rmPrefix = cssFile.rmPrefix
      rmSuffix = cssFile.rmSuffix
    }

    if (cssStr) {
      rulesObj = (cssStr.match(/(?=\.)[^\{\}]+\{[^\{\}]+(?=\})/g) || [])
        .map(item => item.replace(/^\.*|\s*/g, '').split('{'))
        .reduce((tol: StaticRules, cur) => {
          let key = cur[0]

          key = removeFix(key, rmPrefix, rmSuffix)
          key = addFix(key, prefix, suffix)
          tol[key] = cur[1]

          return tol
        }, {})
    }
    resolve(rulesObj)
    return rulesObj
  })
}

// async await 如何解决 传染性/传播性
function writeFile(str: string) {
  const envInfo = getEnv()
  fs.writeFile(
    join(envInfo.projectRoot, './cssCompiled.css'),
    str,
    'utf-8',
    function (err) {
      if (err) {
        throw new Error('写入数据失败')
      } else {
      }
    }
  )
}

function asssCompile(filePath: string) {
  let result = ''
  try {
    // result = sass.compile(filePath);
    const result = sass.renderSync({
      file: filePath
    })
    // console.log(result.css.toString());
    return result.css.toString()
  } catch (err1) {
    let err = err1 + ''
    if (err.includes('Undefined variable')) {
      error('sass文件内存在未定义的变量')
      // console.error('解决方案：');
    }

    error(err)
  }
  return result
}

// function lessCompile(lessInput: string) {
// 	return new Promise((rsl, reject) => {
// 		less.render(lessInput)
// 			.then((output) => {
// 				// output.css = string of css
// 				// output.map = string of sourcemap
// 				// output.imports = array of string filenames of the imports referenced
// 				rsl(output.css)
// 			},
// 				(err) => {
// 					error(err + '')
// 					rsl('')
// 				});
// 	})
// }
