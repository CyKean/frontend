// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     proxy: "http://localhost:3000",
//   },
// });
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: process.env.NODE_ENV === 'production' ? undefined : "http://localhost:3000",
  },
});
