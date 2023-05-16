import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { isAbsolute, normalize } from 'path'
import type { ResolvePluginInstance, RuleSetUseItem } from 'webpack'
// import type { ResolvedUnpluginOptions, UnpluginContextMeta, UnpluginFactory, UnpluginInstance, WebpackCompiler } from '../types'
// import { normalizeAbsolutePath, toArray } from '../utils'
// import { createContext } from './context'

const _dirname = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(
	import.meta.url))

const TRANSFORM_LOADER = resolve(_dirname, 'loader.js')

export function normalizeAbsolutePath(path: string) {
  if (isAbsolute(path))
    return normalize(path)
  else
    return path
}

class HelloWorldPlugin {
	constructor(options = {}) {
		// validate(schema, options, {
		// 	name: 'Hello World Plugin',
		// 	baseDataPath: 'options',
		// });
	}
	apply(compiler) {
		const useLoader = [{
			loader: `${TRANSFORM_LOADER}?pluginName=${encodeURIComponent(plugin.name)}`,
			options: {
				unpluginName: '',
			},
		}]
		compiler.options.module.rules.unshift({
			enforce: 'pre',
			use: (data: { resource: string | null;resourceQuery: string }) => {
				if (data.resource == null)
					return []

				const id = normalizeAbsolutePath(data.resource + (data.resourceQuery || ''))
				if (id.endsWith('.vue'))
					return useLoader

				return []
			},
		})
		// compiler.hooks.emit.tapAsync(
		//       'MyExampleWebpackPlugin',
		//       (compilation, callback) => {
		//         console.log('这是一个示例插件！');
		//         console.log(
		//           '这里表示了资源的单次构建的 `compilation` 对象：',
		//           compilation
		//         );

		//         // 用 webpack 提供的插件 API 处理构建过程
		//         compilation.addModule(/* ... */);

		//         callback();
		//       }
		//     );
	}
}
export defaul tHelloWorldPlugin
