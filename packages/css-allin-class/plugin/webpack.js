import WebpackSources from 'webpack-sources';
import fs from 'fs'
import path from 'path'
import { PLUGIN_NAME, CSS_PLACE_HOLDER_KEY, POLYFILL_ID } from '../constant';
import testloadder from '../loader/load';

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { getEnv } from './envInfo.js'
const _dirname = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(
	import.meta.url))

const TRANSFORM_LOADER = resolve(
	_dirname,
	'load.cjs',
)

const LOAD_LOADER = resolve(
	_dirname,
	'load.cjs',
)

function reload(reload1) {
	console.log('==== reload :');
}

export function webpackHooks(compiler, outputCss) {
	let info = getEnv()
	// console.log('==== LOAD_LOADER :', LOAD_LOADER);
	// 给webpack增加插件
	const loaders = [{
		// loader: 'D:\\file\\HBuilderProjects\\uniapp-css-loader\\packages\\css\\dist\\load.cjs',
		loader: LOAD_LOADER,
		options: { reload },
		ident: PLUGIN_NAME,
	}]
	// compiler.options.module.rules.unshift({
	// 		include(id) {
	// 			// if (id.startsWith(plugin.__virtualModulePrefix))
	// 			// 	id = decodeURIComponent(id.slice(plugin.__virtualModulePrefix.length))
	// 			// // load include filter
	// 			// if (plugin.loadInclude && !plugin.loadInclude(id))
	// 			// // 	return false
	// 			if (id.endsWith('.vue')) {
	// 				console.log('\n==== include compiler.LOAD_LOADER:', id);
	// 				return true
	// 			}
	// 		},
	// 	// test: /\.css$/,
	// 	use: loaders
	// })
	// compiler.options.module.rules.unshift({
	// 	// include(id) {
	// 	// 	// if (id.startsWith(plugin.__virtualModulePrefix))
	// 	// 	// 	id = decodeURIComponent(id.slice(plugin.__virtualModulePrefix.length))
	// 	// 	// // load include filter
	// 	// 	// if (plugin.loadInclude && !plugin.loadInclude(id))
	// 	// 	// // 	return false
	// 	// 	if (id.includes(POLYFILL_ID)) {
	// 	// 		console.log('\n==== include compiler.LOAD_LOADER:', id);
	// 	// 		return false
	// 	// 	}
	// 	// },
	// 	test: /\.vue$/,
	// 	enforce: 'pre',
	// 	use: [{
	// 		loader: LOAD_LOADER,
	// 		// options: {
	// 		// 	reload
	// 		// },
	// 	}],
	// })
	// const loaders = [{
	// 	loader: TRANSFORM_LOADER,
	// 	options: { plugin },
	// 	ident: plugin.name,
	// }]
	// compiler.options.module.rules.unshift({
	// 	enforce: plugin.enforce,
	// 	use: (data: { resource: string | null;resourceQuery: string }) => {
	// 		if (data.resource == null)
	// 			return []

	// 		const id = normalizeAbsolutePath(data.resource + (data.resourceQuery || ''))
	// 		if (!plugin.transformInclude || plugin.transformInclude(id))
	// 			return loaders

	// 		return []
	// 	},
	// })
	compiler.hooks.watchRun.tapAsync(PLUGIN_NAME, (compilation, callback) => {
		// console.log('====  watchRun:', 1);
		// compilation.hooks.succeedModule.tapAsync(
		//   'SourceMapDevToolModuleOptionsPlugin',
		//   (module,callback1) => {
		//     // module.useSourceMap = true;
		// 		console.log('====  succeedModule:', 1);
		// 		const timer = setTimeout(() => {
		// 			callback1()
		// 			clearTimeout(timer)
		// 		}, 1000);
		//   }
		// );
		callback()
	});
	compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
		compilation.hooks.buildModule.tap(
			'SourceMapDevToolModuleOptionsPlugin',
			(module) => {
				// C:\Users\cmz\App\HBuilderX\plugins\uniapp-cli\_virtual_odcss.css
				let id = module.identifier()
				// if (id&&id.endsWith(POLYFILL_ID)) {
				// name
				if (id && id.endsWith('App.vue')) {
					// console.log('====  hooks.buildModul endsWith:', module.source);
					// 
					// console.log('==== module.source :', module.loaders);
				}
				if (id && id.endsWith(POLYFILL_ID)) {
					// console.log('====  hooks.buildModul endsWith:', module.source);
					// console.log('====  hooks.buildModul endsWith:', module.identifier);
					// 
					// console.log('==== module.source :', module.loaders);
					// let pathh = path.resolve(process.cwd(),'./_virtual_odcss.css')
					// console.log('==== pathh :', pathh);

					// fs.access(pathh,(err)=>{
					// 	console.log('==== err :', err);
					// 	if (!err) {
					// 		let str = fs.readFileSync(pathh, 'utf8')
					// 		console.log('==== str :', str);
					// 	}
					// })

					// 
				}
				// if (id&&id.includes(POLYFILL_ID)) {
				// 	console.log('====  hooks.buildModul includes:',id );
				// }
				// module.useSourceMap = true;
				// POLYFILL_ID

			}
		);
		compilation.hooks.optimizeAssets.tapPromise(PLUGIN_NAME, async () => {
			// 生产css
			let outputStr = ''
			// Object.values(outputCss).filter(item => {
			// 	if (item.num <= 0) return
			// 	if (info.uniappPlatfrom === 'h5') {
			// 		item.value = item.value.replace(/(\d+)(?:rpx;)/g, (x, v) => {
			// 			console.log('==== xxxxx :', x);
			// 			console.log('==== vvvvv :', v);
			// 			return `%?${v}?%`
			// 		})
			// 	}
			// 	outputStr += `.${item.token}{${item.value}}`
			// })

			// TODO 
			// css添加前缀，uniapp的H5,rpx单位特别处理 
			// 解决方案：
			// 1.使用postcss处理。优点，个性化，简单易处理，缺点，uni各平台兼容，需要自己来做
			// 2.在编译阶段，生成内容。优点，uni各平台兼容性，交给官方做，缺点：每个文件修改，都要生成一次输出内容

			// 尝试先实现 在每个文件修改，都要生成一次输出内容

			console.log('==== outputStr1 :', outputStr);
			// 替换内容输出
			// output(compilation, outputStr,info)

			console.log('\n打包输出文件');
		})
	})

}


