export const PLUGIN_NAME = 'plugin-prefixed-all-in-class'
export const PLUGIN_PREFIX = 'ALL_IN_CLASS'
export const POLYFILL_ID = 'allinclass.css'
export const CSS_PLACE_HOLDER_KEY = '.ALLIN_CSS_PLACE_HOLDER_KEY{color:red}'
export const VITE_HMR_CONTENT = `export const msg = "from virtual module";
import {createHotContext as __vite__createHotContext1} from "/@vite/client";
import.meta.hot = __vite__createHotContext1("@id/__x00__virtual:my-module");
import {updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle} from "/@vite/client"
const __vite__id = "C:/Users/cmz/Documents/HBuilderProjects/com-css-loader/com-css-loader/template/cli-vue-3-test-allin/@id/__x00__virtual:my-module"
const __vite__css = ""
__vite__updateStyle(__vite__id, __vite__css)
import.meta.hot.accept()
export default __vite__css
import.meta.hot.prune(()=>__vite__removeStyle(__vite__id))
if (import.meta.hot) {
	import.meta.hot.on('my:greetings', (data) => {
		// console.log('my:greetings热更新：', data) // hello
		__vite__updateStyle(__vite__id, data)
	})
}
`