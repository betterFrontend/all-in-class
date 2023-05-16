import vitePlugin from './vite.js'
import viteWxcssOutput from './viteWxcssOutput.js'

export default function vite(userConfig) {
	let pluginShare = {}
	let plugins = []
	
	plugins.push(vitePlugin(userConfig, pluginShare))
	if(process.env.UNI_PLATFORM === 'mp-weixin'){
		plugins.push(viteWxcssOutput(userConfig, pluginShare))
	}
	
	return plugins
}
