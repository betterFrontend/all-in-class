import { PLUGIN_PREFIX } from "../constant/index"



const factory =  (name: string) => (value: any) => Object.prototype.toString.call(value) === `[object ${name}]`
export const isNull = factory('Null')
export const isObject = factory('Object')
export const isArray = factory('Array')
export const isMap = factory('Map')
export const isSet = factory('Set')
export const isPromise = factory('Promise')
export const isAsyncFunction = factory('AsyncFunction')

export const isString = (value: any) => typeof value === 'string'
export const notNull = (value: any) => value !== null
export const isEmpty = (value: any) => value !== null || value !== undefined || value !== ''
export const isFunction = (value: any) => factory('Function')(value) || isAsyncFunction(value)

export function toArray(value = []) {
	return isArray(value) ? value : [value]
}

export const toNoRepeatArray = (value: any) => Array.from(new Set(value))

export function noop() { }

const consoleFactory = (name: string) => (msg: string) => console.warn(`[${PLUGIN_PREFIX}]`, msg)
export const warn = consoleFactory('warn')
export const log = consoleFactory('log')
export const error = consoleFactory('error')