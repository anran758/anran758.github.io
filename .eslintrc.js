module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['eslint-plugin-react', 'react-hooks'],
  extends: [
    'airbnb-base',
    "eslint-config-prettier",
    // 'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-useless-constructor': 'off',
    'no-unused-expressions': 'off',
    'no-empty-interface': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'build/**/*.ts',
          'config/**/*.ts',
          'tools/**/*.ts',
          'src/**/stories/*.ts{,x}',
          'src/**/tests/*.ts{,x}',
          '**/fake/**',
        ],
      },
    ],
    'react/display-name': 'off',
    'class-methods-use-this': 'off',
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
