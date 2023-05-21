import { PLUGIN_NAME, PLUGIN_PREFIX } from '../constant'
import { genStyle } from '../styles'
import MagicString from 'magic-string'
import { createStyleSheet } from '../styles/createStyleSheet'
import { getEnv } from '../utils/envInfo'
import { genOutputStr } from '../utils/style'
import { transformVueClass } from '../utils/transform'
const fs = require('fs')
const path = require('path')

export default function vitePlugin(userConfig) {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  function generateRandomString(length) {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' // 生成随机字符串时可能用到的字符集合
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength)) // 生成一个随机字符并添加到结果中
    }
    return result
  }

  let csspath = `assets/style1111111.${generateRandomString(10)}.css`
  let csspath1 = `assets/style1111111.${generateRandomString(10)}.css`
  let comcss = ''
  let styleSheet,
    outputCssCache = {},
    temp = {}
  let indexcssid
  let old
  let server
  let errCache = new Map()
  let iii = 0
  let bundleFileName = '11'

  const env = getEnv()
  const out = userConfig.out || './public.css'
  const fileDir = env.projectRoot
  let cssOutPutFilePath = path.join(fileDir, out)
  let timer

  const injectCssToBrowser = css => {
    server?.ws.send({
      type: 'custom',
      event: 'my:greetings',
      data: css
    })
  }

  function sleep() {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve()
        clearTimeout(timer)
      }, 5000)
    })
  }
  return {
    name: PLUGIN_NAME,
    order: 'pre',
    configResolved(resolvedConfig) {
      // resolvedConfig.vitepress.root outDir
      // resolvedConfig.vitepress.transformHead
      // env.MODE === 'production'
      const base = resolvedConfig.vitepress.site?.base
      if (base) {
        csspath += base
        csspath1 += base
      }

      let transformHead = function (context) {
        // console.log('transformHead执行');
        context.head.unshift(
          [
            'link',
            {
              rel: 'preload stylesheet',
              href: '/' + csspath,
              as: 'style'
            }
          ],
          [
            'link',
            {
              rel: 'preload stylesheet',
              href: '/' + csspath1,
              as: 'style'
            }
          ]
        )
      }

      let originalMethod1
      if (resolvedConfig.vitepress.transformHead) {
        if (resolvedConfig.vitepress.transformHead != transformHead) {
          // 获取属性描述符
          const descriptor = Object.getOwnPropertyDescriptor(
            resolvedConfig.vitepress,
            'transformHead'
          )

          // 保存原始方法
          originalMethod1 = descriptor.value

          // 重写方法
          descriptor.value = function () {
            originalMethod1.apply(this, arguments)
          }

          // 重新定义属性
          Object.defineProperty(
            resolvedConfig.vitepress,
            'transformHead',
            descriptor
          )
          // console.log('重写了transformHead');
        }
      } else {
        resolvedConfig.vitepress.transformHead = transformHead
      }

      let originalMethod
      let transformHtml = function () {
        // console.log('transformHtml执行了');
        originalMethod?.apply(this, arguments)
      }
      if (resolvedConfig.vitepress.transformHtml) {
        if (resolvedConfig.vitepress.transformHtml != transformHtml) {
          // 获取属性描述符 transformHtml
          const descriptor = Object.getOwnPropertyDescriptor(
            resolvedConfig.vitepress,
            'transformHtml'
          )

          // 保存原始方法
          originalMethod = descriptor.value

          // 重写方法
          descriptor.value = transformHtml

          // 重新定义属性
          Object.defineProperty(
            resolvedConfig.vitepress,
            'transformHtml',
            descriptor
          )
          // console.log('重写了transformHtml');
        }
      } else {
        resolvedConfig.vitepress.transformHtml = transformHtml
      }

      // // 测试新的方法
      // obj.aa();
    },
    configureServer(_server) {
      server = _server
      // console.log('==== server :', server);
    },
    async buildStart() {
      styleSheet = await createStyleSheet({ userConfig })
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
      return null
    },
    load(id) {
      if (id !== resolvedVirtualModuleId) {
        return null
      }

      if (server) {
        return `
				import {createHotContext as __vite__createHotContext1} from "/@vite/client";
				import.meta.hot = __vite__createHotContext1("@id/__x00__virtual:my-module");
				import {updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle} from "/@vite/client"
				const __vite__id = "C:/Users/cmz/Documents/HBuilderProjects/com-css-loader/com-css-loader/template/cli-vue-3-test-allin/@id/__x00__virtual:my-module"
				const __vite__css = ""
				__vite__updateStyle(__vite__id, __vite__css)
				import.meta.hot.accept()
				export default __vite__css
				import.meta.hot.prune(()=>__vite__removeStyle(__vite__id))
				if (import.meta.hot) {
				  import.meta.hot.on('my:greetings', (data) => {
				    console.log('my:greetings热更新：', data) // hello
						__vite__updateStyle(__vite__id, data)
				  })
				}
				`
      } else {
        return '.csssss-placehold{color:red;}'
      }
    },
    shouldTransformCachedModule({ code, id, ast }) {
      return null
    },
    async transform(source, id) {
      if (!id || !source) {
        return {
          code: source,
          map: null
        }
      }

      if (id.includes('.vitepress/theme/index.') && server) {
        // 增加css引用
        let ms = new MagicString(source)
        ms.appendLeft(0, `\nimport '${virtualModuleId}'\n`)
        return {
          code: ms.toString(),
          map: ms.generateMap({
            file: id,
            hires: true,
            source: id // 原始文件路径
          })
        }
      }

      if (id.endsWith('.css')) {
        let str = source.replace(/\n+/g, '')
        comcss += comcss
      }
      // if (id.endsWith('.scss')) {
      // 	console.log('==== transform id .vue:', id);
      // 	}
      if (id.endsWith('.md')) {
        let index = 0
        const reg = /<[^<]+class=\\['"]([^'"]+)\\['"][^>]*>/g
        // 统计使用到的css
        let match,
          tokens = {}
        while ((match = reg.exec(source)) !== null) {
          match[1].split(/\s+/).forEach(item => item && (tokens[item] = true))
        }
        let classTokens = Object.keys(tokens).filter(token =>
          token.startsWith(userConfig.prefix || token)
        )
        let changed = genStyle(
          classTokens,
          {
            styleSheet,
            outputCssCache,
            modelsCssCache: temp,
            userConfig
          },
          id
        )

        clearTimeout(timer)
        timer = setTimeout(() => {
          // console.log('====injectCssToBrowser 1155 :', 1155);
          injectCssToBrowser(genOutputStr({ outputCss: outputCssCache }))
          clearTimeout(timer)
        }, 500)
      }

      return {
        code: source,
        map: null
      }
    },

    async transformIndexHtml(html) {
      // 开发期间
      // console.log('==== transformIndexHtml 111 :', 111);
      let outputStr = genOutputStr({ outputCss: outputCssCache })
      return html.replace(
        /<\/head>/,
        `	<style type="text/css" data-vite-dev-id="public.css">${outputStr}</style>\n	<\/head>`
      )
    },
    renderStart() {
      // console.log('==== renderStart :');
    },
    renderChunk(code, chunk, options, meta) {
      // console.log('==== chunk.fileName :', chunk.fileName);
      // console.log('==== Object.keys(chunk) :', Object.keys(chunk));
    },
    async generateBundle(options, bundle) {
      let outputStr = genOutputStr({ outputCss: outputCssCache, join: '' })
      this.emitFile({
        type: 'asset',
        fileName: csspath1,
        source: outputStr
      })
      this.emitFile({
        type: 'asset',
        fileName: csspath,
        source: comcss
      })
    },
    writeBundle(options, bundle) {},
    buildEnd(html) {
      // console.log('==== buildEnd 11 :', html);
    }
  }

  function cssOutPut(outputStr) {
    try {
      fs.writeFile(cssOutPutFilePath, outputStr, 'utf-8', err => {
        if (err) {
          console.log('==== 写入数据失败 :')
        }
      })
    } catch (err) {}
  }

  function sleep(outputStr) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve()
        clearTimeout(timer)
      }, 3000)
    })
  }
}
