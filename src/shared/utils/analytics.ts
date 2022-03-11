import analytics from '@react-native-firebase/analytics';

export const recordCurrentScreen = async (screenName: string) => {
  await analytics().logScreenView({
    screen_name: screenName,
    screen_class: screenName,
  });
};

export const recordLogEvent = async (name: string, params?: { [key: string]: any }) => {
  await analytics().logEvent(name, params);
};
