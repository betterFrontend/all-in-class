import { PLUGIN_PREFIX } from "../constant"



const factory = (name) => (value) => Object.prototype.toString.call(value) === `[object ${name}]`
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
export const isFunction = (value) => factory('Function')(value) || isAsyncFunction(value)

export function toArray(value = []) {
	return isArray(value) ? value : [value]
}

export const toNoRepeatArray = (value) => Array.from(new Set(value))

export function noop() { }

const consoleFactory = (name) => (msg) => console.warn(`[${PLUGIN_PREFIX}]`, msg)
export const warn = consoleFactory('warn')
export const log = consoleFactory('log')
export const error = consoleFactory('error')