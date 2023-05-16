import { defineConfig } from "vite";
import allin from "all-in-class";
import { cssRule } from "./rules.example";

export default defineConfig({
  plugins: [
    // ...其他插件
    allin({
      // 配置规则
      rules: cssRule().rules, //一个包含规则的数组
      shortcuts: [], //一个包含快捷方式的数组
      preset: [], //预设
    }),
  ],
  //  ...其他插件
});
