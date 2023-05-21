import vitePlugin from '../vite/index.js'
import vitepress from '../vitepress/vitepress.js'
import webpack from '../webpack/webpack.js'
import { getEnv, cacheUserConfig } from './envInfo.js'
import { error } from './index.js'

// 策略模式
export const plugins = {
  webpack: userConfig => new webpack(userConfig),
  vite: userConfig => vitePlugin(userConfig),
  vitepress: userConfig => vitepress(userConfig),
  rollup: userConfig => new vitePlugin(userConfig),
  esbuild: userConfig => new vitePlugin(userConfig)
}

export const getPlugin = userConfig => {
  cacheUserConfig(userConfig)
  const framework = userConfig.framework || getEnv().packFramework
  if (plugins[framework]) {
    return plugins[framework](userConfig)
  }

  // 报错
  error(`${framework}不支持，仅支持${Object.keys(plugins)}`)
}
