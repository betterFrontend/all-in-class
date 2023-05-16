import { describe, assert, expect, test, it } from 'vitest'
import { isEmpty, isFunction, unique } from '../src';
import { separateRules } from '../src/style/style';
import { transformCase, convertToWords } from '../src/utils/changeNamingStyle'
import { preset } from './data';


describe('预设规则', async () => {
	it('is', async ({ expect }) => {
		expect(separateRules({rules:preset})).toMatchSnapshot()
	})
})

