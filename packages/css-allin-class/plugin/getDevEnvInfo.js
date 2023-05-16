import { PLUGIN_PREFIX } from "../constant"

export function getDevEnvInfo() {
	let info = {
		isUniapp: false,
		uniappPlatfrom: false,
		projectRoot: process.env.INIT_CWD, // process.cwd() // process.env.PNPM_SCRIPT_SRC_DIR
		packFramework: '',
		vueVersion: 0, // 2,3
		env: '',
		outputDir: ''
	}
	// console.log('==== process.UNI_MANIFEST :', process);
	
	// 判断是否uniapp
	if (process.UNI_OUTPUT_DIR || process.UNI_MANIFEST || process.env.VUE_APP_PLATFORM || process.env.UNI_CLI_CONTEXT) {
		info.isUniapp = true // 'h5',
		info.uniappPlatfrom = process.env.VUE_APP_PLATFORM // 'h5',

		if (process.env.RUN_BY_HBUILDERX) {
			// 使用HBUILDERX运行的 

			// 这些都没有值
			// process.env.INIT_CWD, // process.cwd() // process.env.PNPM_SCRIPT_SRC_DIR
		}

		// process.env.UNI_CLI_CONTEXT // cli创建的 是uniapp项目根目录 ，cli命令所在位置
		// UNI_MANIFEST.transformPx: false, // uniapp判断是否需要专函px
		// UNI_USING_V3_SCOPED: 'true',

		// if (process.env.VUE_CLI_ENTRY_FILES) {
		// 	info.packFramework = "webpack";
		// }
		if (process.env.UNI_CLI_CONTEXT.endsWith('uniapp-cli-vite') || process.env.VITE_USER_NODE_ENV || process.cwd().endsWith("uniapp-cli-vite")) {
			info.packFramework = "vite"
			// 
			info.env = process.env.VITE_USER_NODE_ENV
			info.projectRoot = process.env.UNI_INPUT_DIR // UNI_INPUT_DIR === VITE_ROOT_DIR
		} else if (process.env.UNI_CLI_CONTEXT.endsWith('uniapp-cli') || process.cwd().endsWith("uniapp-cli")) {
			info.packFramework = "webpack"
			// console.log('==== UNI_MANIFEST.transformPx :', process.UNI_MANIFEST.transformPx);
			// info.projectRoot = process.env.VUE_CLI_ENTRY_FILES.replace('\\\\main.js')
			info.projectRoot = process.env.VUE_CLI_SERVICE_CONFIG_PATH.replace('\\vue.config.js','')
			info.vueVersion = process.UNI_MANIFEST?.vueVersion
			info.env = process.env.NODE_ENV // BABEL_ENV
		}

		info.outputDir = process.env.UNI_OUTPUT_DIR
		info.configPath = process.env.VUE_CLI_SERVICE_CONFIG_PATH // 'D:\\file\\HBuilderProjects\\test-css\\vue.config.js',
		// UNI_USING_NVUE_COMPILER : true
		// UNI_PAGES
		// UNI_CLI_CONTEXT: cli 运行uniapp项目的地方
		info.join = info.env === 'development' ? '\n' : ''
		process.env[PLUGIN_PREFIX+'JOIN'] = info.join 
		return info
	}
	// console.log('====  npm_lifecycle_event :', process.env.npm_lifecycle_event);
	// console.log('====  npm_lifecycle_script :', process.env.npm_lifecycle_script);
	// console.log('====  npm_package_scripts_dev :', process.env.npm_package_scripts_dev);
	// console.log('====  npm_package_scripts_dev :', process.env.npm_package_scripts_serve);
	// console.log('==== 	process.argv :', process.argv);
	// vue版本
	// console.log('====  npm_package_dependencies_vue :', process.env.npm_package_dependencies_vue);

	// env.VITE_ROOT_DIR // 'D:/file/HBuilderProjects/test-css'
	// npm_package_devDependencies_vite
	// npm_package_scripts_dev: 'vite',

	// 能判断是 weibpack 项目入口文件
	// VUE_CLI_ENTRY_FILES: '["D:\\\\file\\\\HBuilderProjects\\\\uniapp-css-loader\\\\template\\\\vue2-webpack\\\\src\\\\main.js"]',
	//  WEBPACK_DEV_SERVER: 'true',

	if (process.argv[1].endsWith("vue-cli-service.js")) {
		info.packFramework = "webpack";
	} else
	if (process.argv[1].endsWith("vite.js")) {
		info.packFramework = "vite";
	} 

	// if (!packFramework) {
	// 	throw '无法区分当前项目环境，请手动传入参数： 使用的vite：{framework: "vite"} ，使用的webpack：{framework: "webpack"}'
	// }
	// console.log('==== getDevEnvInfo :', info);
	return info
}
