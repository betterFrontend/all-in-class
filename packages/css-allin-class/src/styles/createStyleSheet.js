import fs from "fs"
import { resolve, join } from "path"
import { electCompRules, electRules } from "."
import { presetRules } from "../presetRules"
import { error, isArray, isFunction, isObject, isString, isPromise, warn } from "../utils";
const sass = require('sass');
// import postcss from "postcss"
import { getEnv } from '../utils/envInfo.ts'
import { addFix, removeFix } from "../utils/style";

// 创建规则的基础匹配表
export async function createStyleSheet({ userConfig }) {
	let preset = presetRules(userConfig)

	if (userConfig.presets && isArray(userConfig.presets)) {
		for (let fun of userConfig.presets) {
			let pre = fun
			if (isFunction(fun)) {
				pre = await fun()
			}
			if (isPromise(fun)) {
				continue
			}
			// 合并rules
			if (preset.rules && pre.rules && isArray(pre.rules)) {
				preset.rules = preset.rules.concat(pre.rules)
			}

			if (preset.composition && pre.shortcuts && isArray(pre.shortcuts)) {
				preset.composition = preset.composition.concat(pre.shortcuts)
			}

		}

	}

	// 合并用户配置
	if (preset.rules && isArray(userConfig.rules)) {
		preset.rules = preset.rules.concat(userConfig.rules)
	}

	if (preset.composition && isArray(userConfig.shortcuts)) {
		preset.composition = preset.composition.concat(userConfig.shortcuts)
	}


	// 区分动态和静态的规则
	let { dynamicRules, staticRules } = electRules(preset, userConfig)

	// 组合规则 组合是由多个单一的规则拼接在一起
	// Combi of atoms composition
	let { dynamicCompRules } = electCompRules(preset, staticRules, dynamicRules)

	// TODO
	// 根据css,自动生成动态的css 正则规则

	// 设置一个css文件地址,或者文件夹,读取内部的文件,生成css规则
	if (userConfig.cssFile) {
		let rulesByCssFile = await genRulesByCssFile(userConfig)
		// console.log('==== rulesByCssFile :', rulesByCssFile);

		staticRules = Object.assign(staticRules, rulesByCssFile)
	}
	return {
		staticRules,
		dynamicRules,
		dynamicCompRules,
	}
}

/**
 * 设置一个css文件地址,或者文件夹,读取内部的文件,生成css规则
 * @param {string} fileOrDir 文件地址,或者文件夹
 * @return {object}
 * TODO
 * less转换的问题
 */
export async function genRulesByCssFile(userConfig) {
	const envInfo = getEnv()
	// cssFile: {
	// 	input:'./style/index.scss',
	// 	prefix: 'ff',
	// 	suffix: 'ff',
	// 	rmPrefix: 'ff',
	// 	rmSuffix: 'ff',
	// },
	let cssFile = userConfig.cssFile
	if (isObject(cssFile)) {
		cssFile = cssFile.input
	}

	let fileOrDir = join(envInfo.projectRoot, cssFile)

	let rules = await getFileCss(fileOrDir, userConfig)

	return rules
}

export function getFileCss(fileOrDir, userConfig) {
	return new Promise((rsl, reject) => {
		fs.stat(fileOrDir, async (err, stats) => {
			if (err) {
				err += ''
				if (err.includes('no such file or directory')) {
					error('找不到当前文件或者路径：' + fileOrDir)
				}
				error(err)
				rsl({})
				return;
			}

			if (stats.isFile()) {
				let rulesObj = await getFileRulers(fileOrDir, userConfig)
				rsl(rulesObj)
			}

			if (stats.isDirectory()) {
				fs.readdir(fileOrDir, async (err, files) => {
					if (err) {
						rsl({})
						throw err;
					}

					let res = {}
					for (let file of files) {
						const filesDir = resolve(fileOrDir, './' + file)
						let fileres = await getFileCss(filesDir)
						res = Object.assign(res, fileres)
					}
					rsl(res)
				});
			}

		});
	})
}

async function getFileRulers(fileOrDir, userConfig) {
	let cssStr, rulesObj = {}

	// 判断文件类型
	if (fileOrDir.endsWith('.scss')) {
		cssStr = asssCompile(fileOrDir)
		// writeFile(cssStr)

	} else if (fileOrDir.endsWith('.less')) {
		// TODO 测试
		// cssStr = await lessCompile(fileOrDir)
		// writeFile(cssStr)

	} else {
		try {
			cssStr = fs.readFileSync(fileOrDir, 'utf-8')
		} catch (err) {

		}
	}

	// cssFile: {
	// 	input:'./style/index.scss',
	// 	prefix: 'ff',
	// 	suffix: 'ff',
	// 	rmPrefix: 'ff',
	// 	rmSuffix: 'ff',
	// },
	// 添加前缀后缀,移除前缀后缀
	let { prefix, suffix, cssFile } = userConfig
	let rmPrefix, rmSuffix
	if (isObject(cssFile)) {
		prefix = cssFile.prefix
		suffix = cssFile.suffix
		rmPrefix = cssFile.rmPrefix
		rmSuffix = cssFile.rmSuffix
	}

	if (cssStr) {
		rulesObj = (cssStr.match(/(?=\.)[^\{\}]+\{[^\{\}]+(?=\})/g) || [])
			.map(item => item.replace(/^\.*|\s*/g, '').split('{'))
			.reduce((tol, cur) => {
				let key = cur[0]

				key = removeFix(key, rmPrefix, rmSuffix)
				key = addFix(key, prefix, suffix)
				tol[key] = cur[1]

				return tol
			}, {})
	}

	return rulesObj
}

// async await 如何解决 传染性/传播性
function writeFile(str) {
	const envInfo = getEnv()
	fs.writeFile(join(envInfo.projectRoot, './cssCompiled.css'), str, "utf-8", function (
		err) {
		if (err) {
			throw new Error("写入数据失败");
		} else { }
	});
}

function asssCompile(filePath) {
	let result = ''
	try {
		// result = sass.compile(filePath);
		const result = sass.renderSync({
			file: filePath
		});
		// console.log(result.css.toString());
		return result.css.toString()
	} catch (err) {

		err = err + ''
		if (err.includes('Undefined variable')) {
			error('sass文件内存在未定义的变量')
			// console.error('解决方案：');
		}

		error(err)
	}
	return result
}

function lessCompile(lessInput) {
	return new Promise((rsl, reject) => {
		less.render(lessInput)
			.then((output) => {
				// output.css = string of css
				// output.map = string of sourcemap
				// output.imports = array of string filenames of the imports referenced
				rsl(output.css)
			},
				(err) => {
					error(err + '')
					rsl('')
				});
	})
}