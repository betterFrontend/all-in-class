import { describe, assert, expect, test, it } from 'vitest'
import { isEmpty, isFunction, unique } from '../src';
import { transformCase, convertToWords } from '../src/utils/changeNamingStyle'

describe('预设规则', async () => {
	it('is', async ({ expect }) => {
		expect(isFunction('snake_  caseA--A')).toBe(false)
		expect(isFunction(() => {})).toBe(true)
		expect(isFunction(async () => {})).toBe(true)
		expect(isFunction(convertToWords)).toBe(true)
		expect(isEmpty('')).toBe(true)
		expect(isEmpty()).toBe(true)
	})
})
