export const ailwindcss = [
	{ 'radius-none': 'border-radius: 0px;' },
	[/^radius-(\d+)$/, ([, d]) => ({ 'order-radius': `${d}${unit};` })]
]

export const style = {
	'border-radius': ['0px']
}

export default {
	ailwindcss,
	style,
	styleName: 'border-radius'
}
