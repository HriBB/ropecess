import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  {
    ignores: [
      'build/**',
      'backup/**',
      'photos/**',
      'lighthouse/**',
      '.netlify/**',
      '.react-router/**',
      '.cache/**',
      '**/_gen/**',
    ],
  },

  // Base config
  js.configs.recommended,

  // React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'import/no-duplicates': ['error', { considerQueryString: true }],
    },
  },

  // Typescript
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    settings: {
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      // TS compiler already checks undefined names; mirrors what
      // plugin:@typescript-eslint/recommended did via eslint-recommended
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Node
  {
    files: ['*.config.{js,ts}', 'imagetools.ts', 'react-router.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]
