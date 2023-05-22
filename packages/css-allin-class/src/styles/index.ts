import {
  error,
  isArray,
  isFunction,
  isObject,
  isString,
  warn
} from '../utils/index'
import { presetRules } from '../presetRules/index'
import { addFix } from '../utils/style'
import { getEnv } from '../utils/envInfo'
import { PLUGIN_PREFIX } from '../constant/index'

/**
 * 获取content中定义的 css样式名称
 * @param {String} content 字符串 vue文件template字符串
 * @return {Array} 数组 css样式名称
 */
export function matchClassToken(content = '', fun: Function) {
  const regword = /[^<>\{\}"'+`\s:]+/g
  const classReg =
    /(?<=class\s*\=\s*)(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+))?/g
  const numberRef = /^\d+$/g
  const commentRef = RegExp(
    `(?<=@${PLUGIN_PREFIX.toLocaleLowerCase()}\s*{\s*)([^}]*)+\s*`,
    'g'
  )

  let classArr: Array<string> = []

  // 匹配注释的 class
  const commentList = content.match(commentRef) ?? []
  classArr = classArr.concat(
    commentList.map(item => item.split(/\s*[\|,\s]\s*/).filter(Boolean)).flat()
  )

  // 匹配<> 内的 class
  let classList = content.match(classReg) ?? []

  for (let items of classList) {
    items = items.trim()
    if (items.length == 2) {
      continue
    }
    if (items && items.slice(1).startsWith('[')) {
      // 数组形式

      continue
    } else if (items && items.slice(1).startsWith('{')) {
      // 对象形式
      continue
    }
    fun && fun(items)

    let className =
      items.match(regword)?.filter(item => !numberRef.test(item)) || []
    classArr = classArr.concat(className)
  }

  return [...new Set(classArr)]
}

interface UserConfig {
  prefix?: string
  suffix?: string
  unit?: string
}

export interface CssValue {
  token: string
  noFixToken?: string
  type?: string
  num: number
  value: string
}

export interface ModelsCssCache {
  [propname: string]: Array<string>
}
export interface OutputCssCache {
  [propname: string]: CssValue
}
export interface StaticCompRules {
  [propname: string]: string
}
export interface Plugin {
  userConfig?: UserConfig
  modelsCssCache: ModelsCssCache
  outputCssCache: OutputCssCache
  styleSheet: StyleSheet
}

export interface StaticRules {
  [propname: string]: string
}

export interface DynamicCompRules {
  [propname: string]: [RegExp, Function]
}
export interface StyleSheet {
  staticRules: StaticRules
  dynamicRules: DynamicRules
  dynamicCompRules: DynamicCompRules
}

/**
 * 获取content中定义的 css样式名称
 * @param {object} styleSheet
 * @param {Array<string>} tokens
 * @return {Array} 数组 css样式名称
 */
export function genStyle(tokens: Array<string>, plugin: Plugin, id: string) {
  let { styleSheet, outputCssCache, modelsCssCache, userConfig } = plugin
  const modelsCss = (modelsCssCache[id] = modelsCssCache[id] || [])

  // 老数据中有, 新数据没有的, 减掉
  const reduced = modelsCss.filter((token: string) => {
    if (!tokens.includes(token)) {
      outputCssCache[token] && outputCssCache[token].num--
      return true
    }
  })

  // 老数据新数据都有, 老数据没有,新数据有, 新增
  const added = tokens.filter(token => {
    if (!token) return

    // 老数据有,新数据有,不增加次数
    if (modelsCss.includes(token)) return

    // 生成过的,直接使用,不需要再次进行匹配
    if (outputCssCache[token]) {
      // 老数据没有, 新数据有
      outputCssCache[token].num++
      return true
    }

    // 根据样式规则,匹配对应的值
    let css = genCssValue(token, styleSheet, (userConfig = {}))
    if (css) {
      outputCssCache[token] = css
      return true
    }
  })
  modelsCssCache[id] = tokens

  return {
    reduced,
    added,
    changeNum: reduced.length + added.length
  }
}

