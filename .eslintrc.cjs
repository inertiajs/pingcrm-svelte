module.exports = {
  extends: ['eslint:recommended', 'plugin:svelte/recommended', 'plugin:svelte/prettier', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    amd: true,
    es6: true,
  },
  rules: {
    indent: ['error', 2],
    quotes: ['warn', 'single'],
    semi: ['warn', 'never'],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    'comma-dangle': ['warn', 'always-multiline'],
    'svelte/no-at-html-tags': 'off',
  },
}
