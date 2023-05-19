import { getEnv } from "./envInfo";

export function addFix(val: string, prefix: string, suffix: string) {
	return `${prefix ? prefix : ''}${val}${suffix ? suffix : ''}`
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

/** TODO 合并css减小体积
 * .w-line-1 {
	// overflow: hidden;
	// white-space: nowrap;
	// text-overflow: ellipsis;
	-webkit-line-clamp: 1;
}

.w-line-2 {
	-webkit-line-clamp: 2;
}

.w-line-3 {
	-webkit-line-clamp: 3;
}

.w-line-4 {
	-webkit-line-clamp: 4;
}

.w-line-5 {
	-webkit-line-clamp: 5;
}

.w-line-1,
.w-line-2,
.w-line-3,
.w-line-4,
.w-line-5 {
	overflow: hidden;
	word-break: break-all;
	text-overflow: ellipsis;
	display: -webkit-box; // 弹性伸缩盒
	-webkit-box-orient: vertical; // 设置伸缩盒子元素排列方式
} 
 */
// .cc{color:#2c3e50;} === .cc{color:#2c3e50} 去掉最后一个;可以缩小体积 只在h5
export interface OutputCss {
	[propname:string]: CssValue;
}
export interface CssValue {
	token: string,
	noFixToken?: string,
	type?: string,
	num: number,
	value: string
}

export interface GenOutputStrOptions {
	outputCss: OutputCss,
	join?: string
}

export function genOutputStr({ outputCss, join }: GenOutputStrOptions) {
	// TODO
	// 把每次vue文件变动，维护最终样式使用的数量，改为这儿最后输出时，根据各模块匹配生成

	// 得到最终使用的class
	const usedClass = []

	// 生成最终输出的所有css样式
	join = join !== undefined ? join : getEnv().join
	const outputStr = Object.values(outputCss)
		.filter(item => item.num > 0)
		.map(item => {
			let token = item.token
			// TODO 增加专门处理class的方法

			// 修改，拼接class的名称
			if (token.match(/hover:/)) {
				token = token.replace(/hover:/, 'hover_') + ':hover'
			}
			if (token.match(/last:/)) {
				token = token.replace(/last:/, 'last_') + ':last-child'
			}

			token = token.replace(/[%#\.>]/g, '_')

			// 修改加权重的token
			const isImportant: RegExpMatchArray | null = token.match(/(.*)-i(\d*)$/)
			if (isImportant) {
				let [rule, c, iNum]  = isImportant
				let num: string = Number(iNum) < 3 ? '3' : iNum

				let fix = `.${rule}`
				token = fix.repeat(Number(num)).slice(1)
			}

			if (getEnv().isUniapp && getEnv().uniappPlatfrom === 'h5') {
				// rpx->rem
				item.value = item.value.split(';').filter(Boolean)
					.map(val => val.trim().replace(/(\d*\.*\d+)rpx$/, (...match) => `${match[1] / 32}rem`)).join(';')
			};

			return `.${token}{${item.value}}`
		})
		.join(join);

	// 这种写法,慢一点点?!
	// let outputStr = ''
	// Object.values(outputCss).filter(item => {
	// 	if (item.num > 0) {
	// 		outputStr += `.${item.token}{${item.value}}`
	// 	}
	// })
	return outputStr
}
