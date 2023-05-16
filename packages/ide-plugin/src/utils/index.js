import { PLUGIN_PREFIX } from "../constants"



const factory = (name) => {
	return (value) => Object.prototype.toString.call(value) === `[object ${name}]`
}
export const isNull = factory('Null')
export const isObject = factory('Object')
export const isArray = factory('Array')
export const isMap = factory('Map')
export const isSet = factory('Set')
export const isPromise = factory('Promise')
export const isAsyncFunction = factory('AsyncFunction')

export const isString = (value) => typeof value === 'string'
export const notNull = (value) => value !== null
export const isEmpty = (value) => value !== null || value !== undefined || value !== ''
export const isFunction = (value) =>  factory('Function')(value)||isAsyncFunction(value)

// :07:24.253 ==== fun : [AsyncFunction (anonymous)]
// 15:07:24.254 ==== isFunction(fun) : false
// 15:07:24.264 ==== Object.prototype.toString.call(fun) : [object AsyncFunction]
// 15:07:24.276 ==== pre : [AsyncFunction (anonymous)],

export function toArray(value = []) {
	return isArray(value) ? value : [value]
}

export const toNoRepeatArray = (value) => Array.from(new Set(value))

export function noop() {}


// const warned = new Set()
// export function warnOnce(msg) {
//   if (warned.has(msg)) return
//   console.warn('[odcss]', msg)
//   warned.add(msg)
// }

export function warn(msg) {
	console.warn(`[${PLUGIN_PREFIX}]`, msg)
}
export function error(msg) {
	console.error(`[${PLUGIN_PREFIX}]`, msg)
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
