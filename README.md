# <center>all-in-class</center>

## 文档

[中文在线文档](https://meizhouchen.github.io/all-in-class/)

## 项目简介

受 unocss 项目启发的一款 css 生成插件，支持 uniapp，vite，webpack，支持按需生成，支持层叠权重覆盖，减少 css 体积，支持自定义样式，可灵活配置生成规则。

**原子化 css 样式，项目可以完全不需要写 css，不需要写 style**

## 特性

1. 动态规则，完全自定义
2. 适配 uniapp！！，vite，webpack
3. JIT 模式，按需自动生成，极大的减少生成的 css 体积
4. 支持层叠权重覆盖，不需要写!important，不需要写 css，不需要写 style

### 使用

#### **1. 安装**

```js
pnpm i all-in-class -D
```

#### **2. 配置**

[规则详细配置](./packages/README.md)

- **vite**

```js
// vite.config.js
import { allin } from "all-in-class";
export default {
  plugins: [
    allin({
      // 配置规则
      rules: {
        // 生成 w-10% 样式
        "w-10%": "width: 10%;",
      },
    }),
  ],
};
```

- **webpack**

```js
//webpack.config.js
const { allin } = require("all-in-class");
module.exports = {
  plugins: [
    allin({
      // 配置规则
      rules: {
        // 生成 w-10% 样式
        "w-10%": "width: 10%;",
      },
    }),
  ],
};
```

- **uniapp**
  vue2

```js
// vue.config.js
const { allin } = require("all-in-class");
const { preset } = require("all-in-class/preset");

module.exports = {
  configureWebpack: {
    plugins: [
      allin({
        presets: [preset()],
      }),
    ],
  },
};
```

vue3

```js
// vite.config.js
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { allin } from "all-in-class";
import { preset } from "all-in-class/preset";

export default defineConfig({
  plugins: [
    uni(),
    allin({
      presets: [preset()],
    }),
  ],
});
```

#### **3. 使用**

```html
<template>
  <view class="w-10% ..."> ... </view>
</template>
```

插件会自动生成如下 css 样式，不需要写 css

```css
// w-10% 生成如下的公共样式，可以全局使用
.w-10% {
  width: 10%;
}
```

### 层叠权重覆盖

> 使用!important 是危险的，因为没有办法对其进行覆盖,不建议使用

**权重后缀：-i + 数字**

例如：p-10-i3 后缀：-i3，表示需要增加 p-10 的权重 权重增加 3，数字越大，权重越高，
生成 示例：

```
// p-10 =>  padding：10rpx
class="p-10-i3"

// 生成
.p-10-i3.p-10-i3.p-10-i3{
  padding：10rpx
}
```

> uniapp .vue 文件 style 标签内的样式 默认增加了 css 作用域，需要三层 css 才能覆盖 因此最小默认从 3 开始，即 p-10-i === p-10-i3

```
// 权重原理
class="p-10-i5"
// 生成
.p-10-i5.p-10-i5.p-10-i5.p-10-i5.p-10-i5{
  padding：10rpx
}
```
