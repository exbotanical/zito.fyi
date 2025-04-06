const path = require('node:path')

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      path.join(__dirname, '../mocks/assets.js'),

    // Aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@@/(.*)$': '<rootDir>/test/$1',
  },
  setupFiles: [path.join(__dirname, './loader.shim.js')],
  setupFilesAfterEnv: [path.join(__dirname, './setupTests.js')],
  // https://github.com/jsdom/jsdom/issues/3363#issuecomment-1467894943
  testEnvironment: './test/config/testEnvironment.ts',
  testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>/cypress'],
  testEnvironmentOptions: { url: 'http://localhost' },
  transform: {
    '^.+\\.jsx?$': path.join(__dirname, './preprocess.js'),
    '^.+\\.tsx?$': 'ts-jest',
  },
  // https://github.com/facebook/jest/issues/2081#issuecomment-699558143
  transformIgnorePatterns: ['node_modules/(?!.*(@mdx-js)/)'],
}
