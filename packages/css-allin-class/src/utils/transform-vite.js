import { getEnv } from './envInfo';
import { parse } from "@vue/compiler-dom";
import MagicString from 'magic-string'
import { matchClassToken } from '../styles';
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;
// import remapping from '@ampproject/remapping'
// const compiler = require('vue-template-compiler')
import { parse as parserparser } from "@vue/compiler-sfc";

// 修改class的内容
export function transformVueClass(source, id) {
	if (!source) return

	let classTokens = []
	// 判断是jsx还是
	let code = '',
		map = null
	if (source.includes('<template>')) {
		let res = parseVue(source, classTokens, id)
		code = res.code
		map = res.map
		
	} else {
		code = parseJsx(source, classTokens)
		let ms = new MagicString(source)
		map = ms.generateMap({
			file: id,
			hires: true,
			source: id, // 原始文件路径
		})
	}

	return {
		classTokens,
		code,
		map
	}
}

function matchReplace(ms, items, code, fun) {
	items = 'class=' + items
	// 匹配内容,进行替换
	const regexp = RegExp(items);
	let match = code.match(regexp)
	if (match) {
		items = items.split('').map((ite, index) => {
			if (['#', '%'].includes(ite)) {
				ite = '_'
				ms.update(match.index + index, match.index + index + 1, '_')
			}
			return ite
		}).join('')
		code = code.replace(regexp, items)
	}
	return code
}

