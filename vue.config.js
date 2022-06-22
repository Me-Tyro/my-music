module.exports = {
  devServer: {
    // 使用代理
    proxy: {
      '/api': {
        // 目标路径
        target: 'http://www.codeman.ink:3000',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        // 重写路径
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
