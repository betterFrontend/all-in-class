export const ailwindcss = {
	'ease-linear': 'transition-timing-function: linear;',
	'ease-in': 'transition-timing-function: cubic-bezier(0.4, 0, 1, 1);',
	'ease-out': 'transition-timing-function: cubic-bezier(0, 0, 0.2, 1);',
	'ease-in-out': 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);'
} 


export const style = {
	'transition-timing-function': ['linear', 'cubic-bezier(0.4, 0, 1, 1)', 'cubic-bezier(0, 0, 0.2, 1)', 'cubic-bezier(0.4, 0, 0.2, 1)']
}

export default{
	ailwindcss,
	style,
	styleName:'transition-timing-function'
}