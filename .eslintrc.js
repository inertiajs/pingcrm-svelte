module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    "indent": ['error', 2],
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'never'],
    'comma-dangle': ['warn', 'always-multiline'],
    'vue/max-attributes-per-line': 0,
    'vue/require-default-prop': 0,
    'vue/singleline-html-element-content-newline': 0,
  }
}
