import path from 'path';
import { CustomConfig } from './config.d';

export const basePaths = {
  // 源码目录
  sourceRoot: path.resolve(__dirname, '../../src'),
  // 构建后输出目录
  buildRoot: path.resolve(__dirname, '../../dist'),
  // 静态资源根目录
  staticDir: 'static',
  demosDir: 'pages/demos',
};

export const baseConfig: CustomConfig = {
  ...basePaths,

  entry: { index: path.join(basePaths.sourceRoot, 'index') },
  publicPath: '/',

  // 公用别名
  commonAlias: {
    '@': path.resolve(basePaths.sourceRoot),
    Config: path.resolve(basePaths.sourceRoot, '..', 'config'),
    Static: path.resolve(basePaths.sourceRoot, basePaths.staticDir),
    Images: path.resolve(basePaths.sourceRoot, 'images'),
    Components: path.resolve(basePaths.sourceRoot, 'components'),
    Layout: path.resolve(basePaths.sourceRoot, 'layout'),
    'AppPages': path.resolve(basePaths.sourceRoot, 'pages/App'),
  },

  template: 'index.html',

  externals: {},

  favicon: '',

  banner: 'Copyright (c) 2020-present anran758',
};

export default baseConfig;
