import { resolve } from 'path'

const r = (p) => resolve(__dirname, p)

export const alias = {
	'all-in-class': r('./packages/css-allin-class/src/'),
	'@anlion/reg2str': r('./packages/genRegExp/src/'),
	'anlion-ide-plugin': r('./packages/ide-plugin/src/'),
	'@anlion/shared': r('./packages/shared/src/'),
}
