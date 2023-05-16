import { dynamicRules, staticRules } from "./styleSheet"

// let presetStaticRules = Object.values(staticRules).map(item => item.ailwindcss)

// TODO 
// 统计样式的大小 建议用户尽量公用
// 写自己的预设插件
// 主题
// 权重过低无法覆盖底部多层级的样式。
//   1.  id选择器
//   2.  import

// console.log('==== presetRules :', presetStaticRules);

function getrules(unit='px') {
	 return [
		
		// TODO 
		// 方法返回的值 可以是对象 可以是字符串
		// 去掉用户返回字符串的空格,有些空格不能去
		// ['jc-c',  'margin-left-right: auto;'],
		// ['jc-c',  'margin-left-right: auto;'],
		// ['mlr-auto',  'margin-left-right: auto;'],
		// ['m-0-auto',  'margin: 0 auto;'],
		// [/^m-(\d+)-(\d+)$/, match => ({ 'margin': `${match[1]}${unit} ${match[2]}${unit};` })],
		// [/^m-(\d+)$/, ([, d]) => ({ 'margin': `${d}${unit};` })],
		// [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}${unit};` })],
		// [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d}${unit};` })],
		// [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}${unit};` })],
		// [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${d}${unit};` })],
		// [/^my-(\d+)$/, match =>  `margin-left:${match[1] }${unit};margin-right:${match[1]}${unit};`],
		// [/^px-(\d+)$/, match =>  `padding-top:${match[1] }${unit};padding-bottom:${match[1]}${unit};`],
		// [/^mlr-(\d+)$/, ([, d]) =>  `margin-top:${match[1] }${unit};margin-bottom:${match[1]}${unit};`],
		// [/^mtb-(\d+)$/, ([, d]) =>  `padding-top:${match[1] }${unit};padding-bottom:${match[1]}${unit};`],
		// [/^m-(\d+)-(\d+)-(\d+)-(\d+)$/, match => ({ 'margin': `${match[1]}${unit} ${match[2]}${unit} ${match[3]}${unit} ${match[4]}${unit};` })],
		
		// [/^p-(\d+)-(\d+)$/, match => ({ 'padding': `${match[1]}${unit} ${match[2]}${unit};` })],
		// [/^p-(\d+)$/, match => ({ 'padding': `${match[1]}${unit}` })],
		// [/^pt-(\d+)$/, match => ({ 'padding-top': `${match[1]}${unit}` })],
		// [/^pb-(\d+)$/, match => ({ 'padding-bottom': `${match[1]}${unit}` })],
		// [/^pl-(\d+)$/, match => ({ 'padding-left': `${match[1]}${unit}` })],
		// [/^pr-(\d+)$/, match => ({ 'padding-right': `${match[1]}${unit}` })],
		// [/^py-(\d+)$/, match =>  `padding-top:${match[1] }${unit};padding-bottom:${match[1]}${unit};`],
		// [/^px-(\d+)$/, match => `padding-left:${match[1] }${unit};padding-right:${match[1]}${unit};`],
		// [/^p-(\d+)-(\d+)-(\d+)-(\d+)$/, match => ({ 'padding': `${match[1]}${unit} ${match[2]}${unit} ${match[3]}${unit} ${match[4]}${unit};` })],
		
		// [/^bg-(\d+|[A-Za-z]+)$/, match => ({ 'background-color': `#${match[1]}` })],
		// [/^c-(\d{3}|\d{6})$/, match => ({ 'color': `#${match[1]}` })],
		// [/^c-([\dA-Za-z]{3}|[\dA-Za-z]{6})$/, match => ({ 'color': `#${match[1]}` })],
		
		
		// [/^(br|radius)-(\d+)$/, match => ({ 'border-radius': `${match[2]}${unit}` })],
		// [/^(br|radius)-(\d+)-(\d+)-(\d+)-(\d+)$/, match => ({ 'border-radius': `${match[2]}${unit} ${match[3]}${unit} ${match[4]}${unit} ${match[5]}${unit};` })],
		
		// [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${d}${unit};` })],
		// 重复的key,最后一个会覆盖前面的值
		// {
		// 	'text-white': 'color:black ;',
		// 	'text-white': 'color:white ;',
		// },
	]
}
export let composition = [
	// 对象形式
	// {
	// 	// shortcuts to multiple utilities
	// 	'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
	// 	'btn-green': 'text-white bg-green hover:bg-green-700',
	// 	// single utility alias
	// 	'red': 'text-red-100'
	// },
	// // 数组形式
	// ['btn', 'py-2 px-4 font-semibold rounded-lg',{PREFIX: 'cus'}],
	// ['card', 'm-20 p-20 bg-green',{PREFIX: 'cus'}],
	// // TODO 给当前对象内的样式单独增加前缀
	// {
	// 	PREFIX: 'cus',
	// 	btn: 'py-2 px-4 font-semibold rounded-lg',
	// 	card: 'p-10 px-4 font-semibold rounded-lg shadow-md',
	// },
	// // dynamic shortcuts
	// [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
	[/(.*)-i(\d*)$/, ([r, c, d],getValue) => {
		let val = getValue(c)
		return ()=>{
			return val
		}
	}],
]

export function presetRules(config={}) {
	// 规则的书写,是一个 头疼的事情
	// 把新建一套规则的成本降低
	
	// 列出有哪些常用css样式 styleSheet
	
	let allStyle = {}
	// for (let [name, { style }] of Object.entries(styleSheet)) {
	// 	allStyle = { ...allStyle, ...style }
	// }
	
	// 自动生成预设的规则文档
	// 预设规则的插件,提示代码书写规则
	
	let rules = getrules(config.unit)
	
	// TODO 静态规则单独放
	return {
		rules,
		composition
	}
}
