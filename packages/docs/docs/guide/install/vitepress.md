


## 安装
::: code-group
```bash [npm]
npm i -D all-in-class
```

```bash [pnpm]
pnpm i -D all-in-class
```
:::
## 修改vue配置文件
::: warning 警告
必须使用前缀 否则容易存在样式冲突
:::

```js
// vue.config.js
import { defineConfig } from 'vitepress'
import { allin } from "all-in-class";
import { preset } from "all-in-class/preset";

export default defineConfig({
  vite: {
    plugins: [
      allin({ 
        unit:'px', 
        prefix:'a-', // 必须使用前缀 否则容易存在样式冲突
        presets:[preset()]
      })
    ]
  }
})
```