// const CONFIG_GLOB = '{vite.config,tailwind.config,tailwind.*.config,vite.config.*}.{js,cjs}'
export const CONFIG_GLOB = "{tailwind,vite.config}.{js,cjs}";
export const PACKAGE_LOCK_GLOB = '{package-lock.json,yarn.lock,pnpm-lock.yaml}'
export const CSS_GLOB = '*.{css,scss,sass,less,pcss}'

export const PLUGIN_NAME = 'unplugin-prefixed-uncssuncss'
export const PLUGIN_PREFIX = 'VUECSS'
export const POLYFILL_ID = 'vuecss.css'
export const CSS_PLACE_HOLDER_KEY = '#VUECSS_CSS_PLACE_HOLDER_KEY{color:red}'