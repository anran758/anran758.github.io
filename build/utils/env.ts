const { NODE_ENV } = process.env;

/**
 * 当前是生产环境
 */
export const isProd = NODE_ENV === 'production';

/**
 * 当前是开发环境
 */
export const isDev = NODE_ENV === 'development';
