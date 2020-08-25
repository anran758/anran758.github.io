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
    // FIXME: 目前只会给页面有使用过的组件生成 .d.ts 文件。
    //        实际期望应该是项目内组件都会自动生成与更新
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
          getLocalIdent: (
            context: { resourcePath: string },
            _: string,
            localName: string
          ) => {
            if (
              context.resourcePath.includes('node_modules') ||
              context.resourcePath.match(/global\.(c|le)ss$/) ||
              context.resourcePath.includes('src/Demos')
            ) {
              return localName;
            }

            return undefined;
          },
        },
        // localsConvention: 'camelCaseOnly',
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
