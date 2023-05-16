import { assert, expect, test } from 'vitest'
import { Reg2str } from '../src';
import preset from 'css-allin-class/../dist/preset';

let rules = preset().rules
test('isInTemplateClass', async () => {
	for (let rule of rules) {
		
		if (rule[0]) {
			let str = new Reg2str(rule[0]).setMax(0).gen()
				console.log('==== Reg2str(//).gen() :', str);
		}
	}
	// console.log('==== Reg2str(//).gen() :', new Reg2str(rules[1][0]).gen());
	// console.log('==== Reg2str(//).gen() :', new Reg2str(rules[3][0]).setMax(5).gen());
	// console.log('==== Reg2str(//).gen() :', new Reg2str(rules[4][0]).setMax(2).gen());
	// console.log('==== Reg2str(//).gen() :', new Reg2str(rules[4][0]).setMax(2).gen());
	// console.log('==== Reg2str(//).gen() :', new Reg2str(rules[4][0]).setMax(2).gen());
	// console.log('==== Reg2str(//).gen() :', new Reg2str(rules[5][0]).setMax(2).gen());
	// console.log('==== Reg2str(//).gen() :', new Reg2str(rules[5][0]).setMax(2).gen());
	// console.log('==== Reg2str(//).gen() :', new Reg2str(rules[5][0]).setMax(2).gen());
	// console.log('==== Reg2str(//).gen() :', new Reg2str(rules[5][0]).setMax(2).gen());
	// expect( rules[1][0].test(new Reg2str(rules[1][0]).setMax(0).gen())).toBe(true)
})
