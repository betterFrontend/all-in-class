export function presetRules(config = {}) {
  return {
    rules: [] as any,
    composition: [
      // 后缀为i时 给class添加权重
      [
        /(.*)-i(\d*)$/,
        (match: RegExpMatchArray, getValue: Function) => {
          const val: string = getValue(match[1])
          // console.log('==== val :', val);
          // 返回方法，为了区分内置的还是用户的，需要重构
          return () => val
        }
      ]
    ]
  }
}
