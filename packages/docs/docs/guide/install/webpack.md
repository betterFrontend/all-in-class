
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