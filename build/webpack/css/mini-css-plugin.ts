export function getMiniCssExtractPluginOptions(hashOutput: boolean) {
  const suffix = hashOutput ? '.[chunkhash:8]' : '';
  return {
    filename: `static/css/[name]${suffix}.css`,
    chunkFilename: `static/css/[name]${suffix}.css`,
  };
}
