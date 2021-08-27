module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
    es6: true
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2021,
    sourceType: 'module'
  },

  plugins: [
    'vue'
  ],

  ignorePatterns: [
    'repl.js'
  ],

  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    semi: [2, 'always'],
    'vue/html-indent': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'import/no-webpack-loader-syntax': 'off',

    'no-prototype-builtins': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/require-default-prop': 'off',
    'vue/order-in-components': 'off',
    'no-useless-escape': 'off',
    'no-irregular-whitespace': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'vue/attributes-order': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/no-multi-spaces': 'off',
    'standard/no-callback-literal': 'off',
    'camelcase': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'eqeqeq': 'off',

    'no-useless-catch': 'warn',
    'no-fallthrough': 'warn',
    'indent': ['error', 'tab']
  },

  reportUnusedDisableDirectives: true
};
