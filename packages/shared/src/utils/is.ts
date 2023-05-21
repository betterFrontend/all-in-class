const factory =
  (name: string): Function =>
  (val: any): boolean =>
    Object.prototype.toString.call(val) === `[object ${name}]`
export const isMap = factory('Map')
export const isSet = factory('Set')
export const isAsyncFunction = factory('AsyncFunction')
export const isRegExp = factory('RegExp')
export const isDate = factory('Date')
export const isPlainObject = factory('Object')

export const isFunction = (val: any) => typeof val === 'function'
export const isString = (val: any) => typeof val === 'string'
export const isSymbol = (val: any) => typeof val === 'symbol'
export const isObject = (val: any) => val !== null && typeof val === 'object'
export const isEmpty = (value: any) =>
  value === null || value === undefined || value === ''

export const isArray = Array.isArray

export function isPromise(val: any) {
  // 根据 Promise/A+ 规范，一个对象被视为 Promise 对象，需要满足以下条件：
  // 该对象必须是一个对象或函数，
  return (
    isObject(val) &&
    // 该对象必须具有 then 方法，其类型为函数。具有 catch 方法，其类型为函数。
    isFunction(val.then) &&
    isFunction(val.catch) &&
    // 该对象必须具有一个状态属性，该状态属性只能是以下三种状态之一：pending（等待中）、fulfilled（已完成）或 rejected（已拒绝）。
    isString(val.status) &&
    ['pending', 'fulfilled', 'rejected'].includes(val.status) &&
    // 该对象必须具有一个 thenable 属性，该属性必须是一个函数或对象，它的行为类似于 Promise 对象。
    (isObject(val.thenable) || isFunction(val.thenable))
  )
}
