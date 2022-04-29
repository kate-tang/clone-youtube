const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "src/assets/scss/style.scss";
        `
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/clone-youtube/' : '/'
})
