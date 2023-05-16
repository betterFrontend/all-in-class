const path = require("path");
const vscode = require('vscode');
const {
	CompletionItem,
	CompletionItemKind
} = require('vscode-languageserver/node');
const fs = require('fs');
// const Reg2str = require('@a/reg2str');
import { separateRules, isObject } from '@a/shared';
// import Reg2str from '@a/reg2str';
import { loadConfig } from './utils/getConfig';
import { getHBuilderXThemeData } from './utils/getTheme';
import { mergePreset } from './utils/mergePreset';
import { isInTemplateClass } from './utils/style';
console.log('==== 1111 :', 1111);
class ValidateVueClassName {
	constructor(document, position) {
		this.document = document
		this.position = position
	}
	afterChar() {
		const after = document.getText(new vscode.Range(position, position.translate(0, 1)));
	}
	beforeChar() {
		return document.getText(new vscode.Range(position.translate(0, -1), position));
	}
}


let isUsedPlugin = false
let themeData
//该方法将在插件激活的时候调用
export async function activate(context) {
	let root = vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor?.document?.uri)?.uri.path
	onChange(context, ({ document }) => {
		let resolve = path.resolve
		// 从新加载配置文件,如果新增配置文件,启动代码提示服务
		if (document.fileName.slice(3) === resolve(root.slice(1), './allin.config.js').slice(3)) {
			bootPlugin(root.slice(1))
		}
	})
	themeData = getHBuilderXThemeData()
	// 获取当前激活的项目

	// let activeEditor = vscode.window.activeTextEditor;
	// console.log('==== activeEditor :', activeEditor?.document?.uri.path);
	// console.log('==== vscode.workspace.getWorkspaceFolder(activeEditor?.document?.uri) :', vscode.workspace.getWorkspaceFolder(activeEditor?.document?.uri));
	// console.log('==== activeEditordocument :', activeEditor?.document);
	// console.log('==== activeEditor :', activeEditor?.document);
	// console.log('==== vscode.window.activeNotebookEditor :', vscode.window.activeNotebookEditor);
	// console.log('==== vscode.window.visibleTextEditors :', vscode.window.visibleTextEditors);
	// console.log('==== vscode.workspace.workspaceFile :', vscode.workspace.workspaceFile);
	// console.log('==== vscode.workspace.workspaceFile :', vscode.workspace.rootPath);

	await bootPlugin(root.slice(1))

	// let module = context.asAbsolutePath(path.join('dist', 'server.js'))
	// let prod = path.join('dist', 'vue.config.js')

	// try {
	//   await vscode.workspace.fs.stat(Uri.joinPath(context.extensionUri, prod))
	//   module = context.asAbsolutePath(prod)
	// } catch (_) {}

}

let provideItem = []
async function bootPlugin(projectRoot) {
	// 加载配置
	let config = await loadConfig({ projectRoot })
	// console.log('==== config :', config);
	// 根据配置生成提示
	provideItem = await genProvideItem(config)

	// 悬停提示
	registerHoverProvider()
	// 代码提示
	registerCompletionItemProvider()
}

async function genProvideItem(config) {
	let res = []
	let preset = { rules: [], shortcuts: [] }
	preset = await mergePreset(config, preset)

	let { dynamicRules, staticRules } = separateRules(preset)
	console.log('==== dynamicRules :', dynamicRules);
	
	Object.entries(dynamicRules).map(([key, val]) => {
		// Reg2str
		// console.log('==== key, val :', key, val);
		// return {
		// 	label: key,
		// 	kind: 11,
		// 	detail: '对应的样式：',
		// 	documentation: {
		// 		kind: 'markdown',
		// 		value: val
		// 	},
		// 	sortText: key,
		// 	filterText: key,
		// 	insertText: { _tabstop: 1, value: key }
		// }
	});

	res = Object.entries(staticRules).map(([key, val]) => {
		return {
			label: key,
			kind: 11,
			detail: '对应的样式：',
			documentation: {
				kind: 'markdown',
				value: val
			},
			sortText: key,
			filterText: key,
			insertText: { _tabstop: 1, value: key }
		}
	});


	return res
	// preset.rules
	// rules
	// presets
	// shortcuts
}



function split(rules) {

}

