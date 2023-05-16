import { CSS_PLACE_HOLDER_KEY } from '../constant';
import { genOutputStr } from '../utils/style';
const PLUGIN_NAME = 'allincssvitewxcss';

export default function vitePlugin(userConfig, pluginShare) {

	return {
		enforce: 'post',
		name: PLUGIN_NAME,
		async generateBundle(options, bundle) {
			const files = Object.keys(bundle)
				.filter(i => i.endsWith('.css') || i.endsWith('.wxss'))
			for (const file of files) {
				const code = bundle[file].source
				if (code.includes(CSS_PLACE_HOLDER_KEY)) {
					const outCssStr = genOutputStr({ outputCss: pluginShare.outputCssCache })
					bundle[file].source = code.replace(CSS_PLACE_HOLDER_KEY, outCssStr)
					console.log('wxss生成了');
					break
				} 
			}
		}
	};
}