function output(compilation, outputStr,info) {
	const files = Object.keys(compilation.assets)
	const regexp = RegExp(CSS_PLACE_HOLDER_KEY);

	for (const file of files) {
		console.log('==== file :', file);
		// if (file.length <= 3) return
	
		let code = compilation.assets[file].source().toString()
		let isNeedReplace = false
		code = code.replace(regexp, (x) => {
			isNeedReplace = true
			console.log('==== replace x :', x);
			return outputStr
		})
		if (isNeedReplace) {
			console.log('==== replace file :', file);
			compilation.assets[file] = new WebpackSources.RawSource(code)
		}
		// 还要解决热更新的问题 打包前生成的新模块，在当前位置无效
		// 解决方案 不适用虚拟文件，使用真实文件，每次手动修改文件的内容
		if (info.uniappPlatfrom === 'h5' && file.includes('.hot-update.js')) {
			
		}
		if (file == 'index.html') {
		}
	}
}
// finishModules
// compilation.hooks.optimizeModules.tap(PLUGIN_NAME,
// 	(modules) => {
// 		// console.log('==== optimizeModules module :', modules[0]);
// 		// console.log('==== optimizeModules module :', modules[1]);
// 		// console.log('==== optimizeModules module :', modules[2]);
// 		modules.forEach((module) => {
// 			// console.log('==== module.resource :', module.resource);
// 			let aa = module.resource + ''
// 			if (aa.endsWith('index.vue')) {
// 				// console.log('==== module :', module.dependencies[3]);
// 				// console.log('==== modulemodule.hot :', module.dependencies);
// 				// module.dependencies.push()
// 				// module.hot.accept(
// 				//   dependencies:'index11111111111', // 可以是一个字符串或字符串数组
// 				//   callback:()=>{
// 				// 		console.log('==== hot.accept 1111 :', 1111);
// 				// 	}, // 用于在模块更新后触发的函数
// 				//   errorHandler:(err, {moduleId, dependencyId}) => {}// errorHandler // (err, {moduleId, dependencyId}) => {}
// 				// );
// 			}
// 		}) // 用于在模块更新后触发的函数
// 		// module.useSourceMap = true;
// 	}
// );
// compilation.hooks.finishModules.tapAsync(PLUGIN_NAME,
//   (modules, callback) => {
// 		console.warn('==== module :', modules);
// 		// modules.forEach((module) => {
// 		// 	// console.log('==== module :', module.resource);
// 		// })
//     // module.useSourceMap = true;
// 		const timer = setTimeout(() => {
// 			callback()
// 			clearTimeout(timer)
// 		}, 1000);
//   }
// );
// compilation.hooks.buildModule.tap(PLUGIN_NAME,
// 	(module) => {
// 		// // console.log('==== module :', module.resource);
// 		if (module.resource && module.resource.includes(POLYFILL_ID)) {
// 			// console.log('\n==== buildModule :',module.resource);
// 			// console.log('==== module.contextDependencies :', module.contextDependencies);
// 			// transformPolyfillId = id
// 		}
// 		// if (module.resource&&module.resource.endsWith('.vue') ) {
// 		// 	console.log('\n==== buildModule endsWith vue:',module.resource);
// 		// 	console.log('==== module.contextDependencies :', module.contextDependencies);
// 		// 	// transformPolyfillId = id
// 		// }
// 		//   // module.useSourceMap = true;
// 	}
// );

