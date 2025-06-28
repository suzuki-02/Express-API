export default {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/test-setup.js'],
  transform: { '^.+\\.js$': 'babel-jest' },
  testTimeout: 10000, // 10 seconds
};
