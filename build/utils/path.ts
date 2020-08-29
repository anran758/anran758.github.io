import path from 'path';
import { getWebpackConf } from '../../config/webpack';

const config = getWebpackConf();

/**
 * 获取基于源码的相对路径
 */
export function getSrcPath(...paths: string[]) {
  return paths.length
    ? path.join(config.sourceRoot, ...paths)
    : config.sourceRoot;
}
