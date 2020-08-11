import path from 'path';
import { CustomConfig } from './config.d';

const basePaths = {
  // 源码目录
  sourceRoot: path.resolve(__dirname, '../../src'),
  // 构建后输出目录
  buildRoot: path.resolve(__dirname, '../../dist'),
  // 静态资源根目录
  staticDir: 'static',
};

const baseConfig: CustomConfig = {
  ...basePaths,

  staticDirPath: `/${basePaths.staticDir}`,

  entry: { index: path.join(basePaths.sourceRoot, 'index') },
  publicPath: '/',

  // 公用别名
  commonAlias: {
    Config: path.resolve(basePaths.sourceRoot, '..', 'config'),
    '@': path.resolve(basePaths.sourceRoot),
    Static: path.resolve(basePaths.sourceRoot, basePaths.staticDir),
    Images: path.resolve(basePaths.sourceRoot, 'images'),
    Components: path.resolve(basePaths.sourceRoot, 'components'),
    Layout: path.resolve(basePaths.sourceRoot, 'layout'),
  },

  template: 'index.html',

  externals: {},

  favicon: '',

  banner: 'Copyright (c) 2020-present anran758',

  // cdn 配置
  // cdn: {
  //   accessKey: '',
  //   secretKey: '',
  //   bucket: '',
  //   origin: '',
  //   uploadURL: '',
  // },

  // 要打包的外部资源库
  library: ['react'],
};

export default baseConfig;
