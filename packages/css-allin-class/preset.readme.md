
## 预设规则示例

### shadow阴影
```js
class='translateX-.04' => 'transform:translateX(.04rpx);'
class='translateY-.04' => 'transform:translateY(.04rpx);'
class='translateY-40%' => 'transform:translateY(40%);'
```

### shadow阴影
```js
class='shadow-.4' => 'box-shadow:0px 4px 12px 0px rgba(0, 0, 0, .4);'
class='shadow-0.4' => 'box-shadow:0px 4px 12px 0px rgba(0, 0, 0, .4);'
class='shadow-0.04' => 'box-shadow:0px 4px 12px 0px rgba(0, 0, 0, .04);'
class='shadow-1-.04' => 'box-shadow:1px 4px 12px 0px rgba(0, 0, 0, .04);'
class='shadow-1-2-.04' => 'box-shadow:1px 2px 12px 0px rgba(0, 0, 0, .04);'
class='shadow-1-2-3-.04' => 'box-shadow:1px 2px 3px 0px rgba(0, 0, 0, .04);'
class='shadow-1-2-3-4-.04' => 'box-shadow:1px 2px 3px 4px rgba(0, 0, 0, .04);'
```

### border-color
```js
// border-transparentborder-color: transparent;
// border-currentborder-color: currentColor;
class='border-#4' => 'border-color:#444444;'
class='border-#45' => 'border-color:#454545;'
class='border-#456' => 'border-color:#456456;'
```

### border-width
```js
class='border-r-4' => 'border-right-width:4rpx;'
class='border-4' => 'border-width:4rpx;'
```

### border-radius
```js
// radius-10%-40px、
class='br-t-1' => 'border-top-left-radius:1rpx;border-top-right-radius:1rpx;'
class='radius-t-1' => 'border-top-left-radius:1rpx;border-top-right-radius:1rpx;'
class='radius-b-2' => 'border-bottom-left-radius:2rpx;border-bottom-right-radius:2rpx;'
class='radius-l-3' => 'border-top-left-radius:3rpx;border-bottom-left-radius:3rpx;'
class='radius-r-4' => 'border-top-right-radius:4rpx;border-bottom-right-radius:4rpx;'
class='radius-r-50%' => 'border-top-right-radius:50%;border-bottom-right-radius:50%;'


class='radius-10' => 'border-radius:10rpx;'
class='radius-10-20' => 'border-radius:10rpx 20rpx;'
class='radius-10-20-30' => 'border-radius:10rpx 20rpx 30rpx;'
class='radius-10-20-30-40' => 'border-radius:10rpx 20rpx 30rpx 40rpx;'
class='radius-10-20-30-40-50' => // 匹配不到 不会生成样式
class='radius-10-20-30-40%' => 'border-radius:10% 20% 30% 40%;'

class='radius-tr-40' => 'border-top-right-radius:40rpx;'
class='radius-tl-40' => 'border-top-left-radius:40rpx;'
class='radius-br-40' => 'border-bottom-right-radius:40rpx;'
class='radius-bl-40' => 'border-bottom-left-radius:40rpx;'

```

### 行高
```js
class='lh-10' => 'line-height: 10;'
class='lh-10px' => 'line-height: 10px;'
class='lh-10rpx' => 'line-height: 10rpx;'
```

### 最小最大高度
```js
class='min-w-0' => 'min-width:0rpx;'
class='min-w-10.9' => 'min-width:10.9rpx;'
class='min-w-.9' => 'min-width:.9rpx;'
class='min-w-50vw' => 'min-width:50vw;'
class='min-w-50%' => 'min-width:50%;'

class='min-h-0' => 'min-height:0rpx;'
class='min-h-10.9' => 'min-height:10.9rpx;'
class='min-h-.9' => 'min-height:.9rpx;'
class='min-h-50vw' => 'min-height:50vw;'
class='min-h-50%' => 'min-height:50%;'

class='max-w-0' => 'max-width:0rpx;'
class='max-w-10.9' => 'max-width:10.9rpx;'
class='max-w-.9' => 'max-width:.9rpx;'
class='max-w-50vw' => 'max-width:50vw;'
class='max-w-50%' => 'max-width:50%;'

class='max-h-0' => 'max-height:0rpx;'
class='max-h-10.9' => 'max-height:10.9rpx;'
class='max-h-.9' => 'max-height:.9rpx;'
class='max-h-50vw' => 'max-height:50vw;'
class='max-h-50%' => 'max-height:50%;'
```

### order
```js
class='order-1.5' => 'order:1.5;'
class='order-.5' => 'order:.5;'
class='order-5' => 'order:5;'
```

### z-index
```js
class='z-10' => 'z-index:10;'
class='z-auto' => 'z-index:auto;'
```

