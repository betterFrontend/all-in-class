
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
### vue2
```js
// vue.config.js
const { allin } = require('all-in-class')
const { preset } = require('all-in-class/preset')

module.exports = {
  configureWebpack: {
    plugins: [
      allin({
        presets: [preset()]
      })
    ]
  }
}
```
### vue3
```js
// vite.config.js
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni';
import { allin } from "all-in-class";
import { preset } from "all-in-class/preset";

export default defineConfig({
  plugins: [
    uni(),
    allin({
      presets: [preset()] 
    })
  ]
})
```