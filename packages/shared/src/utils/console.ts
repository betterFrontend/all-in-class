import { PLUGIN_PREFIX } from '../constant/index'

export function warn(msg: string) {
  console.warn(`[${PLUGIN_PREFIX}]`, msg)
}
export function error(msg: string) {
  console.error(`[${PLUGIN_PREFIX}]`, msg)
}
