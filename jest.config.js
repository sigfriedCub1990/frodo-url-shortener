/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist/*', 'node_modules'],
};
