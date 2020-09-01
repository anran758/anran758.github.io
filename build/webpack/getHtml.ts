import { Configuration, Entry } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import path from 'path';
import fs from 'fs';

import { readdirSync, getSrcPath, isProd } from '../utils';
import { getWebpackConf } from '../../config/webpack';

const conf = getWebpackConf();
const srcPath = getSrcPath();

const IGNORE_FILENAME = ['images'];
const TEMP_EXTENSION = ['.html'];
const ENTRY_EXTENSION = ['.js', '.ts', '.tsx'];

/**
 * 转为源码的相对路径
 */
function replaceSrcPath(filePath: string) {
  const prefixPath =
    srcPath[srcPath.length - 1] !== '/' ? `${srcPath}/` : srcPath;

  return filePath.replace(prefixPath, '');
}

/**
 * 获取 HTML 相关的配置
 */
export function getHtmlConf(targetPath: string) {
  let webpackConf: Configuration = {
    entry: {},
    plugins: [],
  };

  // 读取指定目录下的文件
  readdirSync(targetPath).forEach((filename) => {
    // 不处理忽略文件
    if (IGNORE_FILENAME.includes(filename)) return;

    const filePath = path.resolve(targetPath, filename);
    const stats = fs.statSync(filePath);

    // 文件夹，递归合并配置
    if (stats.isDirectory()) {
      webpackConf = merge(webpackConf, getHtmlConf(filePath));
      return;
    }
    if (!stats.isFile()) return;

    const extension = path.extname(filename).toLowerCase();
    // 文件所在源码目录的相对路径作为 chunkname
    const relativePath = replaceSrcPath(targetPath);

    // 处理模板文件
    if (TEMP_EXTENSION.includes(extension)) {
      webpackConf.plugins?.push(
        new HtmlWebpackPlugin({
          filename: `${relativePath}/${filename}`,
          inject: true,

          // 只包含 common 以及自己的那一个 chunk
          chunks: ['common', relativePath],

          // 目前逻辑是: 该文件是模板的话，那一定能获取到该文件的资源
          // x 如果存在模板，就使用模板。优先使用本地模板
          // x 如果不存在模板，则通过 plugins 生成
          ...(filePath ? { template: filePath } : { title: 'Document' }),
        })
      );
      return;
    }

    // 处理入口文件
    if (ENTRY_EXTENSION.includes(extension)) {
      (webpackConf.entry as Entry)[relativePath] = filePath;
    }
  });

  return webpackConf;
}

/**
 * 生成 HTML 相关配置
 */
export function getHtmlWebpackPlugin() {
  // Tips: 目前采取的方案是直接将示例拷贝到输出目录，因此暂时用不到 webpack 多页面方案
  // const demosConf = getHtmlConf(getSrcPath('Demos'));

  return {
    plugins: [
      // 简化 HTML 文件的创建
      // https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: conf.template,
        favicon: conf.favicon,
        ...(isProd
          ? {
              inject: true,
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
              },
            }
          : {}),
      }),
    ],
  };
}
