import commonConf from './base';

export default {
  // 合并基础配置
  ...commonConf,

  sourceMap: 'source-map',

  // Webpack Bundle Analyzer options
  analyzerOpts: {},

  // 本地服务器配置
  devServer: {
    // host: '0.0.0.0',
    // 请求代理
    proxy: {},
  },
};
