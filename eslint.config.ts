import exbotanical, { GLOB_JS, GLOB_TESTS } from '@exbotanical/eslint-config'

export default exbotanical(
  {
    markdown: true,
    ignores: ['.cache', 'data', 'content', '**/fixtures', 'public'],
    test: {
      runner: 'jest',
      cypress: {
        files: ['cypress.config.ts', 'cypress/**/*.ts'],
      },
    },
  },
  {
    files: [...GLOB_TESTS],
    rules: {
      'ts/no-non-null-assertion': 'off',
      'ts/no-explicit-any': 'off',
    },
  },
  {
    files: [GLOB_JS],
    rules: {
      'unicorn/prefer-module': 'off',
    },
  },
  {
    settings: {
      'import/internal-regex': '^@@/',
    },
  },
)
