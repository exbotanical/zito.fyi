import exbotanical from '@exbotanical/eslint-config'

export default exbotanical(
  {
    ignores: ['.cache', 'data', 'content', '**/fixtures', 'public'],
    test: {
      runner: 'jest',
      cypress: {
        files: ['cypress.config.ts', 'cypress/**/*.ts'],
      },
    },
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      'ts/no-non-null-assertion': 'off',
    },
  },
)
