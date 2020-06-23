import path from 'path';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import { createCSSRule } from './css/create-css-rule';

import config from '../../config/webpack/base';

/**
 * 生成相对资源目录的路径
 */
const genStaticPath = (...relativePaths: string[]) =>
  path.join(config.staticDir, ...relativePaths);

const genAssetSubPath = (dir: string) =>
  genStaticPath(`${dir}/[name].[hash:8].[ext]`);

const getCopyRootFileOpt = (filename: string) => ({
  from: path.join(__dirname, '..', '..', filename),
  to: path.join(config.buildRoot),
});

/**
 * 生成 url loader 选项
 */
const genUrlLoaderOptions = (dir: string) => ({
  // 指定当目标文件的大小超过 limit 选项中设置的限制时, 使用的备用 loader 解析
  limit: 4096,
  name: genAssetSubPath(dir),
});

const webpackConfig: Configuration = {
  entry: config.entry,
  output: {
    path: config.buildRoot,
    publicPath: config.publicPath,
    filename: genStaticPath('js/[name].[hash].js'),
    chunkFilename: genStaticPath('js/[name].bundle.js'),
  },
  resolve: {
    // 自动解析确定的扩展
    extensions: ['.js', '.ts', '.tsx'],
    alias: config.commonAlias,
  },
  externals: config.externals,
  module: {
    rules: [
      {
        // https://github.com/TypeStrong/ts-loader
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },

      createCSSRule(/\.css$/),
      createCSSRule(/\.less$/, 'less-loader'),

      // 图片资源
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: genUrlLoaderOptions('img'),
        },
      },

      // svg 不转为 base64
      // 除此之外还可以通过 raw-loader 获取 svg 的文本，但该选项会不会跟 file-loader 有冲突还需确认
      {
        test: /\.(svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: genAssetSubPath('img'),
          },
        },
      },

      // 媒体资源
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: genUrlLoaderOptions('media'),
        },
      },

      // fonts
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: {
          loader: 'url-loader',
          options: genUrlLoaderOptions('fonts'),
        },
      },
    ],
  },
  plugins: [
    // 将 CSS 提取到单独的文件
    // https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: genStaticPath('css/[name].[chunkhash:8].css'),
      chunkFilename: genStaticPath('css/[name].[chunkhash:8].css'),
    }),

    // 拷贝资源
    // https://github.com/webpack-contrib/copy-webpack-plugin
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(config.sourceRoot, config.staticDir),
          to: path.join(config.buildRoot, config.staticDir),
          toType: 'dir',
        },
        getCopyRootFileOpt('README.md'),
        getCopyRootFileOpt('LICENSE'),
      ],
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

export default webpackConfig;
