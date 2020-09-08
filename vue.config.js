module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'https://autumnfish.cn/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
}
