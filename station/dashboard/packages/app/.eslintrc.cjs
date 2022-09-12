/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },

  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      'registeredComponentsOnly': false,
      'ignores': [],
    }],
    'vue/no-boolean-default': 'error',
    'vue/no-child-content': 'error',
    'vue/no-this-in-before-route-enter': 'error',
    'vue/v-on-function-call': 'error',

    'vue/script-setup-uses-vars': 'error',
  }
}
