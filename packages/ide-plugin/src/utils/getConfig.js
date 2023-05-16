const fs = require('fs')
import {  resolve, join,  normalize, basename } from 'path'

class ConfigLoader {
	constructor({ files, extensions, projectRoot }) {
		this.files = files || 'allin.config';
		this.extensions = extensions || ['js'];
		// this.extensions = extensions || ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''];
		this.projectRoot = projectRoot;
		this.depFiles = []
		this.accessPath = []
	}
	async loadConfig() {
		let newFilePath = await this.rewriteFile()
		let vueConfigFile = await this.readConfig(newFilePath)
		return vueConfigFile
	}
	async readConfig(newFilePath) {
		if (!newFilePath) return

		let vueConfigFile
		try {
			vueConfigFile = require(newFilePath)
		} catch (err) {
			console.log('==== import err :', err);
			return
		}
		removeFile(newFilePath)
		// let plugin = vueConfigFile?.configureWebpack?.plugins.find(plugin => plugin.namename === '111111') || {}
		// let config = plugin.userConfig || {}

		return vueConfigFile
	}
	async rewriteFile() {
		let newFilePath
		for (let exten of this.extensions) {
			const fileName1 = this.files + '.' + exten
			const filePath = resolve(this.projectRoot, './' + fileName1)
			try {
				// 使用 fs.accessSync() 方法判断文件是否存在
				fs.accessSync(filePath, fs.constants.F_OK);
				// delete require.cache[filePath];
				this.accessPath.push(filePath)
				newFilePath = await this.transformFile(filePath)
				break
			} catch (err) {
				console.log('==== err :', err);
				continue
				// console.error('文件不存在');
			}
		}
		return newFilePath
	}
	transformFile(filePath) {
		let configFile = fs.readFileSync(filePath, 'utf-8');
		configFile = configFile.replace(/css-allin-class\//g, 'css-allin-class/dist/')
		let str = configFile
		console.log('==== configFile :', configFile);
		configFile = this.replacPath(configFile, str, filePath)

		let bundleFilepath = resolve(__dirname, basename(filePath))

		fs.writeFileSync(bundleFilepath, configFile + '', 'utf-8')
		delete require.cache[bundleFilepath];

		// // 移除依赖文件缓存
		// for (const dep of this.depFiles) {
		// 	delete require.cache[dep.normalPath];
		// }

		return bundleFilepath
	}
	matchConfig() {
		for (let filePath of this.accessPath) {
			let configFile = fs.readFileSync(filePath, 'utf-8');

			let matchs = configFile.match(
				/(\/\/)*\s+(?:(const|var|let))\s+(\w+)\s*=\s*require\(\s*['"](css-allin-class)['"]\s*\)/)
			if (matchs) {
				const regexp = RegExp(`(?:${matchs[3]})\\s*\\(\\s*\\{\\s*((\\S*\\s*)+?)\\s*(?=}\\)\\s*)`);
				let config = configFile.match(regexp)
				if (config) {
					// console.log('==== config[1] :', config[1]);
					// 匹配预设和规则文件

				}
				// odcss({
				// 	framework:'webpack',
				// 	presets:[css()]
				// })
				// name[2]

				// console.log('==== match[0] :', match);
			}
		}

		return configFile
	}
	replacPath(configFile, replacedStr, filePath) {
		configFile = this.replacNodeModulesPath(configFile, replacedStr, filePath)
		let str = configFile
		configFile = this.replacRelativePath(configFile, str, filePath)
		return configFile
	}
	addDep(dep) {
		this.depFiles.push(dep)
	}
	reqerPath(str) {
		let filePath = join(this.projectRoot, 'node_modules', str)
		return resolve(__dirname, filePath).replace(/\\/g, '/')
	}
	replacNodeModulesPath(configFile, replacedStr, filePath1) {
		// 替换相对路径
		// 添加nodemodel路径
		let match = replacedStr.match(/(\/\/)*\s+(?:(const|var|let))\s+(\w+)\s*=\s*require\(\s*['"](.*?)['"]\s*\)/)
		if (match) {
			// console.log('==== match[0] :', match[0]);
			if (!match[1] && !match[4].startsWith('./') && !match[4].startsWith('../')) {
				// 替换相对路径
				let newPath = this.reqerPath(match[4])
				configFile = configFile.replace(`${match[4]}`, `${newPath}`)

				this.addDep({
					normalPath: normalize(newPath),
					filePath: newPath,
					name: match[2],
					path: match[4],
					lastModifiedTime: null
				})
			}

			replacedStr = replacedStr.slice(match.index + match[0].length)
			return this.replacNodeModulesPath(configFile, replacedStr) || configFile
		}
		return configFile
	}

	replacRelativePath(configFile, replacedStr, filePath1) {
		// 替换相对路径
		// 添加nodemodel路径
		let match = replacedStr.match(
			/(\/\/)*\s+(?:(const|var|let))\s+(\w+)\s*=\s*require\(\s*['"](\.?\.?\/.*?)['"]\s*\)/)
		if (match) {
			if (!match[1]) {
				let filePath = match[4]
				if (!filePath.endsWith('.js')) {
					filePath += '/index.js'
				}

				// 替换相对路径
				let newPath = resolve(__dirname, join(this.projectRoot, filePath)).replace(/\\/g, '/')
				configFile = configFile.replace(`${match[4]}`, `${newPath}`)
				this.addDep({
					normalPath: normalize(newPath),
					filePath: newPath,
					name: match[2],
					path: match[4],
					lastModifiedTime: null
				})
			}

			replacedStr = replacedStr.slice(match.index + match[0].length)
			configFile = this.replacRelativePath(configFile, replacedStr) || configFile
			return configFile
		}
		return configFile
	}
}


export async function loadConfig({ files, extensions, projectRoot }) {
	// let loader = new ConfigLoader({ files, extensions, projectRoot })
	// let res = await loader.loadConfig()
	let res
	let config = {}

	res = await requireConfig(resolve(projectRoot, './vue.config.js'))
	if (res) {
		let plugin = res?.configureWebpack?.plugins.find(plugin => plugin.namename === '111111') || {}
		config = Object.assign(config, plugin.userConfig)
		console.log('==== config 111 :', config);
	}
	
	res = await requireConfig(resolve(projectRoot, './allin.config.js'))
	if (res) {
		config = Object.assign(config, res)
		console.log('==== config 22222 :', config);
	}
	// res = await requireConfig(resolve(projectRoot, './vite.config.mjs'))
	// if (res) {
	// 	config = Object.assign(config, res)
	// }
	return config
}

async function requireConfig(filePath) {
	let res
	try {
		// 使用 fs.accessSync() 方法判断文件是否存在
		fs.accessSync(filePath, fs.constants.F_OK);
		delete require.cache[normalize(filePath)];
		// delete require.cache[filePath];
		res = require(filePath);

	} catch (err) {
		console.log('==== 文件不存在 err :', err);
		// console.error('文件不存在');
	}
	// try {
	// 	res = await import(`file:///${filePath}`).then(res => {
	// 		console.log('==== filePathfilePath :', filePath);
	// 		console.log('\n==== resresresresres :', res);
	// 	});
	// } catch (err) {
	// 	console.log('==== 文件不存在 err :', err);
	// 	// console.error('文件不存在');
	// }

	return res
}

async function removeFile(bundleFilepath) {
	await fs.unlink(bundleFilepath, (err) => {
		if (err) throw err;
		// console.log('文件已成功删除');
	});
}
