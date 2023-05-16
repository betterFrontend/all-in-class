const fs = require('fs');
const path = require('path');

function genReademe() {
	// 读取 README 模板文件
	const template = fs.readFileSync(path.resolve(__dirname, './template/README.md'), 'utf-8');
	const presetRule = fs.readFileSync(path.resolve(__dirname, '../__tests__/presetRule.test.js'), 'utf-8');
	let markdown = generateMarkdown(presetRule)

	// 替换模板中的占位符
	const replacedTemplate = template.replace(/\{\{presetExample\}\}/g, markdown)
		.replace(/\t/g, '  ')

	// 写入新的 README 文件
	fs.writeFileSync(path.resolve(__dirname, '../README.md'), replacedTemplate);
}

function generateMarkdown(testCase) {
	const regex = /it\('([^']+)'[^=]+([^}])+\}\)/g
	let res = ''
	const matches = testCase.match(regex)
	if (matches) {
		res = matches.map(testCase => {
			testCase = testCase.replace(/expect\(genCssValue\(/g, 'class=')
			testCase = testCase.replace(/,\s*styleSheet\)\.value\)\.toBe\(/g, ' => ')
			testCase = testCase.replace(/it\(\'(.+)\'/g, '### $1')
			testCase = testCase.replace(/,\s*async\s*\(\{\s*expect\s*\}\)\s*=>\s*\{/g, '\n```js')
			testCase = testCase.replace(/'\)/g, '\'')
			testCase = testCase.replace(/\}\)/g, '```\n')
			testCase = testCase.replace(/undefined\)/g, '// 匹配不到 不会生成样式')
			testCase = testCase.replace(/\t/g, '')
			return testCase
		}).join('\n');
	}

	return res;
}

module.exports = genReademe