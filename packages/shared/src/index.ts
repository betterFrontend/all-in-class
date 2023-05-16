export * from './constant/index'
export * from './style/index'
export * from './utils/index'

import { PLUGIN_PREFIX } from "./constant/index"

const factory = (name: string): Function =>  (val: any): boolean  => Object.prototype.toString.call(val) === `[object ${name}]`
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
export const isEmpty = (value: any) => value === null || value === undefined || value === ''

export const isArray = Array.isArray
export const extend = Object.assign

export function isPromise(val: any) {
	// 根据 Promise/A+ 规范，一个对象被视为 Promise 对象，需要满足以下条件：
	// 该对象必须是一个对象或函数，
	return isObject(val) &&
		// 该对象必须具有 then 方法，其类型为函数。具有 catch 方法，其类型为函数。
		isFunction(val.then) && isFunction(val.catch) &&
		// 该对象必须具有一个状态属性，该状态属性只能是以下三种状态之一：pending（等待中）、fulfilled（已完成）或 rejected（已拒绝）。
		isString(val.status) && ['pending', 'fulfilled', 'rejected'].includes(val.status) &&
		// 该对象必须具有一个 thenable 属性，该属性必须是一个函数或对象，它的行为类似于 Promise 对象。
		(isObject(val.thenable) || isFunction(val.thenable))
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwnProp = (obj:object, key:string) => hasOwnProperty.call(obj, key)

export function toArray(value = []) {
	return isArray(value) ? value : [value]
}
export const unique = (array: Array<any>) => Array.from(new Set(array))

// export const toNoRepeatArray = (value) => Array.from(new Set(value))
export function noop() {}

// const warned = new Set()
// export function warnOnce(msg) {
//   if (warned.has(msg)) return
//   console.warn('[odcss]', msg)
//   warned.add(msg)
// }

export function warn(msg:string) {
	console.warn(`[${PLUGIN_PREFIX}]`, msg)
}
export function error(msg:string) {
	console.error(`[${PLUGIN_PREFIX}]`, msg)
}

export const remove = (arr: Array<any>, el:any) => {
	const i = arr.indexOf(el)
	if (i > -1) {
		arr.splice(i, 1)
	}
}



// export function mergeDeep<T>(original: T, patch: DeepPartial<T>): T {
//   const o = original as any
//   const p = patch as any

//   if (Array.isArray(o))
//     return [...p] as any

//   const output = { ...o }
//   if (isObject(o) && isObject(p)) {
//     Object.keys(p).forEach((key) => {
//       if (((isObject(o[key]) && isObject(p[key])) || (Array.isArray(o[key]) && Array.isArray(p[key]))))
//         output[key] = mergeDeep(o[key], p[key])
//       else
//         Object.assign(output, { [key]: p[key] })
//     })
//   }
//   return output
// }

// export function clone<T>(val: T): T {
//   let k: any, out: any, tmp: any

//   if (Array.isArray(val)) {
//     out = Array(k = val.length)
//     // eslint-disable-next-line no-cond-assign
//     while (k--) out[k] = ((tmp = val[k]) && typeof tmp === 'object') ? clone(tmp) : tmp
//     return out as any
//   }

//   if (Object.prototype.toString.call(val) === '[object Object]') {
//     out = {} // null
//     for (k in val) {
//       if (k === '__proto__') {
//         Object.defineProperty(out, k, {
//           value: clone((val as any)[k]),
//           configurable: true,
//           enumerable: true,
//           writable: true,
//         })
//       }
//       else {
//         // eslint-disable-next-line no-cond-assign
//         out[k] = ((tmp = (val as any)[k]) && typeof tmp === 'object') ? clone(tmp) : tmp
//       }
//     }
//     return out
//   }

//   return val
// }
