import { unique } from './array'

export function isAllUpperCase(str: string) {
  return str === str.toUpperCase()
}

// 将字符串转为小驼峰命名法（camelCase）
export function toCamelCase(str: string) {
  return str.replace(/[-_\.\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
}

// 将字符串转为大驼峰命名法（PascalCase）
export function toPascalCase(str: string) {
  return str
    .replace(/[-_\.\s]+(\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, c => c.toUpperCase())
}

// 将字符串转为下划线命名法（snake_case）
export function toSnakeCase(str: string) {
  return str.replace(/[-\.\s]/g, '_').toLowerCase()
}

// 将字符串转为下划线命名法（aa_bb_cc）
function upperToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, match => '_' + match.toLowerCase())
}

// 将字符串转为全大写形式
export function toUpperCase(str: string) {
  return str.toUpperCase()
}

// 将字符串转为全小写形式
export function toLowerCase(str: string) {
  return str.toLowerCase()
}

// 将字符串转为全大写形式
export function toPureUpperCase(str: string) {
  return str.replace(/[-_\.\s]+/g, '').toUpperCase()
}
// 将字符串转为全小写形式
export function toPureLowerCase(str: string) {
  return str.replace(/[-_\.\s]+/g, '').toLowerCase()
}

// 将字符串转换为下划线格式（所有单词小写，单词之间用下划线连接）
export function toUnderscoreCase(str: string) {
  return str.replace(/[-_\.\s]+/g, '_').toLowerCase()
}
// 将字符串转为中划线命名法（kebab-case）
export function toKebabCase(str: string) {
  return str.replace(/[-_\.\s]+/g, '-').toLowerCase()
}

export function transformCase(str: string) {
  return unique([
    toCamelCase(str),
    toPascalCase(str),
    toUnderscoreCase(str),
    toUnderscoreCase(str).toUpperCase(),
    toKebabCase(str),
    toKebabCase(str).toUpperCase(),
    toUpperCase(str),
    toLowerCase(str),
    toPureUpperCase(str),
    toPureLowerCase(str)
  ])
}

// 把所有格式转换为空格格式
export function convertToWords(str: string) {
  if (isAllUpperCase(str)) {
    str = str.toLowerCase()
  }
  return str
    .replace(/[-\._\s]/g, ' ') // 将中划线和下划线替换为空格
    .replace(/[a-z][A-Z]/g, function (match) {
      return match.charAt(0) + ' ' + match.charAt(1) // 在小驼峰和大驼峰的单词分隔点处插入空格
    })
    .replace(/[A-Z]+/g, function (match) {
      return ' ' + match.toLowerCase() // 将大写字母单词转换为小写字母单词，并在前面插入空格
    })
    .replace(/\s+/g, ' ') // 去除多余的空格
    .trim() // 去除字符串两端的空格
}
