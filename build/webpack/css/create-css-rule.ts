import { RuleSetUse, RuleSetQuery, RuleSetCondition } from 'webpack';
import { resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { getPostcssOption } from './postcss-options';

export function createCSSRule(
  test: RuleSetCondition,
  loader?: string,
  options?: RuleSetQuery
) {
  const isProd = process.env.NODE_ENV === 'production';
  const localIdentName = isProd ? '[hash:base64]' : '[path][name]__[local]';

  // 默认配置
  const use: RuleSetUse = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: !isProd,
      },
    },
    // 自动给样式文件生成 .d.ts 文件
    {
      loader: 'css-modules-typescript-loader',
      options: {
        mode: 'emit',
        // mode: isOnCI ? 'verify' : 'emit',
      },
    },
    {
      loader: 'css-loader',
      options: {
        modules: {
          mode: 'local',
          context: resolve(__dirname, '..', '..', '..', 'src'),
          localIdentName,
        },
        localsConvention: 'camelCaseOnly',
        importLoaders: 0,
        sourceMap: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: getPostcssOption({ sourceMap: true }),
    },
  ];

  // 预处理器
  if (loader) {
    use.push({ loader, options });
  }

  return { test, use };
}
