
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
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { allin } from "all-in-class";
import { preset } from "all-in-class/preset";

export default defineConfig({
  plugins: [
    vue(),
    allin({
      presets: [preset()] 
    })
  ]
})
```