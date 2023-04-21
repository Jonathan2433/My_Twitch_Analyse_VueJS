/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    node: true
  },
  overrides: [
    {
      files: ['**/*.js'],
      excludedFiles: 'babel.config.js',
      parserOptions: {
        sourceType: 'module'
      },
      env: {
        es6: true,
        node: true
      },
      plugins: ['transform-require-ignore'],
      rules: {
        'transform-require-ignore/require-ignore': 'error'
      }
    }
  ]
}
