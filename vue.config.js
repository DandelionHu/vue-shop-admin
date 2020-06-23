const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/css/variable.less')
      ]
    }
  },
  devServer: {
    port: 8082,
    proxy: 'http://timemeetyou.com:8889/api/private/v1/'
  },
}
