import { defineConfig } from 'vitest/config'
import { alias } from './alias'

export default defineConfig({
  // optimizeDeps: {
  //   entries: [],
  // },
  resolve: {
    alias,
  },
  // test: {
  //   setupFiles: ['./test/setup.ts'],
  // },
})
// https://blog.csdn.net/weixin_44691608/article/details/122379051