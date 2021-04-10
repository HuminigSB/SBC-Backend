module.exports = {
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/src/config/**/*.js',
    '!**/src/database/**/*.js',
    '!**/src/app.js',
    '!**/src/routes.js',
    '!**/src/server.js'
  ],
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  testMatch: [
     "**/tests/**/*.test.js",
  ],
  setupFilesAfterEnv: ['./jest.setup.js']
};

