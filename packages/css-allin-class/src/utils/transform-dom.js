import { parse } from "@vue/compiler-dom";
import MagicString from 'magic-string'

// 修改class的内容
export function transformVueClass(source) {
	if (!source) return
	
	let code = source
	let classTokens = []
	
	let ms = new MagicString(code)

	// 获取到class的位置
	const ast = getAst(code)
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
			classTokens.push(...tokens)
			// {
			// 	content,
			// 	tokens
			// }
			
			// .map((item, index1) => {
			// 	if (item == '%') {
			// 		let index = index1 + prop.loc.start.offset + 7
			// 		ms.overwrite(index, index + 1, '_')
			// 	}
			// });

			// 替换%
			content.split('').map((item, index1) => {
				if (item == '%') {
					let index = index1 + prop.loc.start.offset + 7
					ms.update(index, index + 1, '_')
				}
			});
			
		},
		propBindClass: (prop) => {
			let content = prop?.exp?.content
			if (!content) return

			// console.log('==== prop.exp.content :', prop.exp.content);
			// {header:iiii == 1}
			// header?'header':'headerheader'
		},
		comment: (node) => {

		}
	})
	
	
	// console.log('==== 1 :', ms.toString());
	// transformStyle
	// 判断class是否需要修改
	// 修改% 50% => 50_
	// 修改. 0.5 => 0_5

	// width w 都是宽度 合并
	
	if (ms.hasChanged()) {
		
	}
	
	// 修改class
	return {
		classTokens,
		code: ms.hasChanged()?ms.toString():code
	}
}

export function getAst(source) {
	let tree
	try {
		tree = parse(source)
	} catch (err) {

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

// export async function transformers(
//   original,
//   id
// ) {
//   // if (original.includes(IGNORE_COMMENT))
//   //   return

//   // const transformers = (ctx.uno.config.transformers || []).filter(i => (i.enforce || 'default') === enforce)
//   // if (!transformers.length)
//   //   return

//   let code = original
//   let ms = new MagicString(code)
//   const maps = []
// 	// ms
//   // for (const t of transformers) {
//   //   if (t.idFilter) {
//   //     if (!t.idFilter(id))
//   //       continue
//   //   }
//   //   else if (!ctx.filter(code, id)) {
//   //     continue
//   //   }
//   //   await t.transform(ms, id, ctx)
//   //   if (ms.hasChanged()) {
//   //     code = ms.toString()
//   //     maps.push(ms.generateMap({ hires: true, source: id }) as EncodedSourceMap)
//   //     ms = new MagicString(code)
//   //   }
//   // }

//   if (code !== original) {
//     // ctx.affectedModules.add(id)
//     return {
//       code,
//       map: remapping(maps, () => null) as SourceMap,
//     }
//   }
// }
