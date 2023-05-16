import { defineConfig } from 'vitepress'
import loader from 'css-loader'
import allin from 'all-in-class'
import preset from 'all-in-class/preset'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	vite: {
		plugins: [
			allin({ unit: 'px', prefix: 'a-', presets: [preset()] })
		]
	},
	base: '/all-in-class/',
	title: "all-in-class",
	// titleTemplate: 'Custom Suffix',
	// description: "A VitePress Site",
	themeConfig: {
		logo: '/logo.png',
		// search: {
		// 	provider: 'local'
		// },
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			// { text: '首页', link: '/' },
			{ text: '指引', link: '/guide/start' },
			{ text: '配置', link: '/config/' },
			{ text: '预设样式', link: '/preset/' }
		],

		sidebar: {
			'/guide/': [
				{
					text: '指引',
					items: [
						{ text: '简介', link: '/guide/start' },
						{ text: '为什么是', link: '/guide/why' },
						// { text: '入门', link: '/guide/why' }
					]
				},
				{
					text: '安装',
					items: [
						{ text: 'uniapp', link: '/guide/install/uniapp' },
						{ text: 'vite', link: '/guide/install/vite' },
						{ text: 'webpack', link: '/guide/install/webpack' },
						{ text: 'vitepress', link: '/guide/install/vitepress' }
					]
				},
				{
					text: '预设样式',
					items: [
						{ text: 'line省略', link: '/guide/preset/line' },
						{ text: 'border边框', link: '/guide/preset/border' },
						{ text: 'color颜色', link: '/guide/preset/color' },
						{ text: 'shadow阴影', link: '/guide/preset/shadow' },
						{ text: '上下左右', link: '/guide/preset/top' },
						{ text: '宽高', link: '/guide/preset/widthHeight' },
						{ text: 'line-height行高', link: '/guide/preset/lineHeight' },
						{ text: 'poiter鼠标样式', link: '/guide/preset/poiter' },
						{ text: 'm、p边距', link: '/guide/preset/marginPadding' },
						{ text: 'font字体', link: '/guide/preset/font' },
						{ text: 'translate变换', link: '/guide/preset/translate' },
						{ text: 'flex', link: '/guide/preset/flex' },
						{ text: 'display', link: '/guide/preset/display' },
						{ text: 'zIndex', link: '/guide/preset/zIndex' },
					]
				}
			],
			'/config/': [
				{
					text: '指引',
					items: [
						{ text: 'presets预设', link: '/config/presets' },
						{ text: 'rules规则', link: '/config/rules' },
						{ text: 'css权重', link: '/config/i' },
						{ text: 'shortcuts缩写', link: '/config/shortcuts' },
						{ text: '前后缀', link: '/config/fix' },
						{ text: '预览生成css', link: '/config/outPutCss' },
						{ text: '文件转规则', link: '/config/file2rule' }
					]
				}
			],
			'/preset/': [
				{
					text: '指引',
					items: [
						{ text: '默认预设', link: '/preset/presets' },
						{ text: '为什么是', link: '/preset/why' },
						{ text: '入门', link: '/preset/why' }
					]
				}
			]
		},

		// socialLinks: [
		// 	{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }
		// ]
	}
})
