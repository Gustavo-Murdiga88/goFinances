module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: [
    '/node_modules',
    '/assets',

  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    'jest-styled-components',
  ]
}