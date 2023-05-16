// 对象或者方法 最后返回的是对象
export const preset = () => {
	let direction = { t: 'top', b: 'bottom', l: 'left', r: 'right' }
	let dic = { bg: 'background-color', c: 'color', color: 'color' }
	let globalValues = ['inherit', 'initial', 'revert', 'revert-layer', 'unset']

	let radiusFun = (match, { unit }) => {
		let direction = { t: 'top', b: 'bottom', l: 'left', r: 'right', tr: 'top-right', tl: 'top-left', bl: 'bottom-left', br: 'bottom-right' }
		let radius1 = `${match[3]}${match[7] || unit}`
		let radius2 = match[4] ? ' ' + match[4] + (match[7] || unit) : ''
		let radius3 = match[5] ? ' ' + match[5] + (match[7] || unit) : ''
		let radius4 = match[6] ? ' ' + match[6] + (match[7] || unit) : ''
		return `border${match[2] ? '-' + direction[match[2]] : ''}-radius:${radius1}${radius2}${radius3}${radius4}`
	}

	return {
		rules: [
			[/^line-(\d{1,2})$/, (match) => `-webkit-line-clamp: ${match[1]};overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;`],

			['color-none', 'color: transparent;'],
			['c-none', 'color: transparent;'],
			[/^(color|c)-#([0-9a-fA-F]{1,6})$/, (match) => `color:#${match[2].length === 3 ? match[2] : match[2].repeat(6 / match[2].length)};`],
			[/^(color|c)-v-([\w-_]{1,20})$/, (match) => `color:var(--${match[2]});`],
			[/^(color|c)-([^#][a-z]{1,20})$/, (match) => `color:${match[2] == 'cur' ? 'currentcolor' : match[2]};`],
			[/^gba-(\d{1,3})-(\d{1,3})-(\d{1,3})$/, (match) => `color:gba(${match[1]}%,${match[2]}%,${match[3]}%);`],
			[/^rgba-(\d{1,3})-(\d{1,3})-(\d{1,3})-((\d{1,4})|(?:0*\.(\d{1,4})))$/, (match) => `color:rgba(${match[1]},${match[2]},${match[3]},${match[4].includes('.') ? match[4] : '.' + match[4]});`],

			[/^bg-#([0-9a-fA-F]{1,6})$/, (match) => `background-color:#${match[1].length === 3 ? match[1] : match[1].repeat(6 / match[1].length)};`],
			[/^bg-v-([\w-_]{1,20})$/, (match) => `background-color:var(--${match[1]});`],
			[/^bg-([^#][a-z]{1,40})$/, (match) => `background-color:${match[1]};`],
			[/^bg-rgba-(\d{1,3})-(\d{1,3})-(\d{1,3})-((\d{1,4})|(?:0*\.(\d{1,4})))$/, (match) => `background-color:rgba(${match[1]},${match[2]},${match[3]},${match[4].includes('.') ? match[4] : '.' + match[4]});`],
			[/^bg-gba-(\d{1,3})-(\d{1,3})-(\d{1,3})$/, (match) => `background-color:gba(${match[1]},${match[2]},${match[3]});`],
			// [/^bg-linear-(\d+)-(\d+)-(\d+)$/, (match) => `color:rgba(${match[1]},${match[2]},${match[3]});`],
			//  background: linear-gradient(to right,
			//       red, orange, yellow, green, blue, indigo, violet);
			// }
			// .radial-gradient {
			//   background: radial-gradient(red, yellow, rgb(30, 144, 255));
			// }

			[/^fs-(\d*\.?\d+)(rem|vh|vw|px|rpx|em)?$/, (match, { unit }) => `font-size: ${match[1]}${match[2] ? match[2] : unit};`],
			[/^fw-(\d{1,4})$/, (match, { unit }) => `font-weight: ${match[1]};`],
			[/^lh-(\d*\.?\d+)(rem|vh|vw|px|rpx|em)?$/, (match, { unit }) => `line-height: ${match[1]}${match[2] ? match[2] : ''};`],

			[/^(?:f|flex)-(\d+)$/, (match) => `flex: ${match[1]};`],
			{
				'text-left': 'text-align: left;',
				'text-center': 'text-align: center;',
				'text-right': 'text-align: right;',
				'text-justify': 'text-align: justify;',

				'underline': 'text-decoration: underline;',
				'line-through': 'text-decoration: line-through;',
				'no-decoration': 'text-decoration: none;',

				'uppercase': 'text-transform: uppercase;',
				'lowercase': 'text-transform: lowercase;',
				'capitalize': 'text-transform: capitalize;',
				'normal-case': 'text-transform: none;',

				'align-baseline': 'vertical-align: baseline;',
				'align-top': 'vertical-align: top;',
				'align-middle': 'vertical-align: middle;',
				'align-bottom': 'vertical-align: bottom;',
				'align-text-top': 'vertical-align: text-top;',
				'align-text-bottom': 'vertical-align: text-bottom;',

				// break-normal	overflow-wrap: normal;word-break: normal;
				// break-words	overflow-wrap: break-word;
				// break-all	word-break: break-all;
			},
			[/^m-(-?\d*\.?\d+|auto)-(\d*\.?\d+|auto)$/, (match, { unit }) => ({ 'margin': `${match[1]}${match[1] === 'auto' ? '' : unit} ${match[2]}${match[2] === 'auto' ? '' : unit};` })],
			['m-auto', 'margin:auto;'],
			[/^m-(-?\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'margin': `${match[1]}${match[2] ? match[2] : unit};` })],
			[/^mt-(-?\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'margin-top': `${match[1]}${match[2] ? match[2] : unit};` })],
			[/^mb-(-?\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'margin-bottom': `${match[1]}${match[2] ? match[2] : unit};` })],
			[/^ml-(-?\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'margin-left': `${match[1]}${match[2] ? match[2] : unit};` })],
			[/^mr-(-?\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'margin-right': `${match[1]}${match[2] ? match[2] : unit};` })],
			[/^mlr-(-?\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => `margin-left:${match[1]}${match[2] ? match[2] : unit};margin-right:${match[1]}${match[2] ? match[2] : unit};`],
			[/^mtb-(-?\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => `margin-top:${match[1]}${match[2] ? match[2] : unit};margin-bottom:${match[1]}${match[2] ? match[2] : unit};`],
			[/^m-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)$/, (match, { unit }) => ({ 'margin': `${match[1]}${unit} ${match[2]}${unit} ${match[3]}${unit} ${match[4]}${unit};` })],

			['p-auto', 'padding:auto;'],
			[/^p-(\d*\.?\d+|auto)-(\d+|auto)$/, (match, { unit }) => ({ 'padding': `${match[1]}${match[1] === 'auto' ? '' : unit} ${match[2]}${match[2] === 'auto' ? '' : unit};` })],
			[/^p-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'padding': `${match[1]}${match[2] ? match[2] : unit}` })],
			[/^pt-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'padding-top': `${match[1]}${match[2] ? match[2] : unit}` })],
			[/^pb-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'padding-bottom': `${match[1]}${match[2] ? match[2] : unit}` })],
			[/^pl-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'padding-left': `${match[1]}${match[2] ? match[2] : unit}` })],
			[/^pr-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'padding-right': `${match[1]}${match[2] ? match[2] : unit}` })],
			[/^ptb-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => `padding-top:${match[1]}${match[2] ? match[2] : unit};padding-bottom:${match[1]}${match[2] ? match[2] : unit};`],
			[/^plr-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => `padding-left:${match[1]}${match[2] ? match[2] : unit};padding-right:${match[1]}${match[2] ? match[2] : unit};`],
			[/^p-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)$/, (match, { unit }) => ({ 'padding': `${match[1]}${unit} ${match[2]}${unit} ${match[3]}${unit} ${match[4]}${unit};` })],

			[/^(icon)-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => `width:${match[2]}${match[3] ? match[3] : unit};height:${match[2]}${match[3] ? match[3] : unit};`],
			[/^(width|w)-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'width': `${match[2]}${match[3] ? match[3] : unit};` })],
			[/^(height|h)-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'height': `${match[2]}${match[3] ? match[3] : unit};` })],
			[/^min-w-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'min-width': `${match[1]}${match[2] ? match[2] : unit};` })],
			[/^min-h-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'min-height': `${match[1]}${match[2] ? match[2] : unit};` })],
			[/^max-w-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'max-width': `${match[1]}${match[2] ? match[2] : unit};` })],
			[/^max-h-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/, (match, { unit }) => ({ 'max-height': `${match[1]}${match[2] ? match[2] : unit};` })],
			// {
			// 	'min-w-min': 'min-width: min-content;',
			// 	'min-w-max': 'min-width: max-content;',
			// 	'min-w-none': 'min-width: none;',
			// 	'max-w-min': 'max-width: min-content;',
			// 	'max-w-max': 'max-width: max-content;',
			// 	'max-w-none': 'max-width: none;',

			// 	'min-h-min': 'min-height: min-content;',
			// 	'min-h-max': 'min-height: max-content;',
			// 	'min-h-none': 'min-height: none;',
			// 	'max-h-min': 'max-height: min-content;',
			// 	'max-h-max': 'max-height: max-content;',
			// 	'max-h-none': 'max-height: none;',
			// },

			[/^order-(-?\d*\.?\d+)$/, (match, { unit }) => ({ 'order': `${match[1]};` })],

			[/^border(?:-(\d+))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-#([0-9a-fA-F]{1,6}))?$/, (match, { unit }) => `border:${match[1] || '1'}${unit} ${match[2] || 'solid'} #${match[3] && match[3].length === 3 ? match[3] : match[3] && match[3].repeat(6 / match[3].length) || 'c1c1c1'};`],
			[/^border(?:-(\d+))?(?:-#([0-9a-fA-F]{1,6}))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?$/, (match, { unit }) => `border:${match[1] || '1'}${unit} ${match[3] || 'solid'} #${match[2] && match[2].length === 3 ? match[2] : match[2] && match[2].repeat(6 / match[2].length) || 'c1c1c1'};`],
			[/^border(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-#([0-9a-fA-F]{1,6}))?(?:-(\d{1,6}))?$/, (match, { unit }) => `border:${match[3] || '1'}${unit} ${match[1] || 'solid'} #${match[2] && match[2].length === 3 ? match[2] : match[2] && match[2].repeat(6 / match[2].length) || 'c1c1c1'};`],
			[/^border(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-(\d{1,6}))?(?:-#([0-9a-fA-F]{1,6}))?$/, (match, { unit }) => `border:${match[2] || '1'}${unit} ${match[1] || 'solid'} #${match[3] && match[3].length === 3 ? match[3] : match[3] && match[3].repeat(6 / match[3].length) || 'c1c1c1'};`],
			[/^border(?:-#([0-9a-fA-F]{1,6}))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-(\d{1,6}))?$/, (match, { unit }) => `border:${match[3] || '1'}${unit} ${match[2] || 'solid'} #${match[1] && match[1].length === 3 ? match[1] : match[1] && match[1].repeat(6 / match[1].length) || 'c1c1c1'};`],
			[/^border(?:-#([0-9a-fA-F]{1,6}))?(?:-(\d{1,6}))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?$/, (match, { unit }) => `border:${match[2] || '1'}${unit} ${match[3] || 'solid'} #${match[1] && match[1].length === 3 ? match[1] : match[1] && match[1].repeat(6 / match[1].length) || 'c1c1c1'};`],

			[/^(br|radius|rounded)(?:-(tr|tl|br|bl))?-?(\d+)-?(\d+)?-?(\d+)?-?(\d+)?(rem|em|px|rpx|%)?$/, radiusFun],
			[/^bw-?(t|l|r|b)?-(\d+)(px|rpx)?$/, (match, { unit }) => `border${match[1] ? '-' + direction[match[1]] : ''}-width:${match[2]}${unit};`],
			[/^bc-#([\d\w]{1,6})$/, (match) => `border-color:#${match[1].repeat(6 / match[1].length)};`],
			['bc-none', 'border-color: transparent;'],
			[/^bs-(solid|dashed|dotted|double|groove|ridge|inset|outset|none)$/, (match) => `border-style:${match[1]};`],

			[/^(top|t)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/, (match, { unit }) => ({ 'top': `${match[2]}${match[3] ? match[3] : unit};` })],
			[/^(left|l)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/, (match, { unit }) => ({ 'left': `${match[2]}${match[3] ? match[3] : unit};` })],
			[/^(right|r)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/, (match, { unit }) => ({ 'right': `${match[2]}${match[3] ? match[3] : unit};` })],
			[/^(bottom|b)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/, (match, { unit }) => ({ 'bottom': `${match[2]}${match[3] ? match[3] : unit};` })],
			[/^inset-(-?0?\.?\d*)(rem|vh|vw|%)?$/, (match, { unit }) => `top: ${match[1]}${match[2] || unit};right: ${match[1]}${match[2] || unit};bottom: ${match[1]}${match[2] || unit};left: ${match[1]}${match[2] || unit};`],

			[/^z-(-?\d+|auto)$/, (match, { unit }) => ({ 'z-index': `${match[1]};` })],

			[/^shadow-?(\d+)?-?(\d+)?-?(\d+)?-?(\d+)?-?(0?\.\d+)?$/, (match, { unit }) => ({ 'box-shadow': `${match[1] || '0'}px ${match[2] || '4'}px ${match[3] || '12'}px ${match[4] || '0'}px rgba(0, 0, 0, ${match[5] || '0.1'});` })],
			[/^opacity-(0?\.?\d+)$/, (match, { unit }) => ({ 'opacity': `${match[1]}` })],
			[/^translateX-(0?\.?\d+)(rem|vh|vw|%)?$/, (match, { unit }) => `transform:translateX(${match[1]}${match[2] || unit})`],
			[/^translateY-(0?\.?\d+)(rem|vh|vw|%)?$/, (match, { unit }) => `transform:translateY(${match[1]}${match[2] || unit})`],

			{
				flex: 'display: flex;',
				grid: 'display: grid;',
				none: 'display: none;',
				block: 'display: block;',
				'inline-block': 'display: inline-block;',

				static: 'position: static;',
				fixed: 'position: fixed;',
				absolute: 'position: absolute;',
				relative: 'position: relative;',
				sticky: 'position: sticky;',

				visible: 'visibility: visible;',
				invisible: 'visibility: hidden;',

				// overflow-auto	overflow: auto;
				// overflow-hidden	overflow: hidden;
				// overflow-visible	overflow: visible;
				// overflow-scroll	overflow: scroll;
				// overflow-x-auto	overflow-x: auto;
				// overflow-y-auto	overflow-y: auto;
				// overflow-x-hidden	overflow-x: hidden;
				// overflow-y-hidden	overflow-y: hidden;
				// overflow-x-visible	overflow-x: visible;
				// overflow-y-visible	overflow-y: visible;
				// overflow-x-scroll	overflow-x: scroll;
				// overflow-y-scroll	overflow-y: scroll;

				isolate: 'isolation: isolate;',
				'isolation-auto': 'isolation: auto;',

				poiter: 'cursor: pointer;',
				'box-border': '	box-sizing: border-box;',
				'box-content': 'box-sizing: content-box;',

				wrap: 'flex-wrap:wrap;',
				row: 'flex-direction: row',
				column: 'flex-direction: column',

				'ai-c': 'align-items: center;',
				'ai-s': 'align-items: flex-start;',
				'ai-e': 'align-items: flex-end;',

				'jc-s': ' justify-content: flex-start;',
				'jc-c': 'justify-content: center;',
				'jc-e': 'justify-content: flex-end;',
				'jc-sb': 'justify-content: space-between;',
				'jc-sa': 'justify-content: space-around;',
				'jc-se': 'justify-content: sspace-evenly;',

				'as-s': 'align-self: flex-start;',
				'as-e': 'align-self: flex-end;',
				'as-c': 'align-self: center;',
				'as-b': 'align-self: baseline;',
				'as-st': 'align-self: stretch;',
				'text-l': 'text-align: left;',
				'ta-l': 'text-align: left;',
				'ta-c': 'text-align: center;',
				'ta-r': 'text-align: right;',
				'ta-j': 'text-align: justify;text-align-last: justify;',
				'text-c': 'text-align: center;',
				'text-r': 'text-align: right;',
				'text-j': 'text-align: justify;text-align-last: justify;',

				// 'line': ' border-bottom: 2px solid #CDCDCD; width: 100%;height: 2px;',
				// 'line-dark': ' border-bottom: 2px solid #797B89; width: 100%;height: 2px;',
				'td-lt': 'text-decoration: line-through;',
				'un-line': 'text-decoration: underline;',
				'fw-b': 'font-weight: bold;',
				'scroll-y': ' overflow-y: scroll;',
				'scroll-x': ' overflow-x: scroll;',
			}
		],
		// 组合
		shortcuts: [
			// 静态规则
			// {
			// 	'card-glass': 'bg-gradient-glass c-white w-142 h-168 radius-8 col-center border-f-3',
			// 	'btn-plain': 'border-main c-main radius-2 p-14 plr-20  row-center',
			// 	'btn-main': 'bg-main c-fff radius-4 p-14 row-center',
			// }
			// 动态规则
			[/^(radius|rounded)-(t|l|r|b)-(\d+)(rem|em|px|rpx|%)?$/, (match) => {
				let direction = { t: ['tl', 'tr'], b: ['bl', 'br'], l: ['tl', 'bl'], r: ['tr', 'br'] }
				return `radius-${direction[match[2]][0]}-${match[3]}${match[4] || ''} radius-${direction[match[2]][1]}-${match[3]}${match[4] || ''}`
			}],
		],
	}
}

export default preset