function notUsePlugin() {
	// name: 'v3',
	//  nature: 'Web',
	//  id: '{2f59c93b-703f-4fba-abb2-7df0e27316c4}',
	//  uri: e {
	//    scheme: 'file',
	//    authority: '',
	//    path: '/D:/file/HBuilderProjects/v3',
	//    query: '',
	//    fragment: ''
	//  }
	let res = false

	res = (vscode.workspace.workspaceFolders || []).filter(async project => {
		// D:/file/HBuilderProjects/v3/vite.config.js
		// \D:\file\HBuilderProjects\v3\vite.config.js

		if (await isExist(fileAbsolutePath(project, './vue.config.js'))) {
			// 判断文件中使用使用了css-allin-class
			try {
				let fileStr = fs.readFileSync(fileAbsolutePath(project, './vue.config.js'), 'utf-8')
			} catch (err) {
				console.log('==== err :', err);
			}
			return true
		}

		if (await isExist(fileAbsolutePath(project, './vite.config.js'))) {
			// 判断文件中使用使用了css-allin-class
			// 读取文件的内容
			try {
				let fileStr = fs.readFileSync(fileAbsolutePath(project, './vite.config.js'), 'utf-8')
			} catch (err) {
				// console.log('==== err :', err);
			}
			return true
		}

	})
	return res
}

function fileAbsolutePath(project, file) {
	return path.join(project.uri.path, file).slice(1)
}

function isExist(pathfile) {
	return new Promise((resolve, reject) => {
		fs.stat(pathfile, (err, stat) => {
			if (err) {
				resolve(false)
				return
			}
			resolve(true)
		})
	})
}
// C:/Users/xiaochenaixiaojuan/Documents/HBuilderProjects/11/vue.config.js
function onChange(context, fun) {
	context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(async function(document) {
		console.log('==== document 打开了文档:', document);
	}));

	context.subscriptions.push(vscode.workspace.onDidSaveTextDocument((document) => {
		try {
			fun({ document })
		} catch (err) {
			console.log('==== 		fun(e)	 err :', err);
		}
	}))
	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(event => {
			// console.log('==== document 修改了文档:', event);
			// try {
			// 	fun(event)
			// } catch (err) {
			// 	console.log('==== 		fun(e)	 err :', err);
			// }
		}),
		// path
		// _formatted
	);

	// let wsFoldersChangeDisplose = vscode.workspace.onDidChangeWorkspaceFolders(function(event) {
	// 	if (event.added) {
	// 		event.added.forEach(item => console.log("新增了项目:", item.name));
	// 	}
	// 	if (event.removed) {
	// 		event.removed.forEach(item => console.log("移除了项目:", item.name));
	// 	}
	// });
}

function afterChar(document, position) {
	return document.getText(new vscode.Range(position, position.translate(0, 1)));
}

function beforeChar(document, position) {
	return document.getText(new vscode.Range(position.translate(0, -1), position));
}

function isInClass(document, position) {
	const vueLangId = 'vue';
	if (document.languageId !== vueLangId) return false;

	return isInTemplateClass(document.lineAt(position).text, position.character)
}
let isregistedHover = false

function registerHoverProvider() {
	// 如果注册过,就不注册了
	if (isregistedHover) return
	isregistedHover = true
	vscode.languages.registerHoverProvider({ language: 'vue' }, { provideHover: provideHover });
}

