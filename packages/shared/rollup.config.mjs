import commonjs from '@rollup/plugin-commonjs';
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'
import clear from 'rollup-plugin-clear';
import json from '@rollup/plugin-json';
// import polyfillNode from 'rollup-plugin-polyfill-node';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';

import ts from "rollup-plugin-typescript2";

const require = createRequire(
	import.meta.url)
const __dirname = fileURLToPath(new URL('.',
	import.meta.url))

// const packagesDir = path.resolve(__dirname, 'packages')
// const packageDir = path.resolve(packagesDir, process.env.TARGET)
// const packageDir = packagesDir

const resolve = p => path.resolve(__dirname, p)
// const pkg = require(resolve(`package.json`))
// const packageOptions = pkg.buildOptions || {}
// const name = packageOptions.filename || path.basename(packageDir)

// 'runtime-dev': {
//   entry: resolve('web/entry-runtime.ts'),
//   dest: resolve('dist/vue.runtime.js'),
//   format: 'umd',
//   env: 'development',
//   banner
// }

export default {
	input: {
		// 'loader': 'src/webpack/loader.js',
		'index': 'src/index.ts',
	},
	output: [
		{ dir: 'dist', format: 'cjs', exports: 'named', entryFileNames: '[name].js' },
		{ dir: 'dist', format: 'es', exports: 'named', entryFileNames: '[name].mjs' },
	],
	plugins: [
		// polyfillNode(),
		json(),
		clear({ targets: ['dist'] }), //清除dist目录
		ts({
			useTsconfigDeclarationDir: true // 指定生成声明文件存放目录。
		}),
		nodeResolve({ preferBuiltins: true }),
		// commonjs(),
		terser(), // 压缩代码
		cleanup() // 去除无效代码
	],
};
