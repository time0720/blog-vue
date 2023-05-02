const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭语法检查
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.js'
    }
  },
  //开启代理服务器
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        pathRewrite: {'^/api' : ''},
        ws: false,
        changeOrigin: true
      }
    },
    //添加后， WebSocket 就不会报错了
    client: {
      // 注意这里要换成当前的端口port，否则会一直刷新页面
      webSocketURL: 'ws://0.0.0.0:8081/ws'
    }
  }
})
