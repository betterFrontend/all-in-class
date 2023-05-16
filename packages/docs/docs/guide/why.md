# 为什么是？

## 兼容 UnoCSS
[UnoCSS(官网地址)](https://unocss.dev/)是一款强大的css引擎，原子化、按需生成、易扩展...[UnoCSS作者的设计理念](https://antfu.me/posts/reimagine-atomic-css)

意味着兼容：

Windi CSS、Tailwind CSS
## 兼容 uniapp
意味着兼容：

h5、app、微信小程序、支付宝小程序、字节小程序...

## ide 插件

在 hbuilderx、vscode 中提供了编辑器插件，功能：

1. 鼠标悬停查看示意
2. 代码提示
3. style 转 class
4. rpx 和 px 互换



## 为什么不是？
### UnoCSS
UnoCSS比我大两岁，是比较成熟的技术，UnoCSS作者是 Vite 的成员之一，足以体现UnoCSS的质量，我也很喜欢UnoCSS，但是

- 不支持小程序
```css
// w-100% 只会在css中把%改为\\% 小程序中不支持改模式
.w-100\% { width: 100%; }
```
- 不支持rpx
```css
// rpx无法被浏览器识别
.icon-100 { width: 100 rpx; height: 100 rpx;}
```
- 没有 hbuilderx 的代码提示工具




### Windi CSS
没有 UnoCSS 强大
### Tailwind CSS
没有 UnoCSS 强大
