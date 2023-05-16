import { describe, assert, expect, test, it } from 'vitest'
import { isEmpty, isFunction, unique } from '../src';
import { transformCase, convertToWords } from '../src/utils/changeNamingStyle'

const resArr = [
	'aaDdCc', 'AaDdCc',
	'aa_dd_cc', 'AA_DD_CC',
	'aa-dd-cc', 'AA-DD-CC',
	'AA DD CC', 'aa dd cc',
	'AADDCC', 'aaddcc'
]
describe('预设规则', async () => {
	
	test('任何形式转换为空格分割的单词', async () => {
		expect(convertToWords('snake_  caseA--A')).toBe('snake case a a')
		expect(convertToWords('AAAA_BBB_CCC')).toBe('aaaa bbb ccc')
		expect(convertToWords('snake.caseA.name')).toBe('snake case a name')
		expect(convertToWords('snake. caseA-__name')).toBe('snake case a name')
	})
	test('转换格式', async () => {
		expect(transformCase(convertToWords('AADDCC'))).toStrictEqual(['aaddcc', 'Aaddcc',
			'AADDCC'
		])
		expect(transformCase(convertToWords('aa._---dd_  .cc'))).toStrictEqual(resArr)
		expect(transformCase(convertToWords('aa_---dd_  cc'))).toStrictEqual(resArr)
		expect(transformCase(convertToWords('aa_dd_cc'))).toStrictEqual(resArr)
		expect(transformCase(convertToWords('aa-dd-cc'))).toStrictEqual(resArr)
		expect(transformCase(convertToWords('AA_DD_CC'))).toStrictEqual(resArr)
		expect(transformCase(convertToWords('AA-DD-CC'))).toStrictEqual(resArr)
		expect(transformCase(convertToWords('aa_dd_cc'))).toStrictEqual(resArr)
		expect(transformCase(convertToWords('AaDdCc'))).toStrictEqual(resArr)
		expect(transformCase(convertToWords('aaDdCc'))).toStrictEqual(resArr)
		expect(transformCase(convertToWords('snake_caseA-A'))).toStrictEqual([
			'snakeCaseAA',
			'SnakeCaseAA',
			'snake_case_a_a',
			'SNAKE_CASE_A_A',
			'snake-case-a-a',
			'SNAKE-CASE-A-A',
			'SNAKE CASE A A',
			'snake case a a',
			'SNAKECASEAA',
			'snakecaseaa'
		])
	})
})


// 判断输入类型

// function transform(str) {
//   if (typeof transform.currentFormatIndex === 'undefined') {
//     transform.currentFormatIndex = 0;
//   } else {
//     transform.currentFormatIndex = (transform.currentFormatIndex + 1) % transform.formats.length;
//   }
//   const currentFormat = transform.formats[transform.currentFormatIndex];
//   switch(currentFormat) {
//     case 'camelCase':
//       return str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
//     case 'PascalCase':
//       return str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '').replace(/^./, c => c.toUpperCase());
//     case 'kebab-case':
//       return str.replace(/[A-Z]+/g, m => `-${m.toLowerCase()}`).replace(/[_\s]+/g, '-').replace(/^-/, '');
//     case 'snake_case':
//       return str.replace(/[A-Z]+/g, m => `_${m.toLowerCase()}`).replace(/[-\s]+/g, '_').replace(/^_/, '');
//     default:
//       return str;
//   }
// }

// transform.formats = ['camelCase', 'PascalCase', 'kebab-case', 'snake_case'];
// function transform(str) {
//   const currentFormatIndex = transform.currentFormatIndex ?? 0;
//   const currentFormat = transform.formats[currentFormatIndex];
//   transform.currentFormatIndex = (currentFormatIndex + 1) % transform.formats.length;
//   switch (currentFormat) {
//     case 'camelCase':
//       return str.replace(/[-_\s]+(.)?/g, (_, c) => c?.toUpperCase() ?? '');
//     case 'PascalCase':
//       return str.replace(/[-_\s]+(.)?/g, (_, c) => (c?.toUpperCase() ?? '')).replace(/^./, c => c.toUpperCase());
//     case 'kebab-case':
//       return str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`).replace(/[_\s]/g, '').replace(/^-/, '');
//     case 'snake_case':
//       return str.replace(/[A-Z]/g, m => `_${m.toLowerCase()}`).replace(/[-\s]/g, '_').replace(/^_/, '');
//     default:
//       return str;
//   }
// }

// transform.formats = ['camelCase', 'PascalCase', 'kebab-case', 'snake_case'];


function convertNamingStyle(str) {
	const patterns = [
		// 小驼峰命名
		/^[a-z]+([A-Z][a-z]+)*$/,
		// 大驼峰命名
		/^[A-Z]+([A-Z][a-z]+)*$/,
		// 下划线命名
		/^[a-z]+(_[a-z]+)*$/,
		// 大写下划线命名
		/^[A-Z]+(_[A-Z]+)*$/,
		// 中划线命名
		/^[a-z]+(-[a-z]+)*$/,
		// 大写中划线命名
		/^[A-Z]+(-[A-Z]+)*$/,

	];

	const styles = [
		// 小驼峰命名
		(s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`,
		// 大驼峰命名
		(s) => `${s.charAt(0).toLowerCase()}${s.slice(1)}`,
		// 下划线命名
		(s) => s.replace(/_([a-z])/g, (_, p1) => p1.toUpperCase()),
		// 大写下划线命名
		(s) => s.toLowerCase().replace(/_([a-z])/g, (_, p1) => p1.toUpperCase()),
		// 中划线命名
		(s) => s.replace(/-([a-z])/g, (_, p1) => p1.toUpperCase()),
		// 大写中划线命名
		(s) => s.toLowerCase().replace(/-([a-z])/g, (_, p1) => p1.toUpperCase()),
	];

	for (let i = 0; i < patterns.length; i++) {
		if (patterns[i].test(str)) {
			return styles[i](str);
		}
	}

	return str;
}
