// import windcss from './cssStyle/index.js';
// 完全按照属性名的方案 体验感不好 获取属性名称和值的名称,生成缩写对照表
// const styleDic = Object.keys(allCssStyle).map(it => `'${it}': ['${it.split('-').map(item => item[0]).join('')}']`)
// console.log("styleDic: ",styleDic);

// 默认按照ailwindcss的规则生成一套
let ailwindcss = windcss.ailwindcss
// 用户自定义规则
let prefix: string = 'f-'
interface Style {
  [key: string]: any,
}

/**
 *  生成样式表
 * @return {object}
 */
function genStyleSheet(options: Object) {
	// 单位
	let unit: string = 'rpx'
	// 现有css样式的属性
	let stylePropsList: Style = {
		// ...allCssStyle
		// 'box-sizing': ['content-box', 'box-border'],
		// 'justify-content': ['center', 'baseline'],
		// 'display': ['flex'],
		// 'padding': ['10rpx', '20rpx']
	}


	// 默认样式的规则 用来组装最终样式表
	let defStyleRule: Style = {
		// 'prefix': ['f-'],
		// 'justify-content': ['jc'],
		// 'align-items': ['ai'],
		// 'center': ['center', 'c'],
		// 'display': ['d', null],
		// 'box-sizing': [null],

		// 'flex': ['flex'],
		// 'baseline': ['baseline'],
		// 'padding': ['p'],
		// '10rpx': ['10'],
		// '20rpx': ['20'],
		// 'content-box': ['content-box'],
		// 'box-border': ['box-border'],
	}

	// TODO 判断规则是否存在冲突
	// TODO 动态修改单位

	// 组装默认规则
	let defStyleSheet: Style = { ...ailwindcss }
	for (let [prop, vals] of Object.entries(stylePropsList)) {
		vals.forEach((val: string) => {

			let css: string = `${prop}: ${val};`
			// let prefix = defStyleRule.prefix
			prop = prop
			for (let propKey of defStyleRule[prop]) {

			propKey ? propKey += '-' : propKey = ''
			let defValKey: string = defStyleRule[val]
			if (defValKey) {
				for (let valKey of defStyleRule[val]) {
					defStyleSheet[`${prefix}${propKey}${valKey ? valKey : ''}`] = css
				}
			} else {
				let valKey = defValKey === undefined ? defValKey : ''
				defStyleSheet[`${prefix}${propKey}${valKey}`] = css
			}

			if (defValKey === undefined) {
				console.warn("未定义 defStyleRule[val]: ", val);
				// defStyleSheet[`${prefix}${propKey}${defStyleRule[val]}`] = css
			}

		}

	})
}

console.log("defStyleSheet: ", defStyleSheet);

// 最终直接用样式做key
let styleSheet = Object.assign(defStyleSheet, {})
return styleSheet
}


export default genStyleSheet
