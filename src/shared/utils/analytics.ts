import analytics from '@react-native-firebase/analytics';

interface LogSignUpLoginProps {
  method: string
}

export enum AnalyticsEvents {
  ARTICLE_COMPLETED = 'article_completed',
  DYNAMIC_ARTICLE_LOAD = 'dynamic_article_load',
  MENU_VIEW = 'menu_view',
  TODAY_COPY_DOWNLOAD = 'today_copy_download',
  SEARCH = 'search',
  SOCIAL_SHARE = 'social_share',
  FONT_CHANGE = 'font_change',
  ARTICLE_SAVE = 'article_save',
  ARTICLE_UNSAVE = 'article_unsave',
  TEXT_COPY = 'text_copy',
  CONTACT_FORM_SUBMIT = 'contact_form_submit',
  LOG_OUT = 'log_out',
  PERSONALIZED_AUTHORS = 'personalized_author',
  PERSONALIZED_SECTIONS = 'personalized_sections',
  PERSONALIZED_NEWSLETTERS = 'personalized_newsletter',
  REGISTRATION_SKIP_CLICK = 'registration_skip_click',
  VIDEO_START = 'video_start',
  VIDEO_PROGRESS = 'video_progress',
  VIDEO_COMPLETED = 'video_completed',
  PODCAST_PLAY = 'podcast_play',
  PODCAST_PROGRESS = 'podcast_progress',
  PODCAST_COMPLETED = 'podcast_completed',
  VIEWED_STORY = 'Viewed_Story',
  LOGIN = 'Login',
  PRESSED_ON_READ_STORY = 'Pressed_On_Read_Story',
  ARTICLE_DETAIL_SCREEN = 'Article_Details_Screen',
  PRESSED_ON_RELATED_ARTICLE = 'Pressed_On_Related_Article',
  COMPLETED_REGISTRATION = 'Completed_registration',
  ADD_FAVORITE_AUTHORS = 'Add_Favorite_Authors',
  ADD_INTERESTS_TOPICS = 'Add_Interests_Topic',
  PLAYED_PODCAST = 'Played_Podcast',
  COMPLETED_ONBOARDING = 'Completed_Onboarding',
  PLAYED_SPECIFIC_VIDEO = 'Played_Specific_Video',
  ADD_BOOKMARK_TO_ARTICLE = 'Add_Bookmark_to_Article',
  REMOVE_BOOKMARK = 'Remove_Bookmark',
  PRESSED_ON_SOCIAL_MEDIA_EXTENSIONS = 'Pressed_on_social_media_extensions',
  EMAIL = 'email',
  UNHANDLED_NOTIFICATION = 'UnHandled_Notification'
}

export interface EventParameterProps {
  article_name?: string,
  content_type?: string,
  article_category?: string,
  article_author?: string,
  article_publish_date?: string | Date,
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

export const recordLogSignUp = async (params: LogSignUpLoginProps) => {
  await analytics().logSignUp(params);
}

export const recordLogLogin = async (params: LogSignUpLoginProps) => {
  await analytics().logLogin(params);
}

export const recordUserProperty = async (key: string, value: string) => {
  await analytics().setUserProperty(key,value);
}
