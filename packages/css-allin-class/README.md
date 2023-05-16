# 为啥是?
1. 动态规则，灵活
2. 代码提示插件
3. 专为vue、uniapp

### 假设有如下vue文件，未定义style样式 w-10%
```html
<template>
  <view class="w-10% myclsss">
    ...
  </view>
</template>

<style type="text/css">
// 空内容
</style>
```

### 插件会自动生成如下css样式，不需要写css 
```css
// myclsss 不会生成样式

// w-10% 生成如下的样式
.w-10%{
  width:10%;
}

```
### 解释： w-10% 命中预设的规则 生成规则指定的CSS样式
```
w-10% 命中的预设规则： 
 [
   /^(width|w)-(\d+)(vh|vw|%)*$/,
   (match, { unit }) => ({ 'width': `${match[2]}${match[3]?match[3]:unit};` })
 ]
 
 该规则的效果： 
 w-10%        => width:10%;
 w-50        => width:100rpx;  
 w-20vh       => width:20vh
 width-50%    => width:50%;  
```


# 使用
当前支持 uniapp， vue2， vue3

## 1.下载
```
pnpm i css-allin-class -D
```

## 2.修改 vue 配置文件

- vue2

```js
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
const { allin } = require('css-allin-class')
const { preset } = require('css-allin-class/preset')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      allin({
        // unit:'px',
        // rules: [],
        presets: [preset()]
      })
    ]
  }
})
```

- vue3

