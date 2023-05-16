# 预设
预设是一组写好的配置

## 对象形式预设
```js
export const myPreset = {
  unit: 'px', // 宽高等的单位 
}
```
导入使用
```js{6,14}
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import allin from "css-allin-class";
import preset from "css-allin-class/preset";
import myPreset from "相对路径/myPreset";

export default defineConfig({
  plugins: [
    vue(),
    allin({
      presets: [
        preset(),
        myPreset
      ] 
    })
  ]
})
```
## 函数形式预设
```js
export const myPreset = (config) => {
  const { unit='rpx' } = config
  return {
    unit, // 宽高等的单位 
  }
}
```
导入使用
```js{6,14}
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import allin from "css-allin-class";
import preset from "css-allin-class/preset";
import myPreset from "相对路径/myPreset";

export default defineConfig({
  plugins: [
    vue(),
    allin({
      presets: [
        preset(),
        myPreset({unit: px})
      ] 
    })
  ]
})
```