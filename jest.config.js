module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/setup-jest.js'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest-after-env.js'],
  testPathIgnorePatterns: ['src/data.ts', 'src/i18n.ts'],
  coveragePathIgnorePatterns: ['src/data.ts', 'src/i18n.ts'],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
    "^.+\.jsx?$": "babel-jest",
    "^.+\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native-community|@react-native|@notifee|react-native-push-notification-ios|redux-persist|react-native|@react-navigation|redux-flipper|@react-navigation/native|react-native-device-info|react-native-splash-screen|toggle-switch-react-native|react-native-image-crop-picker|@invertase/react-native-apple-authentication|react-native-adjust|react-native-adjust-oaid|react-native-restart))',
  ],
  testRegex: '/__tests__/.+\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^src(\\/?.*)$': '<rootDir>/src/$1',
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
  coverageThreshold: {
    global: {
      statements: 60,
    },
  },
  collectCoverageFrom: ['**/*.tsx', '**/*.ts', '!src/assets/**'],
  collectCoverage: true,
  testResultsProcessor: 'jest-sonar-reporter',
  testTimeout: 80000,
};
