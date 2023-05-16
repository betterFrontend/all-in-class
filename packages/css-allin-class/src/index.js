import { getPlugin } from './utils/plugins.js'

export default function createPlugin(userConfig = {}) {
	return getPlugin(userConfig)
}

export function allin(userConfig = {}) {
	return getPlugin(userConfig)
}