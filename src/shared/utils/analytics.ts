import analytics from '@react-native-firebase/analytics';

interface logSignUpLoginprops {
  method: string
}

export interface eventParameterProps {
  article_name?: string,
  content_type?: string,
  article_category?: string,
  article_author?: string,
  article_publish_date?: string,
  article_length?: number,
  tags?: string
}

export const recordCurrentScreen = async (screenName: string) => {
  await analytics().logScreenView({
    screen_name: screenName,
    screen_class: screenName,
  });
};

export const recordLogEvent = async (name: string, params?: { [key: string]: any }) => {
  await analytics().logEvent(name, params);
};

export const recordUserId = async (params: string | null) => {
  await analytics().setUserId(params);
}

export const recordLogSignUp = async (params: logSignUpLoginprops) => {
  await analytics().logSignUp(params);
}

export const recordLogLogin = async (params: logSignUpLoginprops) => {
  await analytics().logLogin(params);
}

export const recordUserProperty = async (key: string, value: string) => {
  await analytics().setUserProperty(key,value);
} 