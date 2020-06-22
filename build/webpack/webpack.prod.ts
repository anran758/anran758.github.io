import webpack from 'webpack';
import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import webpackCommonConf from './webpack.base';
import config from '../../config/webpack/prod';

const webpackProdConf: webpack.Configuration = {
  mode: 'production',

  // https://webpack.docschina.org/configuration/devtool/
  devtool: config.devtool || false,
  optimization: {
    minimize: true,
    minimizer: [
      // 使用 terser 来缩小 JavaScript
      // https://webpack.docschina.org/plugins/terser-webpack-plugin/
      new TerserPlugin({
        cache: '.cache/',
        parallel: true,
        sourceMap: true,
        extractComments: false,

        // 压缩选项: https://github.com/terser/terser#compress-options
        terserOptions: {
          warnings: false,
          output: {
            comments: false,
          },
        },
      }),

      // 压缩 css 资源
      // https://github.com/NMFR/optimize-css-assets-webpack-plugin
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
        canPrint: true,
      }),
    ],

    // https://imweb.io/topic/5b66dd601402769b60847149
    splitChunks: {
      cacheGroups: {
        // 针对 node_modules
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          // 抽取权重，数字越大表示优先级越高
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          // 使用已有的 chunk
          reuseExistingChunk: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          priority: 10,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.template,
      inject: true,
      // 目前直接将 favicon 嵌入模板
      // favicon: config.favicon,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),

    // 根据模块的相对路径生成一个四位数的hash作为模块id
    // https://webpack.js.org/plugins/hashed-module-ids-plugin/
    new webpack.HashedModuleIdsPlugin(),
  ],
};

if (config.banner) {
  webpackProdConf.plugins!.push(new webpack.BannerPlugin(config.banner));
}

export default merge(webpackCommonConf, webpackProdConf);
