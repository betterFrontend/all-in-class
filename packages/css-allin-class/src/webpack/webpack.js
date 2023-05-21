import { fileURLToPath } from 'url'
import fs from 'fs'
import { dirname, resolve, join, isAbsolute, normalize } from 'path'
import { PLUGIN_NAME, PLUGIN_PREFIX } from '../constant'
import { createStyleSheet } from '../styles/createStyleSheet'
import { getEnv } from '../utils/envInfo.js'
import { genOutputStr } from '../utils/style'
import { normalizeAbsolutePath } from '../utils/path'
import { reloadConfig } from '../utils/getConfig'
import { transformVueClass } from '../utils/transform'
import { genStyle } from '../styles'
import { log } from '../utils'

const webpackwebpack = require('webpack-sources')
const RawSource = webpackwebpack.RawSource

const _dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))
const TRANSFORM_LOADER = resolve(_dirname, './loader')
const env = getEnv()

class WebpackPlugin {
  constructor(userConfig = {}) {
    this.modelsCssCache = {} // 记录每个模块的css变动
    this.outputCssCache = {} // 生成过的css缓存，用于输出css
    this.styleSheet = {
      staticRules: {},
      dynamicRules: {},
      dynamicCompRules: {}
    } //
    this.hasStyleSheet = false
    this.isFirst = true
    this.lastModifiedTime = null
    this.resetAll = null
    this.namename = '111111'
    this.depFiles = [
      {
        normalPath: env.configPath,
        name: 'configPath',
        path: ''
      }
    ]
    this.changeTime = {}

    this.numm = 0

    this.changeTime[env.configPath] = null
    this.setConfig(userConfig)
  }
  // 经验
  // 单个方法
  // 控制代码长度
  // 控制代码分支
  async setConfig(userConfig) {
    this.userConfig = userConfig
    this.config = Object.assign({ out: './public.css' }, userConfig)
  }
  async apply(compiler) {
    this.compiler = compiler

    this.injectHooksEvent()
  }
  transform(code, id) {
    const res = transformVueClass(code, id) // 解析获取toekn
    let changed = genStyle(res.classTokens, this, id) // 生成css

    // return res
  }
  injectHooksEvent() {
    this.useTransformLoader() // 增加loader
    this.hooksCreateStyleSheet() // 创建样式表
    this.hooksOutput() // 输出css
    this.hooksInjectPluginToLoader() // 给loader注入当前插件
  }
  useTransformLoader() {
    let useLoader = [
      {
        loader: TRANSFORM_LOADER,
        ident: PLUGIN_NAME + '-loader-ident',
        options: {}
      }
    ]

    if (env.isUniapp) {
      delete useLoader[0].ident // uniapp的微信小程序 不支持ident的存在
    }

    this.compiler.options.module.rules.unshift({
      enforce: 'pre',
      use: data => {
        if (!data.resource) return []

        const id = normalizeAbsolutePath(
          data.resource + (data.resourceQuery || '')
        )

        if (
          data.resource.endsWith('.vue') ||
          id.includes('vue?vue&type=template') ||
          id.endsWith('.vue') ||
          id.includes('vue?vue')
        ) {
          return useLoader
        }

        return []
      }
    })
  }
  hooksInjectPluginToLoader() {
    const meta = {
      framework: 'webpack',
      webpack: {
        compiler: this.compiler
      }
    }
    const plugin = Object.assign(this, {
      __pluginMeta: meta,
      __virtualModulePrefix: 'VIRTUAL_MODULE_PREFIX'
    })

    const injected = this.compiler.$_MainPluginContext || { plugin }
    this.compiler.$_MainPluginContext = injected
    injected.plugin = plugin

    this.compiler.hooks.thisCompilation.tap(PLUGIN_NAME, compilation => {
      compilation.hooks.childCompiler.tap(PLUGIN_NAME, childCompiler => {
        // 给loader注入当前plugin
        childCompiler.$_MainPluginContext = injected
      })
    })
  }
  hooksOutput() {
    this.compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      compilation.hooks.optimizeAssets.tapPromise(PLUGIN_NAME, async () => {
        const files = Object.keys(compilation.assets)
        for (const file of files) {
          if (file === '*') continue
          this.outputCssStr(compilation, file)
        }
      })
    })
  }
  outputCssStr(compilation, file) {
    let code = compilation.assets[file].source().toString()
    const fun = placeholder => {
      let outputStr = genOutputStr({ outputCss: this.outputCssCache })
      code = code.replace(placeholder, outputStr.replace(/\n*/g, ''))
      compilation.assets[file] = new RawSource(code)
      log('css已生成')

      if (this.config.preview) {
        this.outputCssTofile(outputStr)
      }
    }

    if (code.includes('.app-css-placeholder{color:#2c3e50}')) {
      // h5
      fun('.app-css-placeholder{color:#2c3e50}')
    } else if (code.includes('.app-css-placeholder{color:#2c3e50;}')) {
      // app，小程序
      fun('.app-css-placeholder{color:#2c3e50;}')
    }
  }
  outputCssTofile(outputStr) {
    // 输出css到文件进行预览
    const cssOutPutFilePath = join(env.projectRoot, this.config.preview)
    fs.writeFile(cssOutPutFilePath, outputStr, 'utf-8', err => {
      if (err) {
        throw new Error('写入数据失败')
      }
    })
  }

  async hooksCreateStyleSheet() {
    // 打包才会运行
    this.compiler.hooks.run.tapPromise(PLUGIN_NAME, compiler => {
      return this.createStyleSheet()
    })

    // 编译阶段运行
    this.compiler.hooks.watchRun.tapPromise(PLUGIN_NAME, compiler => {
      return this.createStyleSheet()
    })
  }
  createStyleSheet() {
    return new Promise(async (resl, reject) => {
      await this.initVueConfigChanged()
      const isChanged = await this.checkVueConfigChanged()
      if (isChanged) {
        this.hasStyleSheet = false
        // await this.reset()
      }

      if (this.hasStyleSheet) return resl()
      this.styleSheet = await createStyleSheet({ userConfig: this.userConfig })
      this.hasStyleSheet = true

      resl()
    })
  }

  initVueConfigChanged() {
    if (!this.isFirst) return

    this.isFirst = false
    return new Promise(async (resolve1, reject) => {
      let i = 0
      for (let dep of this.depFiles) {
        let lastModifiedTime = this.changeTime[dep.normalPath]
        try {
          await fs.stat(dep.normalPath, async (err, stats) => {
            i++
            if (!err && stats.mtimeMs !== lastModifiedTime) {
              this.changeTime[dep.normalPath] = stats.mtimeMs
              // 改变了
            } else {
              // 没有改变呀.
            }

            if (i == this.depFiles.length) {
              // await this.reloadConfig()
              resolve1(false)
            }
          })
        } catch (err) {
          continue
        }
      }
    })
  }
  statFile(isInit = false) {
    return new Promise(async (resolve1, reject) => {
      let i = 0
      for (let dep of this.depFiles) {
        let lastModifiedTime = this.changeTime[dep.normalPath]
        try {
          await fs.stat(dep.normalPath, (err, stats) => {
            i++
            if (!err && stats.mtimeMs !== lastModifiedTime) {
              this.changeTime[dep.normalPath] = stats.mtimeMs

              if (isInit) return
              return resolve1(true)
            } else {
            }

            if (i == this.depFiles.length) {
              resolve1(false)
            }
          })
        } catch (err) {
          continue
        }
      }
    })
  }
  checkVueConfigChanged() {
    return new Promise(async (resolve1, reject) => {
      let i = 0
      for (let dep of this.depFiles) {
        let lastModifiedTime = this.changeTime[dep.normalPath]
        try {
          await fs.stat(dep.normalPath, (err, stats) => {
            i++
            if (!err && stats.mtimeMs !== lastModifiedTime) {
              this.changeTime[dep.normalPath] = stats.mtimeMs

              return resolve1(true)
            } else {
            }

            if (i == this.depFiles.length) {
              resolve1(false)
            }
          })
        } catch (err) {
          continue
        }
      }
    })
  }
  watchConfigChange() {}
  async reset() {
    // await this.reloadConfig()
    // this.modelsCssCache = {} // 记录每个模块的css变动
    // this.outputCssCache = {} // 生成过的css缓存，用于输出css
    // this.styleSheet = {
    // 	staticRules: {},
    // 	dynamicRules: {},
    // 	dynamicCompRules: {}
    // } //
    // this.resetAll && this.resetAll(this)
  }
  async reloadConfig() {
    // 读取文件内容修改配置

    let { config, depFiles } = await reloadConfig({
      projectRoot: env.projectRoot
    })
    if (depFiles) {
      depFiles &&
        depFiles.push({
          normalPath: env.configPath,
          name: 'configPath',
          path: ''
        })
      this.depFiles = depFiles
    }
    if (config) {
      this.userConfig = config
    }
  }
}
export default WebpackPlugin
