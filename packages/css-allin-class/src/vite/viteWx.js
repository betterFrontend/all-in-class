import { PLUGIN_NAME, PLUGIN_PREFIX } from '../constant'
import { genStyle } from '../styles';
import MagicString from 'magic-string'
import { createStyleSheet } from '../styles/createStyleSheet';
import { getEnv } from '../utils/envInfo';
import { genOutputStr } from '../utils/style';
import { transformVueClass } from '../utils/transform';
const fs = require('fs');
const path = require('path');

export default function vitePlugin(userConfig,pluginShare) {
	const virtualModuleId = 'virtual:my-module'
	const resolvedVirtualModuleId = '\0' + virtualModuleId

	let styleSheet, outputCssCache = {},
		temp = {}
		pluginShare.outputCssCache = outputCssCache
	let indexcssid
	let old
	let server
	let errCache = new Map()
	let iii = 0
	let bundleFileName = '11'


	const env = getEnv()
	const out = userConfig.out || './public.css'
	const fileDir = env.projectRoot
	const cssOutPutFilePath = path.join(fileDir, out)
	let timer

	const injectCssToBrowser = (css) => {
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
			}, 5000);
		})
	}
	return {
		name: PLUGIN_NAME,
		order: 'pre',
		// configResolved(resolvedConfig) {
		// 	console.log('==== resolvedConfig :', resolvedConfig);
		// },
		configureServer(_server) {
			server = _server
		},
		async buildStart() {
			styleSheet = await createStyleSheet({ userConfig })
		},
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId
			}
			return null; // other ids should be handled as usually
		},
		load(id) {
			// && server
			if (id === resolvedVirtualModuleId ) {
				return `export const msg = "from virtual module";
				import {createHotContext as __vite__createHotContext1} from "/@vite/client";
				import.meta.hot = __vite__createHotContext1("@id/__x00__virtual:my-module");
				import {updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle} from "/@vite/client"
				const __vite__id = "C:/Users/cmz/Documents/HBuilderProjects/com-css-loader/com-css-loader/template/cli-vue-3-test-allin/@id/__x00__virtual:my-module"
				const __vite__css = ".cc{color:red;}"
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
			}else	if (id === resolvedVirtualModuleId) {
				return '.ccccccccc{color:red;}'
			}
			return null; // other ids should be handled as usually
		},
		shouldTransformCachedModule({ code, id, ast }) {
			// if(id === 'C:/Users/xiaochenaixiaojuan/Documents/HBuilderProjects/a-word/App.vue?vue&type=style&index=0&lang.css'){
			// 	return id;
			// }
			return null;
		},
		async transform(source, id) {
			if (!id || !source) {
				return {
					code: source,
					map: null
				};
			}

			// if (id.endsWith('App.vue')) {
			// 	// 增加css引用
			// 	// </style>
			// 		let ms = new MagicString(source)
			// 		ms.appendLeft(0, `<style>\n@import '${virtualModuleId}'\n</style>`)
			// 		return {
			// 			code: ms.toString(),
			// 			map: ms.generateMap({
			// 				file: id,
			// 				hires: true,
			// 				source: id, // 原始文件路径
			// 			})
			// 		}
			// 	// return html.replace(
			// 	// 	/<\/head>/,
			// 	// 	`	<style type="text/css" data-vite-dev-id="public.css">${outputStr}</style>\n	<\/head>`
			// 	// )
			// }

			// if (id.toLowerCase().endsWith('lang.css') && id.includes('App.vue')) {
			// console.log('==== source :', source);
			// }
			if (id.endsWith('main.js') && server) {
				let ms = new MagicString(source)
				ms.appendRight(source.length,`\nimport virtual from '${virtualModuleId}'\n`)
				// ms.appendLeft(0, `import virtual from '${virtualModuleId}'\n`)
				return {
					code: ms.toString(),
					map: ms.generateMap({
						file: id,
						hires: true,
						source: id, // 原始文件路径
					})
				}
			}
			if (id.includes('App.vue')) {
				// console.log('==== id :', id);
				// console.log('==== source :', source);
			}
			// if (id.endsWith('main.js')) {
			// 	let ms = new MagicString(source)
			// 	ms.appendLeft(0, `import virtual from '${virtualModuleId}'\n`)
			// 	return {
			// 		code: ms.toString(),
			// 		map: ms.generateMap({
			// 			file: id,
			// 			hires: true,
			// 			source: id, // 原始文件路径
			// 		})
			// 	}
			// }
			
			// if (id.endsWith('.vue') && !source.includes('<template>') && !id.toLowerCase().endsWith('app.vue')) {
				
			// 	if (!errCache.get(1)) {
			// 		errCache.set(1, true)
			// 		// for (let i = 0; i < 16; i++) {
			// 		//   for (let j = 0; j < 16; j++) {
			// 		//     const code = i * 16 + j;
			// 		//     process.stdout.write(`\u001b[38;5;${code}m ${'pl'+code.toString().padEnd(5)}`);
			// 		//   }
			// 		//   process.stdout.write('\u001b[0m\n');
			// 		// }
			// 		// console.log('\x1b[33m%s\x1b[0m', 'Hello world');
			// 		let start = `  配置项错误：\n  export default defineConfig({\n    plugins: [`
			// 		let config = `      allin({ presets: [preset()] }),\n      vue(),`
			// 		let end =
			// 			`    ],\n    resolve: {\n      alias: {\n        '@': fileURLToPath(new URL('./src',\n          import.meta.url))\n      }\n    }\n  })`

			// 		if (!env.isUniapp) {
			// 			// console.log('\u001b[38;5;1m%s\x1b[0m', start);
			// 			// console.log('\u001b[38;5;3m%s\x1b[0m', config);
			// 			// console.log('\u001b[38;5;1m%s\x1b[0m', end);
			// 			// console.log('\u001b[38;5;5m%s\x1b[0m', `  解决方案：在配置文件中把 allin 放在 vue 的前面，如上面黄色部分`);
			// 		} else {
			// 			console.error(start);
			// 			console.error(config);
			// 			console.error(end);
			// 			console.warn(`  解决方案：在配置文件中plugins数组把 allin 放在 vue 的前面`);
			// 		}

			// 	}
			// }
			if(process.env.UNI_PLATFORM === 'mp-weixin'){
				if (id.endsWith('.vue') && source.includes('<template>')) {
					// console.log('==== source :', source);
					let { classTokens, code, map } = transformVueClass(source, id)
					// 匹配
				
					let changed = genStyle(classTokens, {
						styleSheet,
						outputCssCache,
						modelsCssCache: temp,
						userConfig
					}, id)
				
					// cssOutPut() 
					if(server){
						clearTimeout(timer)
						timer = setTimeout(() => {
							injectCssToBrowser(genOutputStr({ outputCss: outputCssCache }))
							clearTimeout(timer)
						}, 500);
					}
					return {
						code,
						map: { mappings: map.mappings }
					}
				}
			}else
				if (id.endsWith('.vue')) {
					let { classTokens, code, map } = transformVueClass(source, id)
					// 匹配
					let changed = genStyle(classTokens, {
						styleSheet,
						outputCssCache,
						modelsCssCache: temp,
						userConfig
					}, id)
				
					// cssOutPut() 
					if(server){
						clearTimeout(timer)
						timer = setTimeout(() => {
							injectCssToBrowser(genOutputStr({ outputCss: outputCssCache }))
							clearTimeout(timer)
						}, 500);
					}
					return {
						code,
						map: { mappings: map.mappings }
					}
				}

			return {
				code: source,
				map: null
			};
		},

		async transformIndexHtml(html) {
			// H5 h5
			clearTimeout(timer)
			let outputStr = genOutputStr({ outputCss: outputCssCache })
			timer = setTimeout(() => {
				injectCssToBrowser(genOutputStr({ outputCss: outputCssCache }))
				clearTimeout(timer)
			}, 500);
			
			return html.replace(
				/<\/head>/,
				`	<style type="text/css" data-vite-dev-id="public.css">${outputStr}</style>\n	<\/head>`
			)
		},
		async generateBundle(options, bundle) {},
		async renderChunk(code, chunk) {},
		closeBundle() {
			// 在开发阶段有效,但是打包阶段无效
			let outputStr = genOutputStr({ outputCss: outputCssCache })
			console.log('==== outputStr :', outputStr.length);
			// NI_UTS_PLATFORM: 'mp-weixin',
			// UNI_PLATFORM: 'mp-weixin',
			// UNI_NODE_ENV: 'development',
			// UNI_OUTPUT_DIR 'C:/Users/xiaochenaixiaojuan/Documents/HBuilderProjects/a-word/unpackage/dist/dev/mp-weixin'
			// console.log('==== process.env.UNI_PLATFORM :', process.env);
			if (process.env.UNI_PLATFORM === 'mp-weixin') {
				const timer1 = setTimeout(() => {
					try {
						// fs.writeFile(process.env.UNI_OUTPUT_DIR + '/app.wxss', outputStr, "utf-8", (err) => {
						// 	if (err) {
						// 		throw new Error("写入数据失败");
						// 	}
						// });
					} catch (err) {
						console.log('==== err :', err);
					}
					clearTimeout(timer1)
				}, 1000);
			}
		},
		buildEnd(html) {
			console.log('==== buildEnd 11 :', 11);
			// C:/Users/xiaochenaixiaojuan/Documents/HBuilderProjects/a-word/public.css
		},
	};

	function cssOutPut(outputStr) {
		fs.writeFile(cssOutPutFilePath, outputStr, "utf-8", (err) => {
			if (err) {
				throw new Error("写入数据失败");
			}
		});

	}

	function sleep(outputStr) {
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				resolve()
				clearTimeout(timer)
			}, 3000);
		})
	}
}
