import { describe, assert, expect, test, it } from 'vitest'
import { isEmpty, isFunction, formatPrice, unique } from '../src'
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
  it('价格的格式化', async ({ expect }) => {
    expect(formatPrice(11)).toBe(11)
    expect(formatPrice(11.1)).toBe(11.1)
    expect(formatPrice(11.1)).toBe(11.1)
    expect(formatPrice(11.1)).toBe(11.1)
    expect(formatPrice(11.0001)).toBe(11)
    expect(formatPrice(11.1111)).toBe(11.11)
    expect(formatPrice(110.1111)).toBe(110.11)
    expect(formatPrice(110.11001)).toBe(110.11)
  })
  console.log('==== toFixed(11) :', formatPrice(11))
})
