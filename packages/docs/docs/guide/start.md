# 起源

## 前端 css 样式常见问题
1. css起名困难
2. 样式上下跳转
3. ...



是否有更好的解决方案？
## 公共 css 的问题
通常，公共 css 使用 scss 或者 less 编写，以 scss 为例
```css
// style.scss
// 定义字体(rpx)单位，大于或等于20的都为rpx单位字体
@for $i from 20 through 40 {
	.u-font-#{$i} {
		font-size: $i + rpx;
	}
}
```
它将被编译为：
```css
.u-font-20 { font-size: 20 rpx; }
.u-font-21 { font-size: 21 rpx; }
/* ... */
.u-font-40 { font-size: 40 rpx; }
```
真实开发中，我可能只用 28rpx,32rpx 这两个，剩下18个未使用的 css，小程序限制主包2M的情况下，无疑是巨大的浪费

假如项目需要一个50rpx的字体，由于公用css没有定义，使得我必须自己手写一个

是否有更好的解决方案？

## 按需生成
```vue
<template>
  <div id="app">
    <img class="icon-100" alt="Vue logo" src="./assets/logo.png">
    <HelloWorld class="w-100%" msg="Welcome to Your Vue.js App"/>
  </div>
</template>
```
class样式将被编译为：
```css
.icon-100 { width: 100 rpx; height: 100 rpx;}
.w-100_ { width: 100%; }
```

当我刚诞生的时候，公司同事告诉我的创造者，UnoCSS在两年前，就已经实现了，而且是vue核心成员开发的，那还等撒子哟，用起来，开心


可是，可是，小程序不支持... 

抄袭是可耻的

## 按需生成 css 的问题
1. 学习成本高，不熟悉规则
2. 编写自己的动态规则，需要一定的正则知识
3. 过于灵活，风格不统一
4. ...


## 未来

愿望：
我不仅要解决这些问题，更希望自己是简单的，实用的，易上手的，兼容uniapp的，不抄袭UnoCSS的，被你喜欢的


我还在持续进步