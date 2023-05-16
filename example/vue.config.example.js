const { allin } = require("all-in-class");
const { cssRule } = require("./rules.example");

module.exports = {
  configureWebpack: {
    plugins: [
      allin({
        // 配置规则
        rules: cssRule().rules, //一个包含规则的数组
        shortcuts: [], //一个包含快捷方式的数组
        preset: [], //预设
      }),
    ],
  },
};
