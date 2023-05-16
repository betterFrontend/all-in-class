import fs from 'fs';
import { resolve } from 'path';
import { PLUGIN_PREFIX } from "../constant";
import { genStyle, matchClassToken } from "../styles";
import { getEnv } from '../utils/envInfo.js'
import { getAst, transformVueClass } from '../utils/transform';

let stak = []

export default async function(source, map) {
	const callback = this.async()

	// stak.push({ callback, source })

	const id = this.resource
	let { userConfig, outputCssCache, modelsCssCache, styleSheet } = this.query

	// TODO
	// 监听配置文件的修改
	// 手动加载配置文件
	// 添加依赖
	// const envInfo = getEnv()
	// if(envInfo.configPath)this.addDependency(envInfo.configPath);

	// TODO
	// 解析页面的内容 生成ast树 获取备注的样式，获取页面的class 修改页面的class内容
	// 问题：%#.>在小程序不支持
	// 方案：使用\%转义在h5平台可以使用,小程序依旧不支持 
	// 方案： w-1% 百分号转为_ 生成的csstoken 
	//      问题：替换后，获取classtoken的方式需要一起改变？ 用户的规则也需要改变？
	//      方案：保存一份原始的值，匹配使用原始值，生成css时使用替换后的值
	
	// 解析js
	
	// getAst(source)
	// let { classTokens, code } = transformVueClass(source)
	
	// // TODO
	// // 改为遍历ast获取
	// // const classToken = matchClassToken(source) // 匹配classToken

	// // TODO
	// // 重构css的生成过程 参数传递层数较多，直接从原型上获取
	// // 匹配
	// let changed = genStyle(classTokens, styleSheet, outputCssCache, modelsCssCache[id])
	// modelsCssCache[id] = classTokens

	console.log('==== id :', id);
	console.log('==== source :', source);
	let test = `<template><div>1111111111111111</div></template>	
	<script>

export default {
  components: {
  }
}
</script>
<style scoped>h3 {margin: 40px 0 0;}ul {list-style-type: none;padding: 0;}li {display: inline-block;margin: 0 10px;}a {color: #42b983;}</style>`
	

	callback(null, source)
	// callback(null, source.replace('w-100%','w-100______'))
	// callback(null, source&&source.replace('hellohellohellohello','class="hellohellohellohello"'))
	
	// let shift = stak.shift()
	// shift.callback(null, shift.source)
}
