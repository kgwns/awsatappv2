module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            'src/*': './src',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: ["transform-remove-console"],     //removing consoles.log from app during release (production) versions
      },
    },
  };
};