/**
 * 用户classToken来匹配对应值
 * @param {string} token class：p-10
 * @param {object} styleSheet 样式表
 */
export function genCssValue(
  token: string,
  styleSheet: StyleSheet,
  userConfig: UserConfig
) {
  let noFixToken = token
  if (
    userConfig &&
    userConfig.prefix &&
    noFixToken.startsWith(userConfig.prefix)
  ) {
    const regexp = RegExp(userConfig.prefix)
    noFixToken = noFixToken.replace(regexp, '')
  }

  const { staticRules, dynamicRules, dynamicCompRules } = styleSheet
  const value =
    staticRules[token] ||
    getDynamicCssValue(noFixToken, dynamicRules) ||
    getDynamicCompCssValue(
      noFixToken,
      dynamicCompRules,
      staticRules,
      dynamicRules
    )

  const type = token.endsWith('-i') ? 'important' : ''

  return (
    value && {
      token, // fix-flex
      noFixToken, // flex
      type,
      num: 1,
      value // 'display:flex;'
    }
  )
}

/**
 * 用户classToken来匹配值
 * @param {string} token class：p-10
 * @param {object} dynamicRules 动态规则样式表
 */
export function getDynamicCssValue(token: string, dynamicRules: DynamicRules) {
  const info = getEnv()
  const unit = info.userConfig.unit || 'rpx'

  for (const [reg, fun] of Object.values(dynamicRules)) {
    // [reg, fun] => [/^p-(\d+)$/, match => ({ 'padding': `${match[1]}${unit}` })],

    const regexp = RegExp(reg)
    let matchRes = token.match(regexp)
    if (!matchRes) continue

    let res: string | Record<string, string> = ''
    try {
      res = fun(matchRes, { unit })
    } catch (err) {
      error('规则错误：' + reg + fun.toString())
      error(err + '')
    }

    if (typeof res === 'string') {
      return res.endsWith(';') ? res : res + ';'
    }
    // if (isString(res)) return res.endsWith(';') ? res : res + ';'

    if (isObject(res)) {
      let [k, v] = Object.entries(res).flat()
      return `${k}:${v.endsWith(';') ? v : v + ';'}`
    }
  }
}

/**
 * 动态组合规则
 * @param {string} token p-10
 * @param {object} dynamicCompRules  { '/^btn-(.*)$/': [ 正则, 方法 ] }
 */
export function getDynamicCompCssValue(
  token: string,
  dynamicCompRules: DynamicCompRules,
  staticRules: StaticRules,
  dynamicRules: DynamicRules
) {
  // 根据token获取值 需要重构 能够全局公用
  let getValue = (token: string) => {
    let value =
      staticRules[token] ||
      getDynamicCssValue(token, dynamicRules) ||
      getDynamicCompCssValue(token, dynamicCompRules, staticRules, dynamicRules)
    return value || ''
  }

  // 生成classToken
  let classToken = []
  for (const [reg, fun] of Object.values(dynamicCompRules)) {
    // [reg, fun] => [/^p-(\d+)$/, match => ({ 'padding': `${match[1]}${unit}` })],

    const regexp = RegExp(reg)
    const matchRes = token.match(regexp)

    if (!matchRes) continue

    // 给用户提供 获取token匹配结果的能力
    let res
    try {
      res = fun(matchRes, getValue)
    } catch (err) {
      error('规则错误：' + reg + fun.toString())
      error(err + '')
    }

    if (isString(res)) {
      classToken = res.trim().replace(/ /g, '|').split('|')
      break
    }

    if (isObject(res)) {
      let [k, v] = Object.entries(res).flat()
      // classToken = `${k}:${v.endsWith(';') ? v : v+';'}`
    }

    // 方法直接返回最终结果 => color:red;
    if (isFunction(res)) {
      let str = res()

      return str // 例如 => color:red;
    }
  }

  // 生成最终样式
  let str = ''
  for (let token of classToken) {
    let css = staticRules[token] || getDynamicCssValue(token, dynamicRules)
    if (css) {
      str += css.endsWith(';') ? css : css + ';'
    } else {
      console.warn(`组合规则中的${token}未被定义`)
    }
  }
  return str
}

