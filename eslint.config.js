import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';

export default [
  { ignores: ['dist', 'build', 'node_modules'] },
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
    settings: {
      react: {
        version: 'detect'
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // React specific rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'warn',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': 'error',
      'react/no-unescaped-entities': 'warn',
      'react/jsx-pascal-case': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-wrap-multilines': ['error', {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line'
      }],

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Refresh rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      // General JavaScript rules
      'no-console': 'warn',
      'no-unused-vars': ['error', {
        args: 'none',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      eqeqeq: ['error', 'always'],

      // Style and formatting rules
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'comma-spacing': ['error', { before: false, after: true }],
      'key-spacing': ['error', { mode: 'strict' }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-blocks': 'error',
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      'keyword-spacing': 'error',
      'space-infix-ops': 'error',
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'linebreak-style': ['error', 'unix'],
      'max-len': ['warn', { code: 120, ignoreUrls: true, ignoreStrings: true }]
    }
  }
];