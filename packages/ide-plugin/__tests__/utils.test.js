import { assert, expect, test } from 'vitest'
import { isInTemplateClass } from '../src/utils/style';
let preset = [] 

test('isInTemplateClass', async () => {
	// 13 28
	expect(isInTemplateClass('class="abou1"', 11)).toBe(true)
	expect(isInTemplateClass(' cass="abou2"', 11)).toBe(false)
	expect(isInTemplateClass('class="abou3"', 1)).toBe(false)
	expect(isInTemplateClass('class="abou4"', 7)).toBe(false)
	expect(isInTemplateClass('class="abou5" :class="about"', 24)).toBe(true)
	expect(isInTemplateClass('class="abou6" :class="about"', 16)).toBe(false)
	expect(isInTemplateClass('class="abou7" :class="about"', 13)).toBe(false)
	expect(isInTemplateClass(`class='abou8' :class="about"`, 11)).toBe(true)
	expect(isInTemplateClass(`class="about" :class="cc ? 'sdfs' : 'fasdf'"`, 29)).toBe(true)

})
