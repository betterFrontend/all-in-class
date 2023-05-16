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