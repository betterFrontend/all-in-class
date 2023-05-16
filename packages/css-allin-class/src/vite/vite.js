import { PLUGIN_NAME, PLUGIN_PREFIX, CSS_PLACE_HOLDER_KEY, VITE_HMR_CONTENT } from '../constant'
import { genStyle } from '../styles';
import MagicString from 'magic-string'
import { createStyleSheet } from '../styles/createStyleSheet';
import { getEnv } from '../utils/envInfo';
import { genOutputStr } from '../utils/style';
import { transformVueClass } from '../utils/transform';
const fs = require('fs');
const path = require('path');

export default function vitePlugin(userConfig, pluginShare) {
	const virtualModuleId = 'virtual:my-module'
	const resolvedVirtualModuleId = '\0' + virtualModuleId

	let styleSheet, outputCssCache = {},
		modelsCssCache = {}
	pluginShare.outputCssCache = outputCssCache
	let server
	let errCache = new Map()
	let timer
	let notAddCssPlaceholder = true



	const injectCssToBrowser = () => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			server?.ws.send({
				type: 'custom',
				event: 'my:greetings',
				data: genOutputStr({ outputCss: outputCssCache })
			})
			clearTimeout(timer)
		}, 500);
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
			if (id === virtualModuleId) return resolvedVirtualModuleId;

			return null;
		},
		load(id) {
			if (id === resolvedVirtualModuleId) return VITE_HMR_CONTENT;

			return null;
		},
		async transform(source, id) {
			const result = {code: source, map: null};
			
			if (!id || !source) return result;
			if(getEnv().isUniapp&&id.endsWith('App.vue')) return result;
			
			if (id.endsWith('main.js') && server) {
				let ms = new MagicString(source)
				ms.appendRight(source.length, `\nimport virtual from '${virtualModuleId}'\n`)
				
				return {
					code: ms.toString(),
					map: ms.generateMap({
						file: id,
						hires: true,
						source: id, // 原始文件路径
					})
				}
			}
			
			// 给App.vue添加css占位
			if (notAddCssPlaceholder && id.includes('/App.vue?vue&type=style') && (id.endsWith('lang.css') || id
					.endsWith('lang.scss'))) {
				
				let ms = new MagicString(source)
				ms.appendLeft(0, `${CSS_PLACE_HOLDER_KEY}\n`)
				notAddCssPlaceholder = false
				
				return {
					code: ms.toString(),
					map: ms.generateMap({
						file: id,
						hires: true,
						source: id, // 原始文件路径
					})
				}
			}

			
			if (process.env.UNI_PLATFORM === 'mp-weixin') {
				// 微信小程序,在前,
				if (id.endsWith('.vue') && source.includes('<template>')) {
					let { classTokens, code, map } = transformVueClass(source, id)
					// 匹配

					let changed = genStyle(classTokens, {
						styleSheet,
						outputCssCache,
						modelsCssCache,
						userConfig
					}, id)

					if (server) injectCssToBrowser()
					return {
						code,
						map: { mappings: map.mappings }
					}
				}
			} else if (id.endsWith('.vue')) {
				let { classTokens, code, map } = transformVueClass(source, id)
				// 匹配
				let changed = genStyle(classTokens, {
					styleSheet,
					outputCssCache,
					modelsCssCache,
					userConfig
				}, id)

				if (server) injectCssToBrowser()
				return {
					code,
					map: { mappings: map.mappings }
				}
			}

			return result
		},
		// h5才会生效
		async transformIndexHtml(html) {
			injectCssToBrowser()
			const outputStr = genOutputStr({ outputCss: outputCssCache })
			// 避免刷新网页，样式闪烁
			return html.replace(
				/<\/head>/,
				`	<style type="text/css" data-vite-dev-id="serverTempPublic.css">${outputStr}</style>\n	<\/head>`
			)
		},
		async generateBundle(options, bundle) {
			const files = Object.keys(bundle).filter(i => i.endsWith('.css'))
			for (const file of files) {
				const code = bundle[file].source
				if (code.includes(CSS_PLACE_HOLDER_KEY)) {
					const outCssStr = genOutputStr({ outputCss: pluginShare.outputCssCache })
					bundle[file].source = code.replace(CSS_PLACE_HOLDER_KEY, outCssStr)
					console.log('css生成了');
					break
				} 
			}
		},
		closeBundle() {
			const out = userConfig.out || './public.css'
			const cssPreviewFilePath = path.join(getEnv().projectRoot, out)
			
			if (out) {
				// cssOutPut(cssPreviewFilePath, genOutputStr({ outputCss: outputCssCache }))
			}
		}
	};
	
	function cssOutPut(filePath, outputStr) {
		fs.writeFile(filePath, outputStr, "utf-8", (err) => {
			if (err) {
				throw new Error("css文件生成失败");
			}
		});
	}
	function sleep(time=3000) {
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				resolve()
				clearTimeout(timer)
			}, time);
		})
	}
}
