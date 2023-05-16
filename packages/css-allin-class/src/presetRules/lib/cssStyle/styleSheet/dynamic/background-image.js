export const ailwindcss = {
	'bg-none': 'background-image: none;',
	'bg-gradient-to-t': 'background-image: linear-gradient(to top, var(--tw-gradient-stops));',
	'bg-gradient-to-tr': 'background-image: linear-gradient(to top right, var(--tw-gradient-stops));',
	'bg-gradient-to-r': 'background-image: linear-gradient(to right, var(--tw-gradient-stops));',
	'bg-gradient-to-br': 'background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));',
	'bg-gradient-to-b': 'background-image: linear-gradient(to bottom, var(--tw-gradient-stops));',
	'bg-gradient-to-bl': 'background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));',
	'bg-gradient-to-l': 'background-image: linear-gradient(to left, var(--tw-gradient-stops));',
	'bg-gradient-to-tl': 'background-image: linear-gradient(to top left, var(--tw-gradient-stops));'
}


export const style = {
	'background-image': ['none', 'linear-gradient(to top, var(--tw-gradient-stops))',
		'linear-gradient(to top right, var(--tw-gradient-stops))',
		'linear-gradient(to right, var(--tw-gradient-stops))',
		'linear-gradient(to bottom right, var(--tw-gradient-stops))',
		'linear-gradient(to bottom, var(--tw-gradient-stops))',
		'linear-gradient(to bottom left, var(--tw-gradient-stops))',
		'linear-gradient(to left, var(--tw-gradient-stops))',
		'linear-gradient(to top left, var(--tw-gradient-stops))'
	]
}

export default{
	ailwindcss,
	style,
	styleName:'background-image'
}