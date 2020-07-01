/*
 * @Date: 2020-05-29 14:31:03
 * @LastEditTime: 2020-07-01 15:57:19
 */

const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const utils = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = webpackMerge(baseWebpackConfig, {
  // 指定构建环境
  mode: "development",
  // 插件
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        BASE_API: '"/api"',
        FILE_URL: '"/file"',
      },
    }),
    new HtmlWebpackPlugin({
      filename: utils.resolve("./../dist/index.html"), // html模板的生成路径
      template: "index.html", //html模板
      inject: true, // true：默认值，script标签位于html文件的 body 底部
    }),
  ],
  // 开发环境本地启动的服务配置
  devServer: {
    historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
    hot: true,
    contentBase: false, // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
    compress: true, // 一切服务都启用gzip 压缩：
    port: "8081", // 指定段靠谱
    publicPath: "/", // 访问资源加前缀
    proxy: {
      // 接口请求代理
      "/api": {
        target: "http://101.132.39.136:9001/",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
      "/file": {
        target: "http://101.132.39.136:9080/",
        changeOrigin: true,
        pathRewrite: {
          "^/file": "",
        },
      },
    },
  },
});
