import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { getCssLoaderOption } from './css/css-loader-options';
import { getPostcssOption } from './css/postcss-options';

import config from '../../config/webpack/base';

const genAssetSubPath = (dir: string) => `${dir}/[name].[hash:8]`;

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
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].bundle.js',
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
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV !== 'production',
            },
          },
          {
            loader: 'css-modules-typescript-loader',
            options: {
              mode: 'emit',
              // mode: isOnCI ? 'verify' : 'emit',
            },
          },
          {
            loader: 'css-loader',
            options: getCssLoaderOption({ hashOutput: false, sourceMap: true }),
          },
          {
            loader: 'postcss-loader',
            options: getPostcssOption({ sourceMap: true }),
          },
        ],
      },
      // {
      //     test: /\.js$/,
      //     loader: 'babel-loader',
      //     exclude: file => /node_modules/.test(file) && !/\.js/.test(file)
      // },

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
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: 'css/[name].[chunkhash:8].css',
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
