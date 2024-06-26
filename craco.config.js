//添加自定义对于webpack的配置

const path = require('path')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    }
  }

}

// webpack.config.js
//import HtmlWebpackPlugin from 'html-webpack-plugin'