function parseVue(code, classTokens, id) {
	let ms = code
	ms = new MagicString(ms)

	// 获取到class的位置
	const ast = getAst(code, id)

	if (!ast) {
		const transform = (items) => {
			// console.log('==== items :', items);
			// items => 'info-bar bg-#fff w-500%'
			if (items.includes('%') || items.includes('#')) {
				code = matchReplace(ms, items, code)
			}
		}
		classTokens.push(...matchClassToken(code, transform))
		// 替换#等
		// 确保修改后的代码和原始代码有相同的行数和列数
		if (ms.split('\n').length !== code.split('\n').length) {
			console.error('Modified code has different number of lines than original code');
		}
		return {
			code: ms.hasChanged() ? ms.toString() : code,
			map: ms.generateMap({
				file: id,
				hires: true,
				source: id, // 原始文件路径
			})
		}
	}

	walkTree(ast, {
		script: (script) => {
			// 交给bable
			// console.log('==== script :', script);
		},
		style: (style) => {
			// 交给postcss

		},
		nodeTransform: (node) => {

		},
		propClass: (prop) => {
			const content = prop?.value?.content
			if (!content) return

			// 生成tokens
			const tokens = content.split(/\s+/g)
			// console.log('==== tokens :', tokens);
			classTokens.push(...tokens)
			// {
			// 	content,
			// 	tokens
			// }
			// // 找到字符串 "ddddd" 的位置
			// const index = ms.indexOf('ddddd')

			// // 修改字符串
			// ms.overwrite(index, index + 5, 'eeeee')
			// // 替换%
			let offset = 0
			let index
			content.split('').map((item, itemIndex) => {
				if (['%', '#', '.'].includes(item)) {
					
					index = code.indexOf(item, itemIndex + prop.loc.start.offset + offset);
					if (index !== -1) {
						offset = index - itemIndex - prop.loc.start.offset
					}
					let updateindex = index
					ms.update(updateindex, updateindex + 1, '_')
					// let ssss = new MagicString(code)
					// console.log('==== ssss.snip :', ssss.snip( updateindex, updateindex + 1 ).toString());
				}
			});

		},
		propBindClass: (prop) => {
			let content = prop?.exp?.content
			if (!content) return
			
			// 匹配内容
			let matchs = content.match(/'([^']+)'|"([^"]+)"/g)
			if(matchs){
				// console.log('==== content :', content);
				// console.log('==== matchs :', matchs);
				// match
				let code1 = code
				for (let match of matchs) {
					const tokens = match.replace(/["']+/g,'').split(/\s+/g)
					classTokens.push(...tokens)
					
					let offset = 0
					let index
					match.split('').map((item, itemIndex) => {
						if (['%', '#', '.'].includes(item)) {
							index = code1.indexOf(item, itemIndex + prop.loc.start.offset + offset);
							if (index !== -1) {
								offset = index - itemIndex - prop.loc.start.offset
							}
							let updateindex = index
							code1 = code1.substring(0, updateindex) + '_' + code1.substring(updateindex + 1);
							ms.update(updateindex, updateindex + 1, '_')
							
							// let ssss = new MagicString(code)
							// console.log('==== ssss.snip :', ssss.snip( updateindex, updateindex + 1 ).toString());
						}
					});
				}
			}
			// exp.constType: 0,
			// console.log('==== prop.exp.content :', prop.exp.content);
			// {header:iiii == 1}
			// header?'header':'headerheader'
		},
		comment: (node) => {

		}
	})

	return {
		code: ms.hasChanged() ? ms.toString() : code,
		map: ms.generateMap({
			file: id,
			hires: true,
			source: id, // 原始文件路径
		})
	}
}


// function fun(str,newStr) {
// 	let replacedStr = str.substring(0, index) + newStr + str.substring(index + newStr.length);
// }
export function getAst(source, id) {
	let tree
	// try {
	// 	tree = parse(source, { mode: 'module' })
	// } catch (err) {
	// 	console.log('==== err :', err);
	// }
	// if (tree) {
	// 	return tree
	// }
	try {
		const { descriptor } = parserparser(source)
		tree = descriptor.template.ast
	} catch (err) {
		// console.log('==== err :', err);
	}
	return tree
}
// 遍历树
function walkTree(node, options = {}) {
	if (!node) return

	if (node.type === 1 && node.tag === 'style') {
		options?.style(node)
	}
	if (node.type === 1 && node.tag === 'script') {
		options?.script(node)
	}

	options?.nodeTransform(node)

	if (node.props) {
		for (let prop of node.props) {

			// 动态class
			if (prop.type === 7 && prop.name === 'bind' && prop.arg && prop.arg.content === 'class') {

				options?.propBindClass(prop)
			}

			// 静态class
			if (prop.type === 6 && prop.name === 'class') {
				options?.propClass(prop)
			}

		}
	}

	// 注释
	if (node.type === 3) {
		options?.comment(node)
	}
	if (node.children) {
		for (let child of node.children) {
			walkTree(child, options)
		}
	}

}

function parseJsx(source, classTokens) {
	let ast
	try {
		ast = parser.parse(source, { sourceType: "module", plugins: ["jsx", "flow", ] })
	} catch (err) {
		// console.log('==== err :', err);
	}
	let env = getEnv()
	
	traverse(ast, {
		ObjectProperty(path) {
			// 插入配置文件代码
			let name = path.node.key.name
			let value = path.node.value.value
			// vue2和vue3是不一样的需要做不同的处理

			// TODO 
			// 拆分组合的class 使用单个的css代替组合的
			// width w 都是宽度 合并class

			if (['class'].includes(name)) {
				let nodeVal = path.node.value

				// if (env.vueVersion === 3 || env.packFramework === 'vite') {
				// 	return
				// }
				vue3(nodeVal, classTokens)
				// vue2(nodeVal, classTokens)
			}

			if (["staticClass"].includes(name) && value) {
				path.node.value.value = replaceTokens(path.node.value.value, classTokens) // 替换% 50% => 50_
			}
		}
	});

	return generate(ast, { jsescOption: { minimal: true } }, "").code; // 配置是为了解决中文为unicode乱码的问题
}

function vue3(nodeVal, classTokens) {
	// 策略模式
	const strategy = {
		'StringLiteral': () => {
			nodeVal.value = replaceTokens(nodeVal.value, classTokens) // 替换% 50% => 50_
		},
		'CallExpression': () => {
			for (let arg of nodeVal.arguments) {
				if (arg.type === 'ArrayExpression') {
					for (let ele of arg.elements) {
						vue3(ele, classTokens)
					}
				}
			}
		},
		'ConditionalExpression': () => {
			nodeVal.consequent.value = replaceTokens(nodeVal.consequent.value, classTokens)

			nodeVal.alternate.value = replaceTokens(nodeVal.alternate.value, classTokens)
		},
		'ObjectExpression': () => {
			propertiesPushTokens(nodeVal.properties, classTokens)
		},
		'ArrayExpression': () => {
			nodeVal.elements.forEach((properties) => {
				propertiesPushTokens(properties, classTokens)
			})
		}
	}

	strategy[nodeVal.type] && strategy[nodeVal.type]()
}

function vue2(nodeVal, classTokens) {
	// 策略模式
	const strategy = {
		'ConditionalExpression': () => {
			nodeVal.consequent.value = replaceTokens(nodeVal.consequent.value, classTokens)

			nodeVal.alternate.value = replaceTokens(nodeVal.alternate.value, classTokens)
		},
		'ObjectExpression': () => {
			propertiesPushTokens(nodeVal.properties, classTokens)
		},
		'ArrayExpression': () => {
			nodeVal.elements.forEach((properties) => {
				propertiesPushTokens(properties, classTokens)
			})
		}
	}

	strategy[nodeVal.type] && strategy[nodeVal.type]()
}

// 修改% 50% => 50_
// 修改. 0.5 => 0_5
function replaceTokens(value, classTokens) {
	let tokens = value.split(/\s+/).filter(Boolean);
	pushTokens(tokens, classTokens);
	value = tokens.map(item => item.replace(/[%#\.>:]/, '_')).join(' ')
	return value
}

function pushTokens(tokens, classTokens) {
	if (tokens.length) {
		classTokens.push(...tokens)
	}
}

function propertiesPushTokens(properties, classTokens) {
	if (properties.length) {
		properties.forEach((obj) => {
			if (obj.key.name) {
				obj.key.name = replaceTokens(obj.key.name, classTokens)
			}

			if (obj.key.value) {
				obj.key.value = replaceTokens(obj.key.value, classTokens)
			}
		})
	}
}
