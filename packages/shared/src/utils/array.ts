import { isArray } from './is'

export function toArray(value = []) {
  return isArray(value) ? value : [value]
}
export const unique = (array: Array<any>) => Array.from(new Set(array))

export function noop() {}

export const remove = (arr: Array<any>, el: any) => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}
