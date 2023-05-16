import { describe, assert, expect, test, it } from 'vitest'
import preset from '../src/presetRules/preset';
import { genCssValue, genStyle } from '../src/styles';
import { createStyleSheet } from '../src/styles/createStyleSheet';
let rules = preset().rules
let unit = 'rpx'

describe('预设规则', async () => {
	let styleSheet = await createStyleSheet({
		userConfig: {
			presets: [preset]
		}
	})
	let css = genCssValue('border-4-solid-#c1c1', styleSheet)
	console.log('==== css :', css);

	it('border', async ({ expect }) => {
		expect(genCssValue('border-4-solid-#c1c', styleSheet).value).toBe('border:4rpx solid #c1c;')
		expect(genCssValue('border-4-#c1c1c1-solid', styleSheet).value).toBe('border:4rpx solid #c1c1c1;')
		expect(genCssValue('border-4-solid', styleSheet).value).toBe('border:4rpx solid #c1c1c1;')
		expect(genCssValue('border-4-#c1c1c1', styleSheet).value).toBe('border:4rpx solid #c1c1c1;')
		expect(genCssValue('border-4', styleSheet).value).toBe('border:4rpx solid #c1c1c1;')
		expect(genCssValue('border', styleSheet).value).toBe('border:1rpx solid #c1c1c1;')
		expect(genCssValue('border-solid', styleSheet).value).toBe('border:1rpx solid #c1c1c1;')
		expect(genCssValue('border-solid-4', styleSheet).value).toBe('border:4rpx solid #c1c1c1;')
		expect(genCssValue('border-solid-4-#f2', styleSheet).value).toBe('border:4rpx solid #f2f2f2;')
		expect(genCssValue('border-solid-#f2-4', styleSheet).value).toBe('border:4rpx solid #f2f2f2;')
		expect(genCssValue('border-solid-#c1c1c1', styleSheet).value).toBe('border:1rpx solid #c1c1c1;')
		expect(genCssValue('border-solid-#f2', styleSheet).value).toBe('border:1rpx solid #f2f2f2;')
		expect(genCssValue('border-#c1c1c1', styleSheet).value).toBe('border:1rpx solid #c1c1c1;')
		expect(genCssValue('border-#f2-solid-4', styleSheet).value).toBe('border:4rpx solid #f2f2f2;')
		expect(genCssValue('border-#f2-4-solid', styleSheet).value).toBe('border:4rpx solid #f2f2f2;')
		expect(genCssValue('border-#f2-4', styleSheet).value).toBe('border:4rpx solid #f2f2f2;')
		expect(genCssValue('border-#f2-solid', styleSheet).value).toBe('border:1rpx solid #f2f2f2;')
	})
	it('border-color', async ({ expect }) => {
		expect(genCssValue('bc-#4', styleSheet).value).toBe('border-color:#444444;')
		expect(genCssValue('bc-#45', styleSheet).value).toBe('border-color:#454545;')
		expect(genCssValue('bc-#456', styleSheet).value).toBe('border-color:#456456;')
	})
	it('border-width', async ({ expect }) => {
		expect(genCssValue('bw-r-4', styleSheet).value).toBe('border-right-width:4rpx;')
		expect(genCssValue('bw-4', styleSheet).value).toBe('border-width:4rpx;')
	})
	it('border-radius', async ({ expect }) => {
		// radius-10%-40px、
		// expect(genCssValue('br-t-1', styleSheet).value).toBe('border-top-left-radius:1rpx;border-top-right-radius:1rpx;')
		expect(genCssValue('radius-t-1', styleSheet).value).toBe('border-top-left-radius:1rpx;border-top-right-radius:1rpx;')
		expect(genCssValue('radius-b-2', styleSheet).value).toBe('border-bottom-left-radius:2rpx;border-bottom-right-radius:2rpx;')
		expect(genCssValue('radius-l-3', styleSheet).value).toBe('border-top-left-radius:3rpx;border-bottom-left-radius:3rpx;')
		expect(genCssValue('radius-r-4', styleSheet).value).toBe('border-top-right-radius:4rpx;border-bottom-right-radius:4rpx;')
		expect(genCssValue('radius-r-50%', styleSheet).value).toBe('border-top-right-radius:50%;border-bottom-right-radius:50%;')


		expect(genCssValue('radius-10', styleSheet).value).toBe('border-radius:10rpx;')
		expect(genCssValue('radius-10-20', styleSheet).value).toBe('border-radius:10rpx 20rpx;')
		expect(genCssValue('radius-10-20-30', styleSheet).value).toBe('border-radius:10rpx 20rpx 30rpx;')
		expect(genCssValue('radius-10-20-30-40', styleSheet).value).toBe('border-radius:10rpx 20rpx 30rpx 40rpx;')
		expect(genCssValue('radius-10-20-30-40-50', styleSheet).value).toBe(undefined)
		expect(genCssValue('radius-10-20-30-40%', styleSheet).value).toBe('border-radius:10% 20% 30% 40%;')

		expect(genCssValue('radius-tr-40', styleSheet).value).toBe('border-top-right-radius:40rpx;')
		expect(genCssValue('radius-tl-40', styleSheet).value).toBe('border-top-left-radius:40rpx;')
		expect(genCssValue('radius-br-40', styleSheet).value).toBe('border-bottom-right-radius:40rpx;')
		expect(genCssValue('radius-bl-40', styleSheet).value).toBe('border-bottom-left-radius:40rpx;')
	})

	it('css颜色变量', async ({ expect }) => {
		expect(genCssValue('bg-v-c-bg-page', styleSheet).value).toBe('background-color:var(--c-bg-page);')
		expect(genCssValue('c-v-c-bg-page', styleSheet).value).toBe('color:var(--c-bg-page);')
		expect(genCssValue('c-v-c1-bg2-3', styleSheet).value).toBe('color:var(--c1-bg2-3);')
	})


	it('translate', async ({ expect }) => {
		expect(genCssValue('translateX-.04', styleSheet).value).toBe('transform:translateX(.04rpx);')
		expect(genCssValue('translateY-.04', styleSheet).value).toBe('transform:translateY(.04rpx);')
		expect(genCssValue('translateY-40%', styleSheet).value).toBe('transform:translateY(40%);')
	})
	it('shadow阴影', async ({ expect }) => {
		expect(genCssValue('shadow-.4', styleSheet).value).toBe('box-shadow:0px 4px 12px 0px rgba(0, 0, 0, .4);')
		expect(genCssValue('shadow-0.4', styleSheet).value).toBe('box-shadow:0px 4px 12px 0px rgba(0, 0, 0, .4);')
		expect(genCssValue('shadow-0.04', styleSheet).value).toBe('box-shadow:0px 4px 12px 0px rgba(0, 0, 0, .04);')
		expect(genCssValue('shadow-1-.04', styleSheet).value).toBe('box-shadow:1px 4px 12px 0px rgba(0, 0, 0, .04);')
		expect(genCssValue('shadow-1-2-.04', styleSheet).value).toBe('box-shadow:1px 2px 12px 0px rgba(0, 0, 0, .04);')
		expect(genCssValue('shadow-1-2-3-.04', styleSheet).value).toBe('box-shadow:1px 2px 3px 0px rgba(0, 0, 0, .04);')
		expect(genCssValue('shadow-1-2-3-4-.04', styleSheet).value).toBe('box-shadow:1px 2px 3px 4px rgba(0, 0, 0, .04);')
	})

	it('行高', async ({ expect }) => {
		expect(genCssValue('lh-10', styleSheet).value).toBe('line-height: 10;')
		expect(genCssValue('lh-10.09', styleSheet).value).toBe('line-height: 10.09;')
		expect(genCssValue('lh-10.09', styleSheet).value).toBe('line-height: 10.09;')
		expect(genCssValue('lh-.09', styleSheet).value).toBe('line-height: .09;')
		expect(genCssValue('lh-10px', styleSheet).value).toBe('line-height: 10px;')
		expect(genCssValue('lh-10rpx', styleSheet).value).toBe('line-height: 10rpx;')
	})

	it('最小最大高度', async ({ expect }) => {
		expect(genCssValue('min-w-0', styleSheet).value).toBe('min-width:0rpx;')
		expect(genCssValue('min-w-10.9', styleSheet).value).toBe('min-width:10.9rpx;')
		expect(genCssValue('min-w-.9', styleSheet).value).toBe('min-width:.9rpx;')
		expect(genCssValue('min-w-50vw', styleSheet).value).toBe('min-width:50vw;')
		expect(genCssValue('min-w-50%', styleSheet).value).toBe('min-width:50%;')

		expect(genCssValue('min-h-0', styleSheet).value).toBe('min-height:0rpx;')
		expect(genCssValue('min-h-10.9', styleSheet).value).toBe('min-height:10.9rpx;')
		expect(genCssValue('min-h-.9', styleSheet).value).toBe('min-height:.9rpx;')
		expect(genCssValue('min-h-50vw', styleSheet).value).toBe('min-height:50vw;')
		expect(genCssValue('min-h-50%', styleSheet).value).toBe('min-height:50%;')

		expect(genCssValue('max-w-0', styleSheet).value).toBe('max-width:0rpx;')
		expect(genCssValue('max-w-10.9', styleSheet).value).toBe('max-width:10.9rpx;')
		expect(genCssValue('max-w-.9', styleSheet).value).toBe('max-width:.9rpx;')
		expect(genCssValue('max-w-50vw', styleSheet).value).toBe('max-width:50vw;')
		expect(genCssValue('max-w-50%', styleSheet).value).toBe('max-width:50%;')

		expect(genCssValue('max-h-0', styleSheet).value).toBe('max-height:0rpx;')
		expect(genCssValue('max-h-10.9', styleSheet).value).toBe('max-height:10.9rpx;')
		expect(genCssValue('max-h-.9', styleSheet).value).toBe('max-height:.9rpx;')
		expect(genCssValue('max-h-50vw', styleSheet).value).toBe('max-height:50vw;')
		expect(genCssValue('max-h-50%', styleSheet).value).toBe('max-height:50%;')
	})
	it('order', async ({ expect }) => {
		expect(genCssValue('order-1.5', styleSheet).value).toBe('order:1.5;')
		expect(genCssValue('order-.5', styleSheet).value).toBe('order:.5;')
		expect(genCssValue('order-5', styleSheet).value).toBe('order:5;')
	})
	it('z-index', async ({ expect }) => {
		expect(genCssValue('z-10', styleSheet).value).toBe('z-index:10;')
		expect(genCssValue('z-auto', styleSheet).value).toBe('z-index:auto;')
	})
	it('上下左右', async ({ expect }) => {
		expect(genCssValue('t-10', styleSheet).value).toBe('top:10rpx;')
		expect(genCssValue('t-10%', styleSheet).value).toBe('top:10%;')
		expect(genCssValue('t--10%', styleSheet).value).toBe('top:-10%;')
		expect(genCssValue('t--10vh', styleSheet).value).toBe('top:-10vh;')
		expect(genCssValue('t-10vw', styleSheet).value).toBe('top:10vw;')

		expect(genCssValue('t-.10vw', styleSheet).value).toBe('top:.10vw;')
		expect(genCssValue('t-10.10vw', styleSheet).value).toBe('top:10.10vw;')
		expect(genCssValue('t-10.10', styleSheet).value).toBe('top:10.10rpx;')

		expect(genCssValue('inset--10%', styleSheet).value).toBe('top: -10%;right: -10%;bottom: -10%;left: -10%;')
		expect(genCssValue('inset--10', styleSheet).value).toBe('top: -10rpx;right: -10rpx;bottom: -10rpx;left: -10rpx;')
		expect(genCssValue('inset-0', styleSheet).value).toBe('top: 0rpx;right: 0rpx;bottom: 0rpx;left: 0rpx;')
		expect(genCssValue('inset-0.5', styleSheet).value).toBe('top: 0.5rpx;right: 0.5rpx;bottom: 0.5rpx;left: 0.5rpx;')
		expect(genCssValue('inset-.5', styleSheet).value).toBe('top: .5rpx;right: .5rpx;bottom: .5rpx;left: .5rpx;')

		expect(genCssValue('b-10.10', styleSheet).value).toBe('bottom:10.10rpx;')
		expect(genCssValue('r-10.10', styleSheet).value).toBe('right:10.10rpx;')
		expect(genCssValue('l-10.10', styleSheet).value).toBe('left:10.10rpx;')

	})
	it('display', async ({ expect }) => {
		expect(genCssValue('flex', styleSheet).value).toBe('display: flex;')
		expect(genCssValue('grid', styleSheet).value).toBe('display: grid;')
		expect(genCssValue('none', styleSheet).value).toBe('display: none;')
		expect(genCssValue('block', styleSheet).value).toBe('display: block;')
	})
	it('flex', async ({ expect }) => {
		expect(genCssValue('flex-1', styleSheet).value).toBe('flex: 1;')
		expect(genCssValue('f-1', styleSheet).value).toBe('flex: 1;')
	})
	it('字体', async ({ expect }) => {
		expect(genCssValue('fs-25', styleSheet).value).toBe('font-size: 25rpx;')
		expect(genCssValue('fs-w25', styleSheet).value).toBe(undefined)
		expect(genCssValue('fs-', styleSheet).value).toBe(undefined)
	})

	it('颜色', async ({ expect }) => {
		expect(genCssValue('c-#123', styleSheet).value).toBe('color:#123;')
		expect(genCssValue('c-#1', styleSheet).value).toBe('color:#111111;')
		expect(genCssValue('c-#12', styleSheet).value).toBe('color:#121212;')
		expect(genCssValue('c-#123456', styleSheet).value).toBe('color:#123456;')
		expect(genCssValue('c-#1111111', styleSheet).value).toBe(undefined)
		expect(genCssValue('c-#', styleSheet).value).toBe(undefined)
		expect(genCssValue('c-#d23', styleSheet).value).toBe('color:#d23;')
		expect(genCssValue('c-#d2', styleSheet).value).toBe('color:#d2d2d2;')
		expect(genCssValue('c-#d', styleSheet).value).toBe('color:#dddddd;')
		expect(genCssValue('c-#0', styleSheet).value).toBe('color:#000000;')

		expect(genCssValue('c-red', styleSheet).value).toBe('color:red;')
		expect(genCssValue('c-red1', styleSheet).value).toBe(undefined)
		expect(genCssValue('c-cur', styleSheet).value).toBe('color:currentcolor;')
		expect(genCssValue('c-initial', styleSheet).value).toBe('color:initial;')

		expect(genCssValue('bg-#1', styleSheet).value).toBe('background-color:#111111;')
		expect(genCssValue('bg-#d2', styleSheet).value).toBe('background-color:#d2d2d2;')
		expect(genCssValue('bg-#d23', styleSheet).value).toBe('background-color:#d23;')
		expect(genCssValue('bg-#d', styleSheet).value).toBe('background-color:#dddddd;')
		expect(genCssValue('bg-red', styleSheet).value).toBe('background-color:red;')
		expect(genCssValue('bg-red1', styleSheet).value).toBe(undefined)

		expect(genCssValue('rgba-1-2-3-4', styleSheet).value).toBe('color:rgba(1,2,3,.4);')
		expect(genCssValue('rgba-1-2-3-0.6', styleSheet).value).toBe('color:rgba(1,2,3,0.6);')
		expect(genCssValue('rgba-1-2-3-.6', styleSheet).value).toBe('color:rgba(1,2,3,.6);')

		expect(genCssValue('gba-10-222-256', styleSheet).value).toBe('color:gba(10%,222%,256%);')

	})
	it('超出省略', async ({ expect }) => {
		expect(genCssValue('line-1', styleSheet).value).toBe('-webkit-line-clamp: 1;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;')
		expect(genCssValue('line-5', styleSheet).value).toBe('-webkit-line-clamp: 5;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;')
	})
	it('边距', async ({ expect }) => {
		expect(genCssValue('m-10', styleSheet).value).toBe('margin:10rpx;')
		expect(genCssValue('m-auto', styleSheet).value).toBe('margin:auto;')
		expect(genCssValue('m-4-40', styleSheet).value).toBe('margin:4rpx 40rpx;')
		expect(genCssValue('m-10-auto', styleSheet).value).toBe('margin:10rpx auto;')
		expect(genCssValue('m-auto-10', styleSheet).value).toBe('margin:auto 10rpx;')
		expect(genCssValue('m-4-40-0-9', styleSheet).value).toBe('margin:4rpx 40rpx 0rpx 9rpx;')
		expect(genCssValue('mt-20', styleSheet).value).toBe('margin-top:20rpx;')
		expect(genCssValue('mb-20', styleSheet).value).toBe('margin-bottom:20rpx;')
		expect(genCssValue('ml-20', styleSheet).value).toBe('margin-left:20rpx;')
		expect(genCssValue('mr-20', styleSheet).value).toBe('margin-right:20rpx;')
		expect(genCssValue('mlr-20', styleSheet).value).toBe('margin-left:20rpx;margin-right:20rpx;')
		expect(genCssValue('mtb-20', styleSheet).value).toBe('margin-top:20rpx;margin-bottom:20rpx;')
		expect(genCssValue('mtb-20.5', styleSheet).value).toBe('margin-top:20.5rpx;margin-bottom:20.5rpx;')

		expect(genCssValue('p-10', styleSheet).value).toBe('padding:10rpx;')
		expect(genCssValue('p-auto', styleSheet).value).toBe('padding:auto;')
		expect(genCssValue('p-4-40', styleSheet).value).toBe('padding:4rpx 40rpx;')
		expect(genCssValue('p-10-auto', styleSheet).value).toBe('padding:10rpx auto;')
		expect(genCssValue('p-auto-10', styleSheet).value).toBe('padding:auto 10rpx;')
		expect(genCssValue('p-4-40-0-9', styleSheet).value).toBe('padding:4rpx 40rpx 0rpx 9rpx;')
		expect(genCssValue('pt-20', styleSheet).value).toBe('padding-top:20rpx;')
		expect(genCssValue('pb-20', styleSheet).value).toBe('padding-bottom:20rpx;')
		expect(genCssValue('pl-20', styleSheet).value).toBe('padding-left:20rpx;')
		expect(genCssValue('pr-20', styleSheet).value).toBe('padding-right:20rpx;')
		expect(genCssValue('plr-20', styleSheet).value).toBe('padding-left:20rpx;padding-right:20rpx;')
		expect(genCssValue('ptb-20', styleSheet).value).toBe('padding-top:20rpx;padding-bottom:20rpx;')

		expect(genCssValue('ptb-20.5', styleSheet).value).toBe('padding-top:20.5rpx;padding-bottom:20.5rpx;')

	})
	it('宽高', async ({ expect }) => {
		expect(genCssValue('icon-4.04', styleSheet).value).toBe('width:4.04rpx;height:4.04rpx;')
		expect(genCssValue('icon-4.04rem', styleSheet).value).toBe('width:4.04rem;height:4.04rem;')
		expect(genCssValue('icon-4', styleSheet).value).toBe('width:4rpx;height:4rpx;')
		expect(genCssValue('icon-4vh', styleSheet).value).toBe('width:4vh;height:4vh;')
		expect(genCssValue('icon-21vw', styleSheet).value).toBe('width:21vw;height:21vw;')
		expect(genCssValue('icon-21rem', styleSheet).value).toBe('width:21rem;height:21rem;')
		expect(genCssValue('icon-21.5em', styleSheet).value).toBe('width:21.5em;height:21.5em;')
		expect(genCssValue('icon-21px', styleSheet).value).toBe('width:21px;height:21px;')
		expect(genCssValue('icon-21rpx', styleSheet).value).toBe('width:21rpx;height:21rpx;')
		expect(genCssValue('icon-40%', styleSheet).value).toBe('width:40%;height:40%;')
		expect(genCssValue('icon-40.5%', styleSheet).value).toBe('width:40.5%;height:40.5%;')
		expect(genCssValue('icon-40.05%', styleSheet).value).toBe('width:40.05%;height:40.05%;')


		expect(genCssValue('width-100', styleSheet).value).toBe('width:100rpx;')
		expect(genCssValue('width-100vh', styleSheet).value).toBe('width:100vh;')
		expect(genCssValue('width-100vw', styleSheet).value).toBe('width:100vw;')
		expect(genCssValue('width-100%', styleSheet).value).toBe('width:100%;')
		expect(genCssValue('width-50%', styleSheet).value).toBe('width:50%;')

		expect(genCssValue('w-100', styleSheet).value).toBe('width:100rpx;')
		expect(genCssValue('w-100vh', styleSheet).value).toBe('width:100vh;')
		expect(genCssValue('w-100vw', styleSheet).value).toBe('width:100vw;')
		expect(genCssValue('w-100rem', styleSheet).value).toBe('width:100rem;')
		expect(genCssValue('w-100px', styleSheet).value).toBe('width:100px;')
		expect(genCssValue('w-100rpx', styleSheet).value).toBe('width:100rpx;')
		expect(genCssValue('w-100em', styleSheet).value).toBe('width:100em;')
		expect(genCssValue('w-100%', styleSheet).value).toBe('width:100%;')
		expect(genCssValue('w-50%', styleSheet).value).toBe('width:50%;')
		expect(genCssValue('w-50.5%', styleSheet).value).toBe('width:50.5%;')

		expect(genCssValue('w-1.5', styleSheet).value).toBe('width:1.5rpx;')
		expect(genCssValue('w-.5', styleSheet).value).toBe('width:.5rpx;')
		expect(genCssValue('w-10.5', styleSheet).value).toBe('width:10.5rpx;')

		expect(genCssValue('height-100', styleSheet).value).toBe('height:100rpx;')
		expect(genCssValue('height-100vh', styleSheet).value).toBe('height:100vh;')
		expect(genCssValue('height-100vw', styleSheet).value).toBe('height:100vw;')
		expect(genCssValue('height-100%', styleSheet).value).toBe('height:100%;')
		expect(genCssValue('height-50%', styleSheet).value).toBe('height:50%;')
		expect(genCssValue('h-100', styleSheet).value).toBe('height:100rpx;')
		expect(genCssValue('h-100vh', styleSheet).value).toBe('height:100vh;')
		expect(genCssValue('h-100vw', styleSheet).value).toBe('height:100vw;')
		expect(genCssValue('h-100%', styleSheet).value).toBe('height:100%;')
		expect(genCssValue('h-50%', styleSheet).value).toBe('height:50%;')

		expect(genCssValue('h-1.5', styleSheet).value).toBe('height:1.5rpx;')
		expect(genCssValue('h-.5', styleSheet).value).toBe('height:.5rpx;')
		expect(genCssValue('h-10.5', styleSheet).value).toBe('height:10.5rpx;')
	})

	it('鼠标样式', async ({ expect }) => {
		expect(genCssValue('poiter', styleSheet).value).toBe('cursor: pointer;')
	})

})