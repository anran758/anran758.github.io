import baseConf from './base';

export default {
    // 合并基础配置
    ...baseConf,

    // Webpack Bundle Analyzer options
    analyzerOpts: {},

    // 本地服务器配置
    devServer: {
        // port: 8080,
        // host: '0.0.0.0',
        // 请求代理
        proxy: {}
    },
}
