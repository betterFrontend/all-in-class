import { createUnplugin } from 'unplugin'
import path, { join } from 'path';
import fs from 'fs';
import WebpackSources from 'webpack-sources';
import { CSS_PLACE_HOLDER_KEY, PLUGIN_NAME, PLUGIN_PREFIX, POLYFILL_ID } from '../constant'
import { genStyle, matchClassToken, createStyleSheet } from '../styles'
import { resolve } from 'path';
import { getEnv } from './envInfo.js'
import { webpackHooks } from './webpack';
const envInfo = getEnv()
// const filter = createFilter(options.include, options.exclude);

export const unplugins = createUnplugin((userConfig, meta) => {
	let modelsCss = {} // 记录每个模块的css变动
	let outputCss = {} // 生成过的css缓存，用于输出css

	// 根据用户配置生成style样式表	
	const styleSheet = createStyleSheet({ userConfig, meta })

	return {
		name: PLUGIN_NAME,
		enforce: 'pre',
		transformInclude(id) {
			// 包含规则的都会被修改转换内容 id:完整路径
			return filterFileInclude(id, userConfig)
		},
		transform(code, id) {
			if (!id) return
			// if (!filter(id)) return;

			if (!id.endsWith('.vue')) return

			const classToken = matchClassToken(code) // 匹配classToken
			// 需要对之前的和当前的进行对比 有新增 有减少 
			genStyle(classToken, styleSheet, outputCss, modelsCss[id])
			// 记录每个组件的 classToken 数据
			modelsCss[id] = classToken

			let fileDir = '/index.css'
			let outputStr = genOutputStr(outputCss)

			fs.writeFile(resolve(envInfo.projectRoot) + fileDir, outputStr, (err) => {
				if (err) {
					console.log("err: ", err);
				} else {
					console.log("css生成成功: ");
				}
			})
		},
		async transformIndexHtml(html, ctx) {
			let outputStr = ''
			Object.values(outputCss).filter(item => {
				if (item.num > 0) {
					outputStr += `.${item.token}{${item.value}}`
				}
			})

			return html.replace(
				/<head>/,
				`<head><style>${outputStr}</style>`,
			)
		},
		vite: {
			// Vite plugin
			// configureServer(server) {
			// 	// configure Vite server
			// },
			// ...
		},
		rollup: {
			// Rollup plugin
		},
		webpack(compiler) {
			// webpackHooks(compiler, outputCss)
		},
		esbuild: {
			// // change the filter of onResolve and onLoad
			// onResolveFilter ? : RegExp
			// onLoadFilter ? : RegExp
			// // or you can completely replace the setup logic
			// setup ? : EsbuildPlugin['setup']
		}
	}
})


export function filterFileInclude(id, userConfig) {
	if (!id) return false

	if (userConfig) {
		if (userConfig.exclude && userConfig.exclude.some((rule) => rule.test(id))) {
			return false;
		}
		if (userConfig.include && userConfig.include.some((rule) => rule.test(id))) {
			return true;
		}
	}

	return id.endsWith('.vue')
}

function genOutputStr(outputCss) {
	let outputStr = Object.values(outputCss)
		.filter(item => item.num > 0)
		.map(item => `.${item.token}{${item.value}}`)
		.join(process.env[PLUGIN_PREFIX + 'JOIN']);

	// 这种写法,慢一点点
	// let outputStr = ''
	// Object.values(outputCss).filter(item => {
	// 	if (item.num > 0) {
	// 		outputStr += `.${item.token}{${item.value}}`
	// 	}
	// })

	return outputStr
}
