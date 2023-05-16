## 根据现有css文件，生成规则

字符串形式
```js
...
 plugins: [
    allin({
      cssFile: './style/index.scss',
      presets: [preset()]
    })
  ]
  ...

```

对象形式
```js
...
 plugins: [
    allin({
      cssFile: {
        input:'./style/index.scss', // 支持文件夹和文件路径 
        // 局部 > 全局，局部prefix，suffix可以覆盖全局的prefix，suffix
        prefix: 'f', // 给这些文件内的css增加前缀
        suffix: 'suf', // 给这些文件内的css增加后缀
        rmPrefix: 'uni-', // 给这些文件内的css移除前后缀
        rmSuffix: 'ff', // 给这些文件内的css移除增加后缀
      },
      presets: [preset()]
    })
  ]
  ...

```

> 例如：

文件内容
```css
// style/index.scss
.over-hide{overflow: hidden;}
.flex-1{flex: 1;}
.tn-flex {display: flex;}

// 暂不支持
.flex .col5{width:20%;}
```
配置增加cssFile
```js{8}
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('allinClass')
      .use(
        allinClass({
          cssFile: './style/index.scss',
          rules: [{
            'flex': 'display: flex;'
          }]
        })
      )
  }
}
```

自动生成静态规则 加入rules
```js{11-13}
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('allinClass')
      .use(
        allinClass({
          cssFile: './style/index.scss',
          rules: [{
            'flex': 'display: flex;',
            'over-hide': 'overflow: hidden;',
            'flex-1': 'flex: 1;',
            'tn-flex': 'display: flex;'
          }]
        })
      )
  }
}
```