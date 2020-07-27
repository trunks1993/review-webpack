/*
 * @Date: 2020-05-29 14:31:35
 * @LastEditTime: 2020-07-27 19:01:51
 */

const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const utils = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// 构建速度分析
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// css压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = webpackMerge(baseWebpackConfig, {
  // 指定构建环境
  mode: "production",
  // 插件
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        BASE_API: '"/api"',
        FILE_URL: '"/file"',
      },
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: utils.resolve("./../dist/index.html"), // html模板的生成路径
      template: "index.html", //html模板
      inject: true, // true：默认值，script标签位于html文件的 body 底部
      hash: true, // 在打包的资源插入html会加上hash
      //  html 文件进行压缩
      minify: {
        removeComments: true, //去注释
        collapseWhitespace: true, //压缩空格
        removeAttributeQuotes: true, //去除属性引用
      },
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.scss$/g,
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
    ],
  },
});

module.exports = smp.wrap(config);
