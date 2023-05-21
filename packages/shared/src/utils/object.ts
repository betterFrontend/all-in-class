const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwnProp = (obj: object, key: string) =>
  hasOwnProperty.call(obj, key)

export const extend = Object.assign
