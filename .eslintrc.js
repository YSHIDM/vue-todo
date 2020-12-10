module.exports = {
  root: true, // 此项是用来告诉eslint找当前配置文件不能往父级查找
  env: {
    node: true, // 此项指定环境的全局变量，下面的配置指定为node环境
    "browser": true,
  },
  globals: {
    wx: true
  },
  // extends是扩展插件的意思，eslint的airbnb规范相关vue插件必须安装！
  extends: [
    'plugin:vue/essential', // 此项是用来配置vue.js风格,就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
    '@vue/airbnb', // 这里的插件是：eslint的（eslint-config-airbnb和eslint-plugin-airbnb及相关依赖）
    '@vue/typescript/recommended',
  ],
  parserOptions: { // parseOptions不是指定解析器，是传给解析器的配置项，告诉解析器需要支持的规则， 如：es2018，和项目是使用ecmaScript模块编写
    ecmaVersion: 2020,
  },
  rules: {
    'semi': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': ['off', 'windows'],
    'eol-last': 'off',
    'class-methods-use-this': 'off',
    'max-len': 'off',
    'comma-dangle': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/no-parsing-error': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-tabs': 'off',
    'func-names': 'off',
    'prefer-destructuring': 'off',
    '@typescript-eslint/camelcase': 'off',
    'quotes': 'off',
    'no-underscore-dangle': 'off',
    'nonblock-statement-body-position': 'off',
    'no-multiple-empty-lines': 'off',
    'array-callback-return': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-mixed-operators': 'off',
    'no-bitwise': 'off',
    'default-case': 'off',
    'no-cond-assign': 'off',
    'no-multi-assign': 'off',
    'no-control-regex': 'off',
    'no-shadow': 'off',
    'prefer-template': 'off',
    'consistent-return': 'off',
    'guard-for-in': 'off',
    'one-var': 'off',
    'one-var-declaration-per-line': 'off',
    'no-else-return': 'off',
    'no-unneeded-ternary': 'off',
    'prefer-spread': 'off',
    'indent': 'off',
    'space-before-blocks': 'off',
    'object-curly-spacing': 'off',
    'padded-blocks': 'off',
    'dot-notation': 'off',
    'curly': 'off',
    'arrow-parens': 'off',
    'lines-between-class-members': 'off',
    'no-continue': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-nested-ternary': 'off',
    'import/no-cycle': 'off'
  },
};
