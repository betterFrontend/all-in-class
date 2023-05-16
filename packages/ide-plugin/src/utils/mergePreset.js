import { isArray, isPromise, isFunction } from "@a/shared"


export async function mergePreset(userConfig, preset) {
	if (!userConfig) return preset
	// config
	// {
	// 	rules: { colorRed: 'color:red;' },
	// 	presets: [{ rules: [Array], shortcuts: [Array] }]
	// }
	if (isArray(userConfig.presets)) {
		for (let fun of userConfig.presets) {
			let pre = fun
			if (isFunction(fun)) {
				pre = await fun()
			}
			if (isPromise(fun)) {
				continue
			}
			
			// 合并rules
			preset.rules = concat(preset.rules, pre.rules)
			preset.shortcuts = concat(preset.shortcuts, pre.shortcuts)
		}
	}
	
	preset.rules = concat(preset.rules, userConfig.rules)
	preset.shortcuts = concat(preset.shortcuts, userConfig.shortcuts)
	return preset
}

function concat(shortcuts, userConfigshortcuts) {
	if (shortcuts && isArray(userConfigshortcuts)) {
		shortcuts = shortcuts.concat(userConfigshortcuts)
	}
	return shortcuts
}

function fun() {
	// 区分动态和静态的规则
	let { dynamicRules, staticRules } = electRules(preset, userConfig)

	// 组合规则 组合是由多个单一的规则拼接在一起
	// Combi of atoms composition
	let { dynamicCompRules } = electCompRules(preset, staticRules, dynamicRules)
}


/**
 * 用户classToken来匹配值
 * @param {object} preset {rules,....} 配置的规则
 * @param {object} userConfig 
 */
export function electRules(preset, userConfig) {
	let dynamicRules = {},
		staticRules = {}
	const { prefix, suffix } = userConfig

	for (let rule of preset.rules) {
		if (isArray(rule) && rule[0] && rule[1] && isFunction(rule[1])) {

			// [rule,()=>{}]
			dynamicRules[rule[0]] = rule
			continue
		}

		if (isArray(rule) && rule[0] && rule[1] && isString(rule[0]) && isString(rule[1])) {
			let key = rule[0]
			let val = rule[1]
			// 添加前缀和后缀
			key = addFix(key, prefix, suffix)

			// {rule:value}
			staticRules[key] = val.replace(/ /g, '').endsWith(';') ? val : val + ';'
			continue
		}

		if (isObject(rule)) {
			for (let [key, val] of Object.entries(rule)) {
				if (isString(key) && isString(val)) {

					// 添加前缀和后缀
					key = addFix(key, prefix, suffix)

					// {rule:value}
					staticRules[key] = val.replace(/ /g, '').endsWith(';') ? val : val + ';'
				}
			}
			continue
		}

		// throw new Error(`非法的规则:${rule}`)
	}

	return { dynamicRules, staticRules }
}


export function electCompRules(preset, staticRules, dynamicRules) {
	let dynamicCompRules = {},
		staticCompRules = {}
	let composition = []
	if (isObject(preset.composition)) {
		composition = Object.entries(preset.composition)
	} else
	if (isArray(preset.composition)) {
		composition = preset.composition
	} else {
		error('配置问题：组合规则类型错误，仅支持数组和对象的形式。')
		return { dynamicCompRules }
	}

	for (let rule of composition) {
		if (isArray(rule) && rule[0] && rule[1]) {
			if (isFunction(rule[1])) {
				dynamicCompRules[rule[0]] = rule
				continue
			}
			if (isString(rule[1])) {
				staticCompRules[rule[0]] = rule[1]
				continue
			}
		}

		if (isObject(rule)) {
			for (let [key, val] of Object.entries(rule)) {
				isString(key) && isString(val) && (staticCompRules[key] = val)
			}
			continue
		}

		throw new Error(`非法的规则:${rule}`)
	}
	// 拼接静态的组合规则的值
	combiCompRules(staticCompRules, staticRules, dynamicRules)

	return { dynamicCompRules }
}


// 匹配组合规则的值，提前组装到静态
function combiCompRules(staticCompRules, staticRules, dynamicRules) {
	for (let [key, val] of Object.entries(staticCompRules)) {

		if (staticRules[key]) {
			warn(`非法的规则:${key}已经存在，组合规则冲突，当前规则${key, val} 将会覆盖 ${key}${staticRules[key]}`)
			// continue
		}

		staticRules[key] = val.trim().replace(/ /g, "|").split('|').reduce((pre, cur) => {

			let cssValue = staticRules[cur] || getDynamicCssValue(cur, dynamicRules) || ""
			if (!cssValue && cur) {
				warn(`组合规则中的${cur}规则未被定义`)
			}

			return pre += cssValue
		}, '');

	}
}

export function addFix(val, prefix, suffix) {
	return `${prefix?prefix:''}${val}${suffix?suffix:''}`
}

export function removeFix(val, prefix, suffix) {
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
