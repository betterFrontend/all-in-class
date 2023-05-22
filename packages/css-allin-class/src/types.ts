export interface EnvInfo {
  isUniapp: boolean
  uniappPlatfrom: string
  projectRoot: string
  packFramework: string
  vueVersion: number
  env: string
  isCli: boolean
  outputDir: string
  configPath: string
  join: string
  userConfig: UserConfig
}
export interface UserConfig {
  prefix?: string
  suffix?: string
  unit?: string
  rules?: string
}

export interface StaticRules {
  [propname: string]: string
}
export interface DynamicRules {
  [propname: string]: [RegExp, Function]
}

export interface Direction {
  [key: string]: string
  t: 'top'
  b: 'bottom'
  l: 'left'
  r: 'right'
  tr: 'top-right'
  tl: 'top-left'
  bl: 'bottom-left'
  br: 'bottom-right'
}
export interface Config {
  unit: string
}
