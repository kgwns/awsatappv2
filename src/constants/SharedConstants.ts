import { isIOS } from "src/shared/utils";

export const DEFAULT_ALERT_TITLE = '';
export const DEFAULT_ALERT_MESSAGE = 'Need to implement';

export const MOST_READ = 'الأكثر قراءة';
export const WHAT_DO_YOU_WANT_TO_STAY_INFORMED =
  'ما الذي تريد أن تبقى على اطلاع عليه؟';
export const CHOOSE_TOPICS_TO_HAVE_BEST_FEED =
  'اختر مواضيعك لمنحك أفضل تجربة في خلاصتك';

export const VALID_URL_REGEX = "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
export const FROM_TWO_HOURS = 'من ساعاتان'
export const MINI_PLAYER_PODCAST_TITLE = 'عنوان الحلقه الآخيره من صباح الخير هنا '
export const PROFILE = 'Profile'
export const RELATED_OPINION_CARD_TITLE = 'عادل درويش'
export const RELATED_OPINION_CARD_BODY = 'الصحافة بين الخصوصية والصالح العام'
export const DURATION = ''
export const AUTHOR_TITLE = 'اسم الكاتب'
export const AUTHOR_DESCRIPTION = 'سياسه و اقتصاد'

//Permission
export const REQUIRE_ACCESS = 'تتطلب الوصول'
export const REQUEST_CAMERA_ACCESS_MESSAGE = 'يرجى تقديم إذن للوصول إلى كاميرا الجهاز'

//Podcast Spreaker
export const PODCAST_URL_SUFFIX = '/play.mp3'

//Date picker
export const DEFAULT_MINIMUM_DATE = '1970-01-01'


//UserProfile
export const CONST_PLEASE_ENTER_THE_NAME = 'الرجاء إدخال الاسم'
export const CONST_OK = 'نعم'

//Social Media URLs
export const FACEBOOK_URL = 'https://www.facebook.com/asharqalawsat.a';
export const INSTAGRAM_URL = 'https://www.instagram.com/asharqalawsat/';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/asharq-alawsat';
export const TWITTER_URL = 'https://twitter.com/aawsat_News'; 

export const FACEBOOK_APP_URL = isIOS ? 'fb://page/?id=145726335465699' : 'fb://page/145726335465699';
export const INSTAGRAM_APP_URL = 'instagram://user?username=asharqalawsat';
export const LINKEDIN_APP_URL = 'linkedin://company/asharq-alawsat';
export const TWITTER_APP_URL = 'twitter://user?screen_name=aawsat_News';