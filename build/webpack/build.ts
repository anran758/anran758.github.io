import webpack from 'webpack';
import chalk from 'chalk';
import rm from 'rimraf';
import ora from 'ora';

import webpackConfig from './webpack.prod';
import config from '../../config/webpack/prod';

const spinner = ora('buildding for production...\n').start();

// 清空旧文件
// https://www.npmjs.com/package/rimraf
rm(config.buildRoot, (err) => {
  if (err) throw err;

  spinner.text = 'webpack building...';

  // https://webpack.js.org/api/node/
  webpack(webpackConfig, (buildErr, stats) => {
    if (buildErr) throw buildErr;

    spinner.stop();
    process.stdout.write(
      `${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      })}\n\n`
    );

    // eslint-disable-next-line no-console
    console.log(chalk.cyan('Build complete.\n'));
  });
});
