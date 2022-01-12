module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/setup-jest.js'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest-after-env.js'],
  testPathIgnorePatterns: ['src/data.ts', 'src/i18n.ts'],
  coveragePathIgnorePatterns: ['src/data.ts', 'src/i18n.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native-community|@react-native|redux-persist|react-native|@react-navigation|redux-flipper|@react-navigation/native))',
  ],
  testRegex: '/__tests__/.+\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^src(\\/?.*)$': '<rootDir>/src/$1',
  },
  coverageThreshold: {
    global: {
      statements: 60,
    },
  },
  collectCoverageFrom: ['**/*.tsx', '**/*.ts', '!src/assets/**'],
  collectCoverage: true,
  testResultsProcessor: 'jest-sonar-reporter',
};