export function provideHover(document, position, token) {
	// 判断光标是否在当前的位置
	const wordRange = document.getWordRangeAtPosition(position, /[^\s'"]+/);
	const word = document.getText(wordRange)
	console.log('==== word provideItem:', word);
	if (!isInClass(document, position)) {
		return new Promise(resolve => {
			resolve(null);
		});
	}

	// 获取到当前hover的位置
	// 获取完整的内容 class通过空格分割

	// 根据单词 提示对应的意思
	let contents = provideItem.find(item => item.label === word)
	console.log('==== provideHover.find(word) :', contents);
	if (!contents) {
		return new Promise(resolve => {
			resolve(null);
		});
	}
	// {
	// 	label: 'colorRed',
	// 	kind: 11,
	// 	detail: 'color:red;',
	// 	documentation: { kind: 'markdown', value: 'color:red;' },
	// 	sortText: 'colorRed',
	// 	filterText: 'colorRed',
	// 	insertText: { _tabstop: 1, value: 'colorRed' }
	// }
	// new vscode.MarkdownString
	// const contents = hover.contents
	console.log('==== vscode.window.activeColorTheme :', themeData);
	const activeColorTheme = {
		fontFamily: 'Monaco',
		fontSize: 12,
		background: 'rgb(255,250,232)',
		fontColor: '#243237',
		liHoverBackground: 'rgb(224,237,211)',
		inputLineColor: 'rgb(65,168,99)',
		inputBgColor: 'rgb(255,254,250)',
		lineColor: 'rgb(225,212,178)',
		scrollbarColor: 'rgb(207,181,106)'
	}
	const activeColorTheme1 = {
		fontFamily: 'Monaco',
		fontSize: 12,
		background: 'rgb(39,40,34)',
		fontColor: 'rgb(179,182,166)',
		liHoverBackground: 'rgb(78,80,73)',
		inputLineColor: 'rgb(81,140,255)',
		inputBgColor: '#2E2E2E',
		lineColor: 'rgb(23,23,23)',
		scrollbarColor: '#6F6F6F'
	}
	let result = []
	// for (let element of contents) {
	//   let item = new vscode.MarkdownString()
	//   item.appendCodeblock(element.value, "java")
	// }
	// "\n```js\n\nconst vsc = 1\n```\n\n[Link](http://a.com)\n> Blockquote\n`Inline code` with backticks\n---\n····const vsc = 1\n* **名称**：1\n* **版本**：content.version\n* **许可协议**：content.license\n1. One\n2. Two\n3. Three"

	// HoverPropColor = fontColor;
	// HoverTextColor = fontColor;
	// HoverNumColor = fontColor;
	// HoverUnitColor = fontColor;
	function getContrastColor(color) {
		// 将颜色的红、绿、蓝三个分量分别取反，得到反色
		const r = 255 - parseInt(color.slice(1, 3), 16);
		const g = 255 - parseInt(color.slice(3, 5), 16);
		const b = 255 - parseInt(color.slice(5, 7), 16);
		const inverseColor = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16)
			.padStart(2, '0');

		// 计算反色的亮度
		const brightness = (0.299 * r + 0.587 * g + 0.114 * b);

		// 根据亮度返回黑色或白色
		// return (brightness < 128) ? '#FFFFFF' : '#000000';
		return brightness;
	}

	result = contents.documentation.value.split(';').filter(Boolean)
		.map(item => {
			let [key, val] = item.split(':')
			val = val.split(/\s+/).filter(Boolean).map(item => {
				item = item.replace(/#\w+/, (...match) => {
					return `<span style="color:${getContrastColor(match[0])};background-color:${match[0]};">${match[0]}</span>`
				})
				item = item.replace(/(\d+)(rpx|px|rem|em|vw|vh)/, (...match) =>
					`<span style="color:${themeData.HoverNumColor}">${match[1]}</span><span style="color:${themeData.HoverUnitColor}">${match[2]}</span>`
				)
				return item
			}).join(' ')
			// console.log('==== val :', val);
			return `<span style="color:${themeData.HoverPropColor};">${key}</span>: <span>${val};</span>`
		})
		.join('<br\>')

	let item = new vscode.MarkdownString()
	item.supportHtml = true
	item.appendMarkdown(
		`<code><span style="color: ${themeData.fontColor}">对应的css样式：</span><br\><br\> ${result}<br\> </code>`
	)
	return new Promise(resolve => {
		resolve(new vscode.Hover(item));
	});

}
let isregisted = false

function registerCompletionItemProvider() {
	if (provideItem && provideItem.length && provideItem[0]) {
		// console.log('==== provideItem[0] :', provideItem[0]);
	}
	let provideCompletionItems = (document, position) => {
		// const classReg = /class=["|']([^"|']+)/g;
		// const start = new vscode.Position(position.line, 0);
		// const range = new vscode.Range(start, position);
		// const lineText = document.lineAt(position);
		// const getWordRangeAtPosition = document.getWordRangeAtPosition(position,/[^\s'"]+/);
		// console.log('==== getWordRangeAtPosition :', getWordRangeAtPosition&&document.getText(getWordRangeAtPosition));

		// new ValidateVueClassName(document, position)
		if (!isInClass(document, position)) return null

		// 获取当前的输入
		const wordRange = document.getWordRangeAtPosition(position, /[^\s'"]+/);
		const word = document.getText(wordRange)
		// console.log('==== word provideItem:', word);
		if (!word || word.length > 50) return null
		// console.log('==== provideItem.find(item=>item[]) :', provideItem.find(item => item.label === 'line'));
		// 根据单词生成提示
		// word
		// 匹配单词
		let items = [...provideItem]
		// items.concat(item)
		return { items }
		// const match = lineText.match(classReg);
	}
	// 如果注册过,就不注册了
	if (isregisted) return
	isregisted = true
	vscode.languages.registerCompletionItemProvider(
		["css", "html", "vue", "vue-html", "vue-directives"], { provideCompletionItems },
	);
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
export function deactivate() {

}
// module.exports = {
// 	activate,
// 	deactivate
// }