```js
// vite.config.js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import allin from 'css-allin-class'
import preset from 'css-allin-class/preset'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    allin({
      // unit:'px',
      // rules: [],
      presets:[preset()]
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```
- uniapp中使用vue3时，需要引入 `@dcloudio/vite-plugin-uni` 
- [uniapp官网教程](https://uniapp.dcloud.net.cn/collocation/vite-config.html)
```js
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni';
import allin from 'css-allin-class'
import preset from 'css-allin-class/preset'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    allin({
      // unit:'px',
      // rules: [],
      presets:[preset()]
    }),
  ],
})
```

- vitepress
```js
// .vitepress/config.js
import { defineConfig } from 'vitepress'
import allin from 'css-allin-class'
import preset from 'css-allin-class/preset'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      allin({ unit:'px', prefix:'a-', presets:[preset()]})
    ]
  },
  ...
})
```
## 3. 安装vscode、hbuilderx代码提示插件

> 插件开发中 跳过


# 可选配置

## 预设样式
- 导入

```js
// vue.config.js
const allinClass = require('css-allin-class')
const preset = require('css-allin-class/preset') // 预设样式 可选配置

module.exports = {
  configureWebpack: {
    plugins: [
      allin({
        // unit:'px',
        // rules: [],
        presets: [preset()]
      })
    ]
  }
}
```

## 预设规则示例

### border
```js
class='border-4-solid-#c1c' => 'border:4rpx solid #c1c;'
class='border-4-#c1c1c1-solid' => 'border:4rpx solid #c1c1c1;'
class='border-4-solid' => 'border:4rpx solid #c1c1c1;'
class='border-4-#c1c1c1' => 'border:4rpx solid #c1c1c1;'
class='border-4' => 'border:4rpx solid #c1c1c1;'
class='border' => 'border:1rpx solid #c1c1c1;'
class='border-solid' => 'border:1rpx solid #c1c1c1;'
class='border-solid-4' => 'border:4rpx solid #c1c1c1;'
class='border-solid-4-#f2' => 'border:4rpx solid #f2f2f2;'
class='border-solid-#f2-4' => 'border:4rpx solid #f2f2f2;'
class='border-solid-#c1c1c1' => 'border:1rpx solid #c1c1c1;'
class='border-solid-#f2' => 'border:1rpx solid #f2f2f2;'
class='border-#c1c1c1' => 'border:1rpx solid #c1c1c1;'
class='border-#f2-solid-4' => 'border:4rpx solid #f2f2f2;'
class='border-#f2-4-solid' => 'border:4rpx solid #f2f2f2;'
class='border-#f2-4' => 'border:4rpx solid #f2f2f2;'
class='border-#f2-solid' => 'border:1rpx solid #f2f2f2;'
```

### border-color
```js
class='bc-#4' => 'border-color:#444444;'
class='bc-#45' => 'border-color:#454545;'
class='bc-#456' => 'border-color:#456456;'
```

### border-width
```js
class='bw-r-4' => 'border-right-width:4rpx;'
class='bw-4' => 'border-width:4rpx;'
```

### border-radius
```js
// radius-10%-40px、
// class='br-t-1' => 'border-top-left-radius:1rpx;border-top-right-radius:1rpx;'
class='radius-t-1' => 'border-top-left-radius:1rpx;border-top-right-radius:1rpx;'
class='radius-b-2' => 'border-bottom-left-radius:2rpx;border-bottom-right-radius:2rpx;'
class='radius-l-3' => 'border-top-left-radius:3rpx;border-bottom-left-radius:3rpx;'
class='radius-r-4' => 'border-top-right-radius:4rpx;border-bottom-right-radius:4rpx;'
class='radius-r-50%' => 'border-top-right-radius:50%;border-bottom-right-radius:50%;'


class='radius-10' => 'border-radius:10rpx;'
class='radius-10-20' => 'border-radius:10rpx 20rpx;'
class='radius-10-20-30' => 'border-radius:10rpx 20rpx 30rpx;'
class='radius-10-20-30-40' => 'border-radius:10rpx 20rpx 30rpx 40rpx;'
class='radius-10-20-30-40-50' => // 匹配不到 不会生成样式
class='radius-10-20-30-40%' => 'border-radius:10% 20% 30% 40%;'

class='radius-tr-40' => 'border-top-right-radius:40rpx;'
class='radius-tl-40' => 'border-top-left-radius:40rpx;'
class='radius-br-40' => 'border-bottom-right-radius:40rpx;'
class='radius-bl-40' => 'border-bottom-left-radius:40rpx;'
```

### css颜色变量
```js
class='bg-v-c-bg-page' => 'background-color:var(--c-bg-page);'
class='c-v-c-bg-page' => 'color:var(--c-bg-page);'
class='c-v-c1-bg2-3' => 'color:var(--c1-bg2-3);'
```

### translate
```js
class='translateX-.04' => 'transform:translateX(.04rpx);'
class='translateY-.04' => 'transform:translateY(.04rpx);'
class='translateY-40%' => 'transform:translateY(40%);'
```

### shadow阴影
```js
class='shadow-.4' => 'box-shadow:0px 4px 12px 0px rgba(0, 0, 0, .4);'
class='shadow-0.4' => 'box-shadow:0px 4px 12px 0px rgba(0, 0, 0, .4);'
class='shadow-0.04' => 'box-shadow:0px 4px 12px 0px rgba(0, 0, 0, .04);'
class='shadow-1-.04' => 'box-shadow:1px 4px 12px 0px rgba(0, 0, 0, .04);'
class='shadow-1-2-.04' => 'box-shadow:1px 2px 12px 0px rgba(0, 0, 0, .04);'
class='shadow-1-2-3-.04' => 'box-shadow:1px 2px 3px 0px rgba(0, 0, 0, .04);'
class='shadow-1-2-3-4-.04' => 'box-shadow:1px 2px 3px 4px rgba(0, 0, 0, .04);'
```

### 行高
```js
class='lh-10' => 'line-height: 10;'
class='lh-10.09' => 'line-height: 10.09;'
class='lh-10.09' => 'line-height: 10.09;'
class='lh-.09' => 'line-height: .09;'
class='lh-10px' => 'line-height: 10px;'
class='lh-10rpx' => 'line-height: 10rpx;'
```

### 最小最大高度
```js
class='min-w-0' => 'min-width:0rpx;'
class='min-w-10.9' => 'min-width:10.9rpx;'
class='min-w-.9' => 'min-width:.9rpx;'
class='min-w-50vw' => 'min-width:50vw;'
class='min-w-50%' => 'min-width:50%;'

class='min-h-0' => 'min-height:0rpx;'
class='min-h-10.9' => 'min-height:10.9rpx;'
class='min-h-.9' => 'min-height:.9rpx;'
class='min-h-50vw' => 'min-height:50vw;'
class='min-h-50%' => 'min-height:50%;'

class='max-w-0' => 'max-width:0rpx;'
class='max-w-10.9' => 'max-width:10.9rpx;'
class='max-w-.9' => 'max-width:.9rpx;'
class='max-w-50vw' => 'max-width:50vw;'
class='max-w-50%' => 'max-width:50%;'

class='max-h-0' => 'max-height:0rpx;'
class='max-h-10.9' => 'max-height:10.9rpx;'
class='max-h-.9' => 'max-height:.9rpx;'
class='max-h-50vw' => 'max-height:50vw;'
class='max-h-50%' => 'max-height:50%;'
```

### order
```js
class='order-1.5' => 'order:1.5;'
class='order-.5' => 'order:.5;'
class='order-5' => 'order:5;'
```

### z-index
```js
class='z-10' => 'z-index:10;'
class='z-auto' => 'z-index:auto;'
```

### 上下左右
```js
class='t-10' => 'top:10rpx;'
class='t-10%' => 'top:10%;'
class='t--10%' => 'top:-10%;'
class='t--10vh' => 'top:-10vh;'
class='t-10vw' => 'top:10vw;'

class='t-.10vw' => 'top:.10vw;'
class='t-10.10vw' => 'top:10.10vw;'
class='t-10.10' => 'top:10.10rpx;'

class='inset--10%' => 'top: -10%;right: -10%;bottom: -10%;left: -10%;'
class='inset--10' => 'top: -10rpx;right: -10rpx;bottom: -10rpx;left: -10rpx;'
class='inset-0' => 'top: 0rpx;right: 0rpx;bottom: 0rpx;left: 0rpx;'
class='inset-0.5' => 'top: 0.5rpx;right: 0.5rpx;bottom: 0.5rpx;left: 0.5rpx;'
class='inset-.5' => 'top: .5rpx;right: .5rpx;bottom: .5rpx;left: .5rpx;'

class='b-10.10' => 'bottom:10.10rpx;'
class='r-10.10' => 'right:10.10rpx;'
class='l-10.10' => 'left:10.10rpx;'

```

### display
```js
class='flex' => 'display: flex;'
class='grid' => 'display: grid;'
class='none' => 'display: none;'
class='block' => 'display: block;'
```

### flex
```js
class='flex-1' => 'flex: 1;'
class='f-1' => 'flex: 1;'
```

### 字体
```js
class='fs-25' => 'font-size: 25rpx;'
class='fs-w25' => // 匹配不到 不会生成样式
class='fs-' => // 匹配不到 不会生成样式
```

### 颜色
```js
class='c-#123' => 'color:#123;'
class='c-#1' => 'color:#111111;'
class='c-#12' => 'color:#121212;'
class='c-#123456' => 'color:#123456;'
class='c-#1111111' => // 匹配不到 不会生成样式
class='c-#' => // 匹配不到 不会生成样式
class='c-#d23' => 'color:#d23;'
class='c-#d2' => 'color:#d2d2d2;'
class='c-#d' => 'color:#dddddd;'
class='c-#0' => 'color:#000000;'

class='c-red' => 'color:red;'
class='c-red1' => // 匹配不到 不会生成样式
class='c-cur' => 'color:currentcolor;'
class='c-initial' => 'color:initial;'

class='bg-#1' => 'background-color:#111111;'
class='bg-#d2' => 'background-color:#d2d2d2;'
class='bg-#d23' => 'background-color:#d23;'
class='bg-#d' => 'background-color:#dddddd;'
class='bg-red' => 'background-color:red;'
class='bg-red1' => // 匹配不到 不会生成样式

class='rgba-1-2-3-4' => 'color:rgba(1,2,3,.4);'
class='rgba-1-2-3-0.6' => 'color:rgba(1,2,3,0.6);'
class='rgba-1-2-3-.6' => 'color:rgba(1,2,3,.6);'

class='gba-10-222-256' => 'color:gba(10%,222%,256%);'

```

### 超出省略
```js
class='line-1' => '-webkit-line-clamp: 1;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;'
class='line-5' => '-webkit-line-clamp: 5;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;'
```

### 边距
```js
class='m-10' => 'margin:10rpx;'
class='m-4-40' => 'margin:4rpx 40rpx;'
class='m-10-auto' => 'margin:10rpx auto;'
class='m-auto-10' => 'margin:auto 10rpx;'
class='m-4-40-0-9' => 'margin:4rpx 40rpx 0rpx 9rpx;'
class='mt-20' => 'margin-top:20rpx;'
class='mb-20' => 'margin-bottom:20rpx;'
class='ml-20' => 'margin-left:20rpx;'
class='mr-20' => 'margin-right:20rpx;'
class='mlr-20' => 'margin-left:20rpx;margin-right:20rpx;'
class='mtb-20' => 'margin-top:20rpx;margin-bottom:20rpx;'

class='mtb-20.5' => 'margin-top:20.5rpx;margin-bottom:20.5rpx;'

class='p-10' => 'padding:10rpx;'
class='p-4-40' => 'padding:4rpx 40rpx;'
class='p-10-auto' => 'padding:10rpx auto;'
class='p-auto-10' => 'padding:auto 10rpx;'
class='p-4-40-0-9' => 'padding:4rpx 40rpx 0rpx 9rpx;'
class='pt-20' => 'padding-top:20rpx;'
class='pb-20' => 'padding-bottom:20rpx;'
class='pl-20' => 'padding-left:20rpx;'
class='pr-20' => 'padding-right:20rpx;'
class='plr-20' => 'padding-left:20rpx;padding-right:20rpx;'
class='ptb-20' => 'padding-top:20rpx;padding-bottom:20rpx;'

class='ptb-20.5' => 'padding-top:20.5rpx;padding-bottom:20.5rpx;'

```

### 宽高
```js
class='icon-4.04' => 'width:4.04rpx;height:4.04rpx;'
class='icon-4.04rem' => 'width:4.04rem;height:4.04rem;'
class='icon-4' => 'width:4rpx;height:4rpx;'
class='icon-4vh' => 'width:4vh;height:4vh;'
class='icon-21vw' => 'width:21vw;height:21vw;'
class='icon-21rem' => 'width:21rem;height:21rem;'
class='icon-21px' => 'width:21px;height:21px;'
class='icon-21rpx' => 'width:21rpx;height:21rpx;'
class='icon-40%' => 'width:40%;height:40%;'

class='width-100' => 'width:100rpx;'
class='width-100vh' => 'width:100vh;'
class='width-100vw' => 'width:100vw;'
class='width-100%' => 'width:100%;'
class='width-50%' => 'width:50%;'
class='w-100' => 'width:100rpx;'
class='w-100vh' => 'width:100vh;'
class='w-100vw' => 'width:100vw;'
class='w-100%' => 'width:100%;'
class='w-50%' => 'width:50%;'

class='w-1.5' => 'width:1.5rpx;'
class='w-.5' => 'width:.5rpx;'
class='w-10.5' => 'width:10.5rpx;'

class='height-100' => 'height:100rpx;'
class='height-100vh' => 'height:100vh;'
class='height-100vw' => 'height:100vw;'
class='height-100%' => 'height:100%;'
class='height-50%' => 'height:50%;'
class='h-100' => 'height:100rpx;'
class='h-100vh' => 'height:100vh;'
class='h-100vw' => 'height:100vw;'
class='h-100%' => 'height:100%;'
class='h-50%' => 'height:50%;'

class='h-1.5' => 'height:1.5rpx;'
class='h-.5' => 'height:.5rpx;'
class='h-10.5' => 'height:10.5rpx;'
  ```

### 鼠标样式
```js
class='poiter' => 'cursor: pointer;'
```




## 根据现有css文件，生成规则

字符串形式
```js
cssFile: './style/index.scss',
```

对象形式
```js
cssFile: {
  input:'./style/index.scss', // 支持文件夹和文件路径 
  // 局部 > 全局，局部prefix，suffix可以覆盖全局的prefix，suffix
  prefix: 'f', // 给这些文件内的css增加前缀
  suffix: 'suf', // 给这些文件内的css增加后缀
  rmPrefix: 'uni-', // 给这些文件内的css移除前后缀
  rmSuffix: 'ff', // 给这些文件内的css移除增加后缀
},
```

> 例如：
```css
// 现有的css文件 位于 根目录/style/index.scss
.over-hide{overflow: hidden;}

.flex{display: flex;}
.tn-flex {display: -webkit-flex;display: flex;}
// 暂不支持
.flex .col5{width:20%;}
```

```js
// vue.config.js 指定css文件的路径
module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('allinClass')
      .use(allinClass({
      cssFile: './style/index.scss'
   }))
  }
}
```

```js
// 自动生成静态规则 加入rules
rules: [
   {
    'over-hide': 'overflow: hidden;',
    'flex': 'display: flex;',
    'tn-flex': 'display: -webkit-flex;display: flex;'
   }
]
```

## 规则配置

### 动态规则
> 动态规则使用 match 进行匹配，匹配有结果，调用数组第二项的方法，并把匹配值当做参数
```js
rules: [
  [/^m-(\d+)$/, (match, { unit }) => ({ 'margin': `${match[1]}${unit};` })],
  [/^m-(\d+)-(\d+)-(\d+)-(\d+)$/, (match, { unit }) => ({ 'margin': `${match[1]}${unit};` })],
]

如果template中存在 <div class="flex jc-c m-10">{{title}}</div>

m-10 可以被/^m-(\d+)$/匹配到，这时会调用(match, { unit }) => ({ 'margin': `${match[1]}${unit};` })得到返回值 => { 'margin': `10rpx;` } // unit为配置的单位 默认rpx

m-10 将会生成css样式
.m-10{margin:10rpx;;}
```
### 静态规则

```js
rules: [
  // 数组形式
  ['flex', 'display:flex;'],
  // 对象形式
  {
    'jc-c': 'justify-content: center;',
    
    'border-main': 'border:2rpx solid #FB7302;',
    'border-E6': 'border:2rpx solid #E6E6E6;',
    
    'c-white': 'color:#FFFFFF;',
  }
]

// 当rules数组中增加了上面这些规则

template中存在 <div class="flex jc-c">{{title}}</div>

将会根据rules匹配class中的 flex jc-c

在输出文件中生成如下css样式

.flex{display:flex;}
.jc-c{justify-content: center;}

```


<!-- ## css输出路径
out:'./public.css',

便于查看生成的css内容，需要在main.js中引入 才会生效 -->

## 全局添加前缀和后缀
prefix: 'ff',

suffix: 'ff',

## 层叠权重覆盖
>使用!important是危险的，因为没有办法对其进行覆盖,不建议使用

### 权重后缀：-i + 数字
例如：p-10-i3 后缀：-i3，表示需要增加p-10的权重  权重增加3

生成 示例：
```
// p-10 =>  padding：10rpx
class="p-10-i3"

// 生成 
.p-10-i3.p-10-i3.p-10-i3{
  padding：10rpx
}
```

> uniapp .vue文件style标签内的样式 默认增加了css作用域，需要三层css才能覆盖 因此最小默认从3开始

.p-10-i.p-10-i的权重 > p-10 即可覆盖

### 要覆盖 p-10-i 怎么办？

增加i后面的数字 p-10-i === p-10-i3 ,权重 p-10-i4 > p-10-i3

使用p-10-i4，p-10-i5， p-10-i6 ...,权重高的来覆盖，数字越大，权重越高

```
class="p-10-i5"

// 生成
.p-10-i5.p-10-i5.p-10-i5.p-10-i5.p-10-i5{
  padding：10rpx
}
```
## 参数示例

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('allinClass')
      .use(allinClass({
        // cssFile: './style/index.scss', // 把现有css，scss文件变成全局的规则
        // 也支持对象
        // cssFile: {
        //   input:'./style/index.scss',
        //   prefix: 'ff', // 当前文件或文件夹内的css前缀 局部生效 默认为""
        //   suffix: 'ff', // 后缀 默认为""
        //   rmPrefix: 'w-', // 移除前缀 默认为"" 例如：w-flex => felx 
        //   rmSuffix: 'ff', // 移除前缀 默认为""
        // },
        // prefix: 'ff', // 前缀 全局css生效 用于解决冲突
        // suffix: 'ff', // 后缀 全局css生效 用于解决冲突
        // unit: 'px', // 宽高等的单位 默认rpx 
        // iSuffix: '-i', // 权重后缀
        rules: [
          // 动态规则示例
          [/^fs-(\d+)$/, ([, d], { unit }) => ({ 'font-size': `${d * 2}${unit};` })], // fs-10 => font-size:20rpx
          [/^fs-(\d+)$/, (match, { unit }) => `font-size: ${match[1]}${unit};`], // 与上面这个等价
          [/^fw-(\d+)$/, ([, d], { unit }) => ({ 'font-weight': `${d};` })], // fw-700 => font-weight: 700
          
          // w-50%或者width-50% => width:50%; | w-50 =>  width:100rpx; |  w-20vh => width:20
          [/^(width|w)-(\d+)(vh|vw|%)*$/, (match, { unit }) => ({ 'width': `${match[2]}${match[3]?match[3]:unit};` })],
          [/^(height|h)-(\d+)(vh|vw|%)*$/, (match, { unit }) => ({ 'height': `${match[2]}${match[3]?match[3]:unit};` })],
          
          // color--#000 => color:#000
          [/^color-#([\d\w])$/, (match) => `color:#${match[1]};`],
          // c-#000 => color:#000
          [/^c-#([\d\w])$/, (match) => `color:#${match[1]};`],
          
          [/^bg-#([\d\w])$/, (match) => `background-color: #${match[1]};`],
          [/^color-(\w+)$/, (match) => `color: ${match[1]};`],
          [/^bg-(\w+)$/, (match) => `background-color: ${match[1]};`],
          
          // 文字超出省略 d是正则匹配到的数字 例如：line-1  match[1]为1 
          [/^line-(\d+)$/, (match, { unit }) =>  `overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:  ${match[1]};`],

          [/^icon-(\d+)$/, ([, d], { unit }) =>  `width: ${d}${unit};height: ${d}${unit};`],
          
          [/^flex-(\d+)$/, (match) => `flex: ${match[1]};`],
          
          [/^lh-(\d+)$/, (match, { unit }) => `line-height: ${match[1]}${unit};`],
          
          [/^m-(\d+)-(\d+|auto)$/, (match, { unit }) => ({ 'margin': `${match[1]}${unit} ${match[2]}${unit};` })],
          [/^m-(\d+)$/, ([, d], { unit }) => ({ 'margin': `${d}${unit};` })],
          [/^mt-(\d+)$/, ([, d], { unit }) => ({ 'margin-top': `${d}${unit};` })],
          [/^mb-(\d+)$/, ([, d], { unit }) => ({ 'margin-bottom': `${d}${unit};` })],
          [/^ml-(\d+)$/, ([, d], { unit }) => ({ 'margin-left': `${d}${unit};` })],
          [/^mr-(\d+)$/, ([, d], { unit }) => ({ 'margin-right': `${d}${unit};` })],
          [/^mlr-(\d+)$/, (match, { unit }) => `margin-left:${match[1] }${unit};margin-right:${match[1]}${unit};`],
          [/^mtb-(\d+)$/, (match, { unit }) => `margin-top:${match[1] }${unit};margin-bottom:${match[1]}${unit};`],
          [/^m-(\d+)-(\d+)-(\d+)-(\d+)$/, match => ({ 'margin': `${match[1]}${unit} ${match[2]}${unit} ${match[3]}${unit} ${match[4]}${unit};` })],
          
          [/^p-(\d+)-(\d+)$/, (match, { unit }) => ({ 'padding': `${match[1]}${unit} ${match[2]}${unit};` })],
          [/^p-(\d+)$/, (match, { unit }) => ({ 'padding': `${match[1]}${unit}` })],
          [/^pt-(\d+)$/, (match, { unit }) => ({ 'padding-top': `${match[1]}${unit}` })],
          [/^pb-(\d+)$/, (match, { unit }) => ({ 'padding-bottom': `${match[1]}${unit}` })],
          [/^pl-(\d+)$/, (match, { unit }) => ({ 'padding-left': `${match[1]}${unit}` })],
          [/^pr-(\d+)$/, (match, { unit }) => ({ 'padding-right': `${match[1]}${unit}` })],
          [/^ptb-(\d+)$/, (match, { unit }) => `padding-top:${match[1] }${unit};padding-bottom:${match[1]}${unit};`],
          [/^plr-(\d+)$/, (match, { unit }) => `padding-left:${match[1] }${unit};padding-right:${match[1]}${unit};`],
          [/^p-(\d+)-(\d+)-(\d+)-(\d+)$/, (match, { unit }) => ({ 'padding': `${match[1]}${unit} ${match[2]}${unit} ${match[3]}${unit} ${match[4]}${unit};` })],
          

          // 静态规则
          // ['br-lg', 'border-radius: 20rpx;'],
          
          // 静态对象规则 
          {
            'jc-c': 'justify-content: center;',
            'ai-c': 'align-items: center;',
            
            'border-main': 'border:2rpx solid #FB7302;',
            'border-E6': 'border:2rpx solid #E6E6E6;',
            
            'c-white': 'color:#FFFFFF;',
          }
        ],
        // 组合 基于单个现有规则的组合    class="py-2 px-4  br-lg c-3 bg-red" 等价于 class="btn"
        shortcuts: [
          // 静态规则
          {
            btn: 'py-2 px-4  br-lg c-3 bg-red',
          },
          // 动态规则
          [/^btn-(.*)$/, ([, c]) => `bg-${c} text-${c} py-2 px-4 radius-lg`],
        ],
      }))
  }
}
```


# 为啥不是
## tailwindcss 
1. 规则不够灵活
2. 不会用
3. 不支持
...