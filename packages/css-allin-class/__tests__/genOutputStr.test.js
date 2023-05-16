import { describe, assert, expect, test, it } from 'vitest'
import preset from '../src/presetRules/preset';
import { genCssValue, genStyle } from '../src/styles';
import { createStyleSheet } from '../src/styles/createStyleSheet';
import { genOutputStr } from '../src/utils/style';
import { transformVueClass } from '../src/utils/transform';
import { vue2, vue3 } from './const/vue';

const userConfig = {
	presets: [preset]
}
const styleSheet = await createStyleSheet({ userConfig })

describe('vue文件 生成css和修改vue文件', async () => {
	it('vue3', async ({ expect }) => {
		const outputCssCache = {}
		const id = 'file1'
		const { classTokens, code } = transformVueClass(vue3, id)
		const plugin = { styleSheet, outputCssCache, modelsCssCache: {}, userConfig }
		let changed = genStyle(classTokens, plugin, id) // 生成css
		expect(code).toMatchSnapshot()
		expect(genOutputStr({ outputCss: outputCssCache })).toMatchSnapshot()
	})

	it('vue2', async ({ expect }) => {
		const outputCssCache = {}
		const id = 'file1'
		const { classTokens, code } = transformVueClass(vue2, id)
		const plugin = { styleSheet, outputCssCache, modelsCssCache: {}, userConfig }
		let changed = genStyle(classTokens, plugin, id) // 生成css
		expect(code).toMatchSnapshot()
		expect(genOutputStr({ outputCss: outputCssCache })).toMatchSnapshot()
	})
})
