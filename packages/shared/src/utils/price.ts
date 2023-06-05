export const formatPrice = (price: number, len = 2) => {
  if (Number.isInteger(price)) {
    // 如果是整数，则直接返回
    return price
  }

  // 如果是浮点数，则格式化为最多len（两位）小数的字符串
  return Number(price.toFixed(len).replace(/\.?0+$/, ''))
}