### 上下左右
```js
class='t-10' => 'top:10rpx;'
class='t-10%' => 'top:10%;'
class='t--10%' => 'top:-10%;'
class='t--10vh' => 'top:-10vh;'
class='t-10vw' => 'top:10vw;'

class='t-.10vw' => 'top:.10vw;'
class='t-10.10vw' => 'top:10.10vw;'
class='t-10.10' => 'top:10.10rpx;'

class='inset--10%' => 'top: -10%;right: -10%;bottom: -10%;left: -10%;'
class='inset--10' => 'top: -10rpx;right: -10rpx;bottom: -10rpx;left: -10rpx;'
class='inset-0' => 'top: 0rpx;right: 0rpx;bottom: 0rpx;left: 0rpx;'
class='inset-0.5' => 'top: 0.5rpx;right: 0.5rpx;bottom: 0.5rpx;left: 0.5rpx;'
class='inset-.5' => 'top: .5rpx;right: .5rpx;bottom: .5rpx;left: .5rpx;'

class='b-10.10' => 'bottom:10.10rpx;'
class='r-10.10' => 'right:10.10rpx;'
class='l-10.10' => 'left:10.10rpx;'

```

### display
```js
class='flex' => 'display: flex;'
class='grid' => 'display: grid;'
class='none' => 'display: none;'
class='block' => 'display: block;'
```

### 字体
```js
class='fs-25' => 'font-size: 25rpx;'
class='fs-w25' => // 匹配不到 不会生成样式
class='fs-' => // 匹配不到 不会生成样式
```

### 颜色
```js
class='c-#111' => 'color:#111111;'
class='c-#1' => 'color:#111111;'
class='c-#1111111' => // 匹配不到 不会生成样式
class='c-#' => // 匹配不到 不会生成样式
class='c-#d23' => 'color:#d23d23;'
class='c-#d2' => 'color:#d2d2d2;'
class='c-#d' => 'color:#dddddd;'
class='c-#0' => 'color:#000000;'
class='c-red' => 'color:red;'

class='c-cur' => 'color:currentcolor;'
class='c-initial' => 'color:initial;'

class='bg-#111' => 'background-color:#111111;'
class='bg-#d23' => 'background-color:#d23d23;'
class='bg-#d2' => 'background-color:#d2d2d2;'
class='bg-#d' => 'background-color:#dddddd;'
class='bg-#0' => 'background-color:#000000;'
class='bg-red' => 'background-color:red;'

class='rgba-1-2-3-4' => 'color:rgba(1,2,3,.4);'
class='rgba-1-2-3-0.6' => 'color:rgba(1,2,3,0.6);'
class='rgba-1-2-3-.6' => 'color:rgba(1,2,3,.6);'

class='gba-10-222-256' => 'color:rgba(10,222,256);'

```

### 超出省略
```js
class='line-1' => '-webkit-line-clamp: 1;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;'
class='line-5' => '-webkit-line-clamp: 5;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;'
```

### 边距
```js
class='m-10' => 'margin:10rpx;'
class='m-4-40' => 'margin:4rpx 40rpx;'
class='m-10-auto' => 'margin:10rpx auto;'
class='m-4-40-0-9' => 'margin:4rpx 40rpx 0rpx 9rpx;'
class='mt-20' => 'margin-top:20rpx;'
class='mb-20' => 'margin-bottom:20rpx;'
class='ml-20' => 'margin-left:20rpx;'
class='mr-20' => 'margin-right:20rpx;'
class='mlr-20' => 'margin-left:20rpx;margin-right:20rpx;'
class='mtb-20' => 'margin-top:20rpx;margin-bottom:20rpx;'

class='mtb-20.5' => 'margin-top:20.5rpx;margin-bottom:20.5rpx;'

class='p-10' => 'padding:10rpx;'
class='p-4-40' => 'padding:4rpx 40rpx;'
class='p-10-auto' => 'padding:10rpx auto;'
class='p-4-40-0-9' => 'padding:4rpx 40rpx 0rpx 9rpx;'
class='pt-20' => 'padding-top:20rpx;'
class='pb-20' => 'padding-bottom:20rpx;'
class='pl-20' => 'padding-left:20rpx;'
class='pr-20' => 'padding-right:20rpx;'
class='plr-20' => 'padding-left:20rpx;padding-right:20rpx;'
class='ptb-20' => 'padding-top:20rpx;padding-bottom:20rpx;'

class='ptb-20.5' => 'padding-top:20.5rpx;padding-bottom:20.5rpx;'

```

### 宽高
```js
class='width-100' => 'width:100rpx;'
class='width-100vh' => 'width:100vh;'
class='width-100vw' => 'width:100vw;'
class='width-100%' => 'width:100%;'
class='width-50%' => 'width:50%;'
class='w-100' => 'width:100rpx;'
class='w-100vh' => 'width:100vh;'
class='w-100vw' => 'width:100vw;'
class='w-100%' => 'width:100%;'
class='w-50%' => 'width:50%;'

class='w-1.5' => 'width:1.5rpx;'
class='w-.5' => 'width:.5rpx;'
class='w-10.5' => 'width:10.5rpx;'

class='height-100' => 'height:100rpx;'
class='height-100vh' => 'height:100vh;'
class='height-100vw' => 'height:100vw;'
class='height-100%' => 'height:100%;'
class='height-50%' => 'height:50%;'
class='h-100' => 'height:100rpx;'
class='h-100vh' => 'height:100vh;'
class='h-100vw' => 'height:100vw;'
class='h-100%' => 'height:100%;'
class='h-50%' => 'height:50%;'

class='h-1.5' => 'height:1.5rpx;'
class='h-.5' => 'height:.5rpx;'
class='h-10.5' => 'height:10.5rpx;'
  ```

### 鼠标样式
```js
class='poiter' => 'cursor: pointer;'
```