// compiler.hooks.normalModuleFactory.tap(PLUGIN_NAME, (NormalModuleFactory) => {
// 	if (NormalModuleFactory && NormalModuleFactory.hooks && NormalModuleFactory.hooks
// 		.resolve && NormalModuleFactory.hooks.resolve.tapAsync) {
// 		NormalModuleFactory.hooks.resolve.tapAsync(
// 			PLUGIN_NAME,
// 			(resolveid, callback) => {
// 				console.log("==== webpack hooks resolveid :", resolveid);
// 				callback();
// 			}
// 		);
// 	}
// });

// compiler.hooks.entryOption.tap(PLUGIN_NAME, (context, entry) => {
// 	console.log('====  entry:', entry);
// 	console.log('==== context :', context);
// });
// module.hot.accept(
//   dependencies, // 可以是一个字符串或字符串数组
//   callback // 用于在模块更新后触发的函数
//   errorHandler // (err, {moduleId, dependencyId}) => {}
// );

// // or
// import.meta.webpackHot.accept(
//   dependencies, // 可以是一个字符串或字符串数组
//   callback, // 用于在模块更新后触发的函数
//   errorHandler // (err, {moduleId, dependencyId}) => {}
// );

// compiler.hooks.afterCompile.tap('after-compile', compilation => {
// 	// console.log('==== process.cwd() :', process.env.UNI_INPUT_DIR);
// 	// 
// 	compilation.fileDependencies.add(resolve(
// 		'D:\\file\\HBuilderProjects\\uniapp-css-loader\\template\\uniapp\\test.json'
// 	));
// 	compilation.fileDependencies.forEach(file => {
// 		// 
// 		let filefile = file + ""
// 		if (filefile.endsWith('test.json')) {
// 			// console.log('==== file :', file);
// 		}
// 	});
// 	// for adding a specific file
// 	// compilation.fileDependencies.forEach(file => {
// 	//   compilation.fileDependencies.add(resolve(file));
// 	// });

// 	//     // for adding a dir
// 	//     dirDependencies.forEach(dir => {
// 	//       compilation.contextDependencies.add(dir);
// 	//     });
// });
