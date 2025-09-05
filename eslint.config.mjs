import antfu from '@antfu/eslint-config';
import globals from 'globals';

export default antfu(
  {
    type: 'app',
    react: true,
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: 'double',
    },
  },
  {
    ignores: ['dist', 'node_modules', '.turbo', '.next', 'coverage', '*.min.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // TypeScript rules
      'ts/no-redeclare': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],

      // Console & process
      'no-console': ['warn'],
      'node/prefer-global/process': 'off',
      'node/no-process-env': 'error',

      // Antfu / Unicorn / Perfectionist
      'antfu/no-top-level-await': 'off',

      // Import sorting & grouping
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index'], 'type'],
          pathGroups: [
            {
              pattern: '@types/**',
              group: 'type',
              position: 'after',
            },
            {
              pattern: '@components/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@utils/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          newlinesBetween: "always"
        },
      ],

      // Sorting with perfectionist
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: ['builtin', 'external', 'type', 'internal', 'parent', 'sibling', 'index'],
          // 'newlines-between': 'always',
        },
      ],

      // Enforce <Fragment> instead of <>
      'react/jsx-fragments': ['error', 'element'],

      // Filenames in kebab-case
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['README.md'],
        },
      ],

      'max-lines': [
        'error',
        {
          max: 200,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
);
