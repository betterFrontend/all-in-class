import { isArray, isFunction, isObject, isString } from "../index"

export function addFix(val: string, prefix: string = "", suffix: string = "") {
	return `${prefix}${val}${suffix}`
}

export function removeFix(val: string, prefix: string, suffix: string) {
	let resStr = val;
	if (prefix) {
		const pre = RegExp(`^${prefix}`, 'g');
		resStr = val.replace(pre, '')
	}
	if (suffix) {
		const suf = RegExp(`^${suffix}$`, 'g');
		resStr = val.replace(suf, '')
	}

	return resStr
}

interface UserConfig {
	prefix?: string;
	suffix?: string;
}

interface Preset {
	rules?: Array<any>;
}
interface Rules {
	[propname:string]: any;
}
/**
 * 用户classToken来匹配值
 * @param {object} preset {rules,....} 配置的规则
 * @param {object} userConfig 
 */

export function separateRules(preset: any, userConfig: UserConfig = {}) {
	let dynamicRules: Rules = {}
	let staticRules: Rules = {}
	const { prefix, suffix } = userConfig

	for (let rule of preset.rules) {
		if (isArray(rule) && rule[0] && rule[1] && isFunction(rule[1])) {
			// [rule,()=>{}]
			dynamicRules[rule[0]] = rule
			continue
		}

		if (isArray(rule) && rule[0] && rule[1] && isString(rule[0]) && isString(rule[1])) {
			let [key, val] = rule;
			// 添加前缀和后缀
			const prefixedKey:string = addFix(key, prefix, suffix)

			// {rule:value}
			staticRules[prefixedKey] = addSemicolon(val)
			continue
		}

		if (isObject(rule)) {
			for (let [key, val] of Object.entries(rule)) {
				if (isString(key) && isString(val)) {

					// 添加前缀和后缀
					const prefixedKey:string = addFix(key, prefix, suffix)

					// {rule:value}
					staticRules[prefixedKey] = addSemicolon(val as string)
				}
			}
			continue
		}

		// throw new Error(`非法的规则:${rule}`)
	}

	return { dynamicRules, staticRules }
}

function addSemicolon(rule: string) {
	return rule.endsWith(';') ? rule : rule + ';';
}
