const vscode = require('vscode');

export function provideHover(document, position, token) {
	const word = document.getWordRangeAtPosition(position, /[^\s'"]+/);
	console.log('==== word :', word);
	// 获取到当前hover的位置
	// 获取完整的内容 class通过空格分割

	// 根据单词 提示对应的意思

	// new vscode.MarkdownString
	// const contents = hover.contents
	let result = []
	// for (let element of contents) {
	//   let item = new vscode.MarkdownString()
	//   item.appendCodeblock(element.value, "java")
	// }

	let item = new vscode.MarkdownString("\n```js\n\nconst vsc = 1\n```\n\n[Link](http://a.com)\n> Blockquote\n`Inline code` with backticks\n---\n····const vsc = 1\n* **名称**：1\n* **版本**：content.version\n* **许可协议**：content.license\n1. One\n2. Two\n3. Three")
	item.appendMarkdown()
	return new Promise(resolve => {
		resolve(new vscode.Hover(item));
	});
}


// function provideHover(document, position, token) {
// 	const fileName = document.fileName;
// 	const workDir = path.dirname(fileName);
// 	const word = document.getText(document.getWordRangeAtPosition(position));
// 	if (/\/package\.json$/.test(fileName)) {
// 		console.log('进入provideHover方法');
// 		const json = document.getText();
// 		if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
// 			let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
// 			if (fs.existsSync(destPath)) {
// 				const content = require(destPath);
// 				console.log('hover已生效'); // hover内容支持markdown语法 
// 				return new vscode.Hover(`* **名称**：${content.name}\n* **版本**：${content.version}\n* **许可协议**：${content.license}`);
// 			}
// 		}
// 	}
// }

// const provider = {
// 	provideHover: (document, position, token) => {
// 		const vscode = vscode;
// 		const provideHover = (document2, position2, token2) => {

// 			return vscode.sendRequest('javascript', vscode.code2ProtocolConverter.asTextDocumentPositionParams(document2, position2), token2).then(vscode.protocol2CodeConverter.asHover, (error) => {
// 				return vscode.handleFailedRequest('javascript', error, null);
// 			});
// 		};
// 		return provideHover(document, position, token);
// 	}
// };
// hx.languages.registerHoverProvider('javascript', provider);
// module.exports = {
// 	provideHover
// }