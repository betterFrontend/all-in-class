## css颜色变量
```js
class='bg-v-c-bg-page' => 'background-color:var(--c-bg-page);'
class='c-v-c-bg-page' => 'color:var(--c-bg-page);'
class='c-v-c1-bg2-3' => 'color:var(--c1-bg2-3);'
```

## 颜色
```js
class='c-#123' => 'color:#123;'
class='c-#1' => 'color:#111111;'
class='c-#12' => 'color:#121212;'
class='c-#123456' => 'color:#123456;'
class='c-#1111111' => // 匹配不到 不会生成样式
class='c-#' => // 匹配不到 不会生成样式
class='c-#d23' => 'color:#d23;'
class='c-#d2' => 'color:#d2d2d2;'
class='c-#d' => 'color:#dddddd;'
class='c-#0' => 'color:#000000;'

class='c-red' => 'color:red;'
class='c-red1' => // 匹配不到 不会生成样式
class='c-cur' => 'color:currentcolor;'
class='c-initial' => 'color:initial;'

class='bg-#1' => 'background-color:#111111;'
class='bg-#d2' => 'background-color:#d2d2d2;'
class='bg-#d23' => 'background-color:#d23;'
class='bg-#d' => 'background-color:#dddddd;'
class='bg-red' => 'background-color:red;'
class='bg-red1' => // 匹配不到 不会生成样式

class='rgba-1-2-3-4' => 'color:rgba(1,2,3,.4);'
class='rgba-1-2-3-0.6' => 'color:rgba(1,2,3,0.6);'
class='rgba-1-2-3-.6' => 'color:rgba(1,2,3,.6);'

class='gba-10-222-256' => 'color:gba(10%,222%,256%);'

```