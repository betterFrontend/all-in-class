import fs from 'fs';
import { resolve } from 'path';
import { PLUGIN_PREFIX } from "../constant";
import { genStyle, matchClassToken } from "../styles";
import { getEnv } from '../utils/envInfo.js'
import { transformVueClass } from '../utils/transform';

let stak = []
let tempDepFiles
let tempPlugin

function resetAll(plugin) {
	if (plugin) {
		tempPlugin = plugin
	}
}

export default async function (source, map) {
	const callback = this.async()

	// stak.push({ callback, source })

	const id = this.resource
	let { plugin } = this.query

	if (plugin && !plugin.resetAll) {
		// console.log('==== 1111111 :', 1111111);
		plugin.resetAll = resetAll
	}


	if (plugin) {
		tempPlugin = plugin
	}

	if (!tempDepFiles && plugin) {
		tempDepFiles = plugin.depFiles
	}

	// 添加依赖
	if (tempDepFiles) {
		tempDepFiles.forEach(deps => this.addDependency(deps.normalPath))
	}
	code = source
	
	// let { classTokens, code } = transformVueClass(source)
	// // console.log('==== classTokens :', classTokens);
	// // TODO
	// // 重构css的生成过程
	// // 匹配
	// 		// console.log('==== tempPlugin.outputCssCache :', tempPlugin.outputCssCache);
	// let changed = genStyle(classTokens, tempPlugin.styleSheet, tempPlugin.outputCssCache, tempPlugin.modelsCssCache[id])
	// tempPlugin.modelsCssCache[id] = classTokens
	
	callback(null, code)
	// let shift = stak.shift()
	// shift.callback(null, shift.source)
}