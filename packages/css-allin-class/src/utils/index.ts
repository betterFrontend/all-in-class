import { PLUGIN_PREFIX } from '../constant/index'

const factory = (name: string) => (value: unknown) =>
  Object.prototype.toString.call(value) === `[object ${name}]`
export const isNull = factory('Null')
export const isObject = factory('Object')
// export const isObject = (value: any): value is Object =>
//   Object.prototype.toString.call(value) === `[object Object]`

export const isArray = factory('Array')
export const isMap = factory('Map')
export const isSet = factory('Set')
export const isPromise = factory('Promise')
export const isAsyncFunction = factory('AsyncFunction')

export const isString = (value: unknown) => typeof value === 'string'
export const notNull = (value: unknown) => value !== null
export const isEmpty = (value: unknown) =>
  value !== null || value !== undefined || value !== ''
export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'

export function toArray(value = []) {
  return isArray(value) ? value : [value]
}

export const toNoRepeatArray = (value: any) => Array.from(new Set(value))

export function noop() {}

const consoleFactory = (name: string) => (msg: string) =>
  console.warn(`[${PLUGIN_PREFIX}]`, msg)
export const warn = consoleFactory('warn')
export const log = consoleFactory('log')
export const error = consoleFactory('error')
