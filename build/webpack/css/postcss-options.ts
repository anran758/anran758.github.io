export function getPostcssOption({ sourceMap }: { sourceMap: boolean }) {
  return {
    /* eslint-disable global-require */
    /* eslint-disable  @typescript-eslint/no-var-requires */
    plugins: [
      require('autoprefixer'),
      require('postcss-modules-values-replace'),
      require('postcss-modules-values'),
      require('postcss-calc')({ mediaQueries: true }),
      require('postcss-color-function'),
    ],
    /* eslint-enable global-require */
    /* eslint-enable @typescript-eslint/no-var-requires */
    sourceMap,
  };
}
