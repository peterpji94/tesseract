/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  clearMocks: true,
  errorOnDeprecated: true,

  setupFilesAfterEnv: ['./src/tests/testSetupAfterEnv.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'node',
  testTimeout: 10_000,
  // Use swc to speed up the tests and reduce the memory usage
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // Coverage for CI/CD
  collectCoverage: false, // override in CI/CD through the CLI options
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.ts', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
};
