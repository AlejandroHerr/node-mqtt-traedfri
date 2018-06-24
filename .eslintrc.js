module.exports = {
  parser: 'typescript-eslint-parser',
  extends: 'airbnb-base',
  env: {
    node: true,
  },
  plugins: [
    'typescript',
  ],
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      '.ts': 'never',
    }],
    'max-len': ['error', { code: 120 }],
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-typescript': true,
    },
  },
  overrides: {
    files: ['**/*.ts'],
    parser: 'typescript-eslint-parser',
    plugins: [
      'typescript',
    ],
    rules: {
      'no-undef': 'off',
      'typescript/class-name-casing': 2,
      'no-unused-vars': 0,
      'typescript/no-unused-variable': true,
    },
  },
};
