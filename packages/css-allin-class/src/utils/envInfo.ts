import { PLUGIN_PREFIX } from "../constant/index"

let info = {
	isUniapp: false,
	uniappPlatfrom: '', // 'h5',
	projectRoot: '',
	packFramework: '',
	vueVersion: 0, // 2,3
	env: '',
	isCli: false,
	outputDir: '',
	configPath: '',
	join: '',
	userConfig: {}
}

export function getEnv() {
	if (!info.projectRoot) initEnv()

	return info
}

export function cacheUserConfig(config: object) {
	if (config && Object.keys(config).length) {
		info.userConfig = Object.assign({}, config)
	}
}

export function initEnv() {
	// 判断是否uniapp
	if (process.UNI_OUTPUT_DIR || process.UNI_MANIFEST || process.env.VUE_APP_PLATFORM || process.env.UNI_CLI_CONTEXT) {
		info.isUniapp = true
		info.uniappPlatfrom = process.env.VUE_APP_PLATFORM

		if (process.env.RUN_BY_HBUILDERX) {
			// 使用HBUILDERX运行的 

			// 这些都没有值
			// process.env.INIT_CWD, // process.cwd() // process.env.PNPM_SCRIPT_SRC_DIR
		} else {
			// cli项目

		}

		info.outputDir = process.env.UNI_OUTPUT_DIR
		info.configPath = process.env.VUE_CLI_SERVICE_CONFIG_PATH // 'D:\\file\\HBuilderProjects\\test-css\\vue.config.js',

		// 没有吸纳灌木根目录 说明是cli创建的项目
		if (!process.env.VUE_CLI_SERVICE_CONFIG_PATH) {
			info.isCli = true
			info.projectRoot = process.cwd()
		}

		if (process.argv[1].endsWith("vite.js") || process.env.VITE_USER_NODE_ENV || process.env.UNI_CLI_CONTEXT.endsWith('uniapp-cli-vite') || process.cwd().endsWith("uniapp-cli-vite")) {
			info.packFramework = "vite"
			info.env = process.env.VITE_USER_NODE_ENV
			info.projectRoot = process.env.VITE_ROOT_DIR || process.env.UNI_INPUT_DIR // UNI_INPUT_DIR === VITE_ROOT_DIR
			info.uniappPlatfrom = process.env.UNI_PLATFORM

		} else if (process.env.VUE_CLI_SERVICE || process.argv[1].endsWith("vue-cli-service.js") || process.env.UNI_CLI_CONTEXT.endsWith('uniapp-cli') || process.cwd().endsWith("uniapp-cli")) {
			info.packFramework = "webpack"
			info.projectRoot = process.env.VUE_CLI_SERVICE_CONFIG_PATH?.replace('\\vue.config.js', '')
			if (info.isCli) {
				info.projectRoot = process.cwd()
				if (!info.configPath) {
					info.configPath = info.projectRoot + '\\vue.config.js'
				}
			}
			info.vueVersion = process.UNI_MANIFEST?.vueVersion
			info.env = process.env.NODE_ENV // BABEL_ENV
		}
		info.join = info.env === 'development' ? '\n' : ''
		process.env[PLUGIN_PREFIX + 'JOIN'] = info.join
		// cli路径等于根路径时,为cli创建的项目
		// UNI_CLI_CONTEXT

		return
	}

	info.isCli = true
	info.projectRoot = process.cwd()
	if (process.argv[1].endsWith("vue-cli-service.js")) {
		info.packFramework = "webpack";
		info.configPath = info.projectRoot + '\\vue.config.js'
		info.env = process.env.NODE_ENV // BABEL_ENV
		info.vueVersion = 2
	} else if (process.argv[1].endsWith("vite.js")) {
		info.packFramework = "vite";
		info.configPath = info.projectRoot + '\\vite.config.js'
		info.env = process.env.VITE_USER_NODE_ENV
		info.vueVersion = 3
	} else if (process.argv[1].endsWith("vitepress.js")) {
		info.packFramework = "vitepress";
		info.configPath = info.projectRoot + '\\vite.config.js'
		info.env = process.env.VITE_USER_NODE_ENV
		info.vueVersion = 3
	}


	info.join = info.env === 'development' ? '\n' : ''
	process.env[PLUGIN_PREFIX + 'JOIN'] = info.join

}
