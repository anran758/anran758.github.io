import { Configuration, Output, Resolve, BannerPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export interface CustomConfig {
  /** 源码路径 */
  sourceRoot: string;

  /** 构建后的输出目录 */
  buildRoot: string;

  /** 静态资源目录名 */
  staticDir: string;

  // webpack 配置
  entry?: Configuration['entry'];
  devtool?: Configuration['devtool'];

  /**
   * 外部依赖
   * https://webpack.docschina.org/configuration/externals/
   */
  externals?: Configuration['externals'];

  /**
   * 生成路径
   * https://webpack.js.org/configuration/output/#outputpublicpath
   */
  publicPath?: Output['publicPath'];

  /**
   * webpack 路径别名
   * https://webpack.js.org/configuration/resolve/#resolvealias
   */
  commonAlias?: Resolve['alias'];

  /** 网站模板路径 */
  template?: string;

  /** 网站 icon 路径 */
  favicon?: string;

  /** 第三方库 */
  library?: string[];

  /** js 中添加 banner，比如添加版权信息 */
  banner?: string | BannerPlugin.Options;

  /** Webpack Bundle Analyzer options */
  analyzerOpts?: BundleAnalyzerPlugin.Options;
}