function isDynamicRule(
  rule: [RegExp, Function] | [string, string]
): rule is [RegExp, Function] {
  return Boolean(isArray(rule) && rule[0] && rule[1] && isFunction(rule[1]))
}

type DynamicRule = [RegExp, Function, string?]
type DynamicRules = Record<string, DynamicRule>

export interface Preset {
  rules: Array<[string, string] | [RegExp, Function]>
  composition?: Array<any>
}
/**
 * 用户classToken来匹配值
 * @param {object} preset {rules,....} 配置的规则
 * @param {object} userConfig
 */
export function electRules(preset: Preset, userConfig: UserConfig) {
  let dynamicRules: DynamicRules = {},
    staticRules: StaticRules = {}
  const { prefix, suffix } = userConfig

  for (let rule of preset.rules) {
    if (isDynamicRule(rule)) {
      let key = rule[0].toString()
      let val = rule[1]

      // [rule,()=>{}]
      dynamicRules[key] = rule
      continue
    }

    if (
      isArray(rule) &&
      rule[0] &&
      rule[1] &&
      isString(rule[0]) &&
      isString(rule[1])
    ) {
      let key = rule[0]
      let val = rule[1]
      // 添加前缀和后缀
      key = addFix(key, prefix, suffix)

      // {rule:value}
      staticRules[key] = val.replace(/ /g, '').endsWith(';') ? val : val + ';'
      continue
    }

    if (isObject(rule)) {
      // {
      // 	key: val
      // }
      for (let [key, val] of Object.entries(rule)) {
        if (isString(key) && isString(val)) {
          // 添加前缀和后缀
          key = addFix(key, prefix, suffix)

          // {rule:value}
          staticRules[key] = val.replace(/ /g, '').endsWith(';')
            ? val
            : val + ';'
        }
      }
      continue
    }

    // throw new Error(`非法的规则:${rule}`)
  }

  return { dynamicRules, staticRules }
}

export function electCompRules(
  preset: Preset,
  staticRules: StaticRules,
  dynamicRules: DynamicRules
) {
  let dynamicCompRules: DynamicCompRules = {},
    staticCompRules: StaticCompRules = {}
  let composition = []
  if (preset.composition && isObject(preset.composition)) {
    composition = Object.entries(preset.composition)
  } else if (isArray(preset.composition)) {
    composition = preset.composition as Array<any>
  } else {
    error('配置问题：组合规则类型错误，仅支持数组和对象的形式。')
    return { dynamicCompRules }
  }

  for (let rule of composition) {
    if (isArray(rule) && rule[0] && rule[1]) {
      if (isFunction(rule[1])) {
        dynamicCompRules[rule[0]] = rule
        continue
      }
      if (isString(rule[1])) {
        staticCompRules[rule[0]] = rule[1]
        continue
      }
    }

    if (isObject(rule)) {
      for (let [key, val] of Object.entries(rule)) {
        isString(key) && isString(val) && (staticCompRules[key] = val as string)
      }
      continue
    }

    throw new Error(`非法的规则:${rule}`)
  }
  // 拼接静态的组合规则的值
  combiCompRules(staticCompRules, staticRules, dynamicRules)

  return { dynamicCompRules }
}

// 匹配组合规则的值，提前组装到静态
function combiCompRules(
  staticCompRules: StaticCompRules,
  staticRules: StaticRules,
  dynamicRules: DynamicRules
) {
  for (let [key, val] of Object.entries(staticCompRules)) {
    if (staticRules[key]) {
      warn(
        `非法的规则:${key}已经存在，组合规则冲突，当前规则${val} 将会覆盖 ${key}${staticRules[key]}`
      )
      // continue
    }

    staticRules[key] = val
      .trim()
      .replace(/ /g, '|')
      .split('|')
      .reduce((pre, cur) => {
        let cssValue =
          staticRules[cur] || getDynamicCssValue(cur, dynamicRules) || ''
        if (!cssValue && cur) {
          warn(`组合规则中的${cur}规则未被定义`)
        }

        return (pre += cssValue)
      }, '')
  }
}
