var hx = require("hbuilderx");
const vscode = require('vscode');
const {
	CompletionItem,
	CompletionItemKind
} = require('vscode-languageserver/node');
// const { Workspace } = vscode
// const path = require('path');
// const fs = require('fs');
const { provideHover } = require("./src/hover");
// const { getConfig } = require("./src/utils/config");
// const { CONFIG_GLOB } = require("./src/const");
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

function afterChar(document, position) {
	return document.getText(new vscode.Range(position, position.translate(0, 1)));
}

function beforeChar(document, position) {
	return document.getText(new vscode.Range(position.translate(0, -1), position));
}

function isInClass(document, position) {
	// 获取当前行的长度
	const lineText = document.lineAt(position);

	// 当前位置 position.character
	let beforeIndex = position.character
	let afterIndex = position.character
	let isclass, isInside

	while (beforeIndex > 0) {
		let before = beforeChar(document, new vscode.Position(position.line, beforeIndex))
		if (before === '=') {
			let before1 = beforeChar(document, new vscode.Position(position.line, beforeIndex - 1))
			if (before1 && before1 === 's') {
				isclass = document.getText(new vscode.Range(new vscode.Position(position.line, beforeIndex - 6),
					new vscode.Position(position.line, beforeIndex - 1))) === 'class';
				if (isclass) {
					break
				}
			}
		}
		beforeIndex--
	}
	while (afterIndex <= lineText.text.length) {
		let after = afterChar(document, new vscode.Position(position.line, afterIndex))
		// 普通class 判断右边是否有"'即可
		if (['"', "'"].includes(after)) {
			isInside = true
			break
		}
		afterIndex++

	}

	return isclass && isInside
}

//该方法将在插件激活的时候调用
async function activate(context) {
	context.subscriptions.push(
		// vscode.workspace.onDidChangeTextDocument(e => console.log('=== onDidChangeTextDocumente ===', e)),
	);
	// 获取配置的文件

	// 悬停提示
	vscode.languages.registerHoverProvider({ language: 'vue' }, { provideHover });
	// 代码提示
	const cc = vscode.languages.registerCompletionItemProvider(
		["css", "html", "vue", "vue-html", "vue-directives"], {
			provideCompletionItems(document, position) {
				// const classReg = /class=["|']([^"|']+)/g;
				// const start = new vscode.Position(position.line, 0);
				// const range = new vscode.Range(start, position);
				// const lineText = document.lineAt(position);
				// const getWordRangeAtPosition = document.getWordRangeAtPosition(position,/[^\s'"]+/);
				// console.log('==== getWordRangeAtPosition :', getWordRangeAtPosition&&document.getText(getWordRangeAtPosition));

				// new ValidateVueClassName(document, position)
				if (!isInClass(document, position)) return null

				// 获取当前的输入
				const word = document.getWordRangeAtPosition(position, /[^\s'"]+/);
				console.log('==== word :', word);
				if (!word) return null

				// 根据单词生成提示
				let items = []

				items.push({
					label: 'wwwwwwwww3',
					kind: 11,
					detail: 'wwwwwwwww',
					documentation: {
						kind: 'markdown',
						value: '加载中The loading of a resource has been aborted.'
					},
					sortText: 'wwwwww',
					filterText: 'www',
					insertText: { _tabstop: 1, value: 'width1: ${0};' }
				})
				return { items }
				const match = lineText.match(classReg);
			},
		},
		'w'
	);
	context.subscriptions.push(cc);

}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
