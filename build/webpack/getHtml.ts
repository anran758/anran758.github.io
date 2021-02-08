import { Configuration, Entry } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import path from 'path';
import fs from 'fs';

import { readdirSync, getSrcPath, isProd } from '../utils';
import { getWebpackConf } from '../../config/webpack';

const conf = getWebpackConf();

const IGNORE_FILENAME: Array<string | RegExp> = ['images', '_common', /\.d.(j|t)s/i];
const TEMP_EXTENSION = ['.html'];
const ENTRY_EXTENSION = ['.js', '.ts', '.tsx'];

/**
 * 获取 HTML 相关的配置
 *
 * @param targetPath 绝对路径的目录
 */
export function getHtmlConf(targetPath: string, basePath = '') {
  let webpackConf: Configuration = {
    entry: {},
    plugins: [],
  };

  // 读取指定目录下的文件
  readdirSync(targetPath)
    .filter(
      (filename) =>
        !IGNORE_FILENAME.some((rule) => {
          if (typeof rule === 'string') {
            return filename === rule;
          }

          const result = rule.test(filename);
          rule.lastIndex = 0;

          return result;
        })
    )
    .forEach((filename) => {
      // filePath 是绝对路径
      const filePath = path.resolve(targetPath, filename);
      const stats = fs.statSync(filePath);

      /**
       * handling folder types: 递归合并配置
       */
      if (stats.isDirectory()) {
        const currentKey = `${basePath}/${filename}`;
        webpackConf = merge(getHtmlConf(filePath, currentKey), webpackConf);
        return;
      }
      if (!stats.isFile()) return;

      const ext = path.extname(filename).toLowerCase();
      const name = filename.substring(0, filename.length - ext.length);
      const chunName = `${basePath}/${name}`;

      // handling entry file
      if (ENTRY_EXTENSION.includes(ext)) {
        (webpackConf.entry as Entry)[chunName] = filePath;
        return;
      }

      // handing template
      if (TEMP_EXTENSION.includes(ext)) {
        webpackConf.plugins?.push(
          new HtmlWebpackPlugin({
            filename: `${basePath}/${filename}`,
            inject: true,

            // 只包含 common 以及自己的那一个 chunk
            chunks: [chunName],
            // chunks: ['common', webpackConf.entry![chunName] ? chunName : ''].filter(
            //   (item) => item
            // ),

            // 目前逻辑是: 该文件是模板的话，那一定能获取到该文件的资源
            // x 如果存在模板，就使用模板。优先使用本地模板
            // x 如果不存在模板，则通过 plugins 生成
            ...(filePath ? { template: filePath } : { title: 'Template' }),
          })
        );
      }
    });

  return webpackConf;
}

/**
 * 生成 HTML 相关配置
 */
export function getHtmlWebpackPlugin() {
  // Tips: 目前采取的方案是直接将示例拷贝到输出目录，因此暂时用不到 webpack 多页面方案
  const demoFolderPath = getSrcPath(conf.demosDir);
  const demosConf = getHtmlConf(demoFolderPath, conf.demosDir);

  return merge(demosConf, {
    plugins: [
      // 简化 HTML 文件的创建
      // https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: conf.template,
        favicon: conf.favicon,
        chunks: ['pages/app/index'],
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
  });
}
