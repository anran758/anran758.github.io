import webpack, { Configuration } from 'webpack';
import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import webpackConf from './webpack.base';
import config from '../../config/webpack/dev';

const webpackDevConf: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    // contentBase: config.buildRoot,
    compress: false,
    open: false,
    ...config.devServer,
  },
  plugins: [
    // 可简化 HTML 文件的创建
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.template,
      favicon: config.favicon,
    }),

    // 强制要求 webpack 区分大小写
    // 缓解有些操作系统需要正确使用大小写而应发冲突的情况
    // https://github.com/Urthen/case-sensitive-paths-webpack-plugin
    new CaseSensitivePathsPlugin(),

    // 更友好的 webpack 错误提示插件
    // https://github.com/geowarin/friendly-errors-webpack-plugin
    new FriendlyErrorsPlugin(),

    // 启用热替换模块
    // https://webpack.js.org/plugins/hot-module-replacement-plugin/
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    noEmitOnErrors: true,
  },
};

// 是否开启构建依赖包分析
// https://github.com/webpack-contrib/webpack-bundle-analyzer
if (process.env.ANALYZE) {
  const analyze = new BundleAnalyzerPlugin(config.analyzerOpts);
  webpackDevConf.plugins ? webpackDevConf.plugins.push(analyze) : [analyze];
}

export default merge(webpackConf, webpackDevConf);
