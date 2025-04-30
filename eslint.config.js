import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      jsdoc: jsdoc
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // JSDoc plugin rules
      'jsdoc/require-jsdoc': ['error', {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: false,
          FunctionExpression: false
        }
      }],
      'jsdoc/valid-types': 'error',

      // Style and formatting rules
      'max-len': 'off',
      'space-before-function-paren': ['error', 'never'],
      'switch-colon-spacing': 'off',
      'comma-dangle': ['error', 'never'],
      'new-parens': 'error',
      'no-var': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-console': 'error',
      camelcase: 'off',
      'keyword-spacing': ['error', {
        overrides: {
          if: { after: true }
        }
      }],
      'space-infix-ops': ['error', { int32Hint: true }],
      'quote-props': ['error', 'as-needed', { keywords: false }],
      'one-var': ['error', 'always'],
      'no-trailing-spaces': ['error', { ignoreComments: true, skipBlankLines: false }],
      'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1 }],
      semi: ['error', 'always'],
      'comma-spacing': ['error', { before: false, after: true }],
      'key-spacing': ['error', { mode: 'strict' }],
      'no-multi-spaces': 'error',
      quotes: ['error', 'single'],
      eqeqeq: 'error',
      'linebreak-style': ['error', 'unix'],
      'no-whitespace-before-property': 'error',
      'array-bracket-spacing': ['error', 'never'],
      curly: 'error',
      'vars-on-top': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: false }],
      'no-use-before-define': 'error',
      'no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '^init' }],
      'space-before-blocks': 'error',
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'block-spacing': ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
      'prefer-const': 'error',
      'default-param-last': 'error',
      'no-loop-func': 'error',
      'no-extra-bind': 'error',
      'dot-notation': 'error',
      'dot-location': ['error', 'property'],
      'operator-linebreak': ['error', 'before'],
      'no-undef-init': 'error',

      // React-refresh rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    }
  }
];