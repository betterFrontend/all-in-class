export function presetRules(config={}) {
	return {
		rules: [],
		composition: [
			// 后缀为i时 给class添加权重
			[/(.*)-i(\d*)$/, ([r, c, d], getValue) => {
				const val = getValue(c)
				// console.log('==== val :', val);
				// 返回方法，为了区分内置的还是用户的，需要重构
				return ()=> val
			}],
		]
	}
}
