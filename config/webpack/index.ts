import devConf from './dev';
import prodConf from './prod';
import { CustomConfig } from './config.d';
import { baseConfig } from './base';

export function getWebpackConf(): CustomConfig {
  const { NODE_DEV } = process.env;

  switch (NODE_DEV) {
    case 'development':
      return devConf;
    case 'production':
      return prodConf;

    default:
      console.warn('webpack 使用默认配置');
      return { ...baseConfig };
  }
}
