export const ailwindcss = {
	'p-44': 'padding: 11rem;',
	'p-48': 'padding: 12rem;',
} 


export const style = {
	'padding': [/^p-\d*/],
	'padding-bottom': [/^pb-\d*/],
	'padding-top': [/^pt-\d*/],
	'padding-left': [/^pl-\d*/],
	'padding-right': [/^pr-\d*/]
}
let arr = ['top','left','right','bottom']

export default{
	ailwindcss,
	style,
	styleName:'padding'
}