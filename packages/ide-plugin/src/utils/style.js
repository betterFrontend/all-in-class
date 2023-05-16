export function isInTemplateClass(lineText, index) {
	const classRegexp = /(?<=\bclass=")(.*?)(?=")|(?<=\bclass=')(.*?)(?=')/g
	let match;

	while ((match = classRegexp.exec(lineText)) !== null) {
		if (match.index < index && index <= (match.index + match[0].length)) {
			return true;
		}
	}

	return false;
}

export function isInClass(document, position) {
	const vueLangId = 'vue';
	const classAttr = 'class';

	// 获取当前语言类型
	const languageId = document.languageId;
	if (languageId !== vueLangId) {
		// 当前不在 Vue 文件中，返回 false
		return false;
	}

	// 获取当前行的长度
	const lineText = document.lineAt(position);
	const text = line.text;

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


