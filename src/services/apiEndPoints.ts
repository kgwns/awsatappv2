//MostRead
export const MOST_READ_ENDPOINT = 'api/v2/view/mostread';
export const MOST_READ_ENDPOINT_NEW = 'https://c.aawsat.com/list/Daily/aawsat.com/10/1/web';

//articleSection
const ARTICLE_SECTION_ENDPOINT = 'api/v2/articlesection';
//Search
export const SEARCH_ENDPOINT = 'api/v2/search';

//Article Details
export const ARTICLE_DETAIL_GET = 'api/v2/articlenode/';
export const RELATED_ARTICLE_GET = 'api/v2/relatedarticles/';
export const ARTICLE_SECTION_GET = '/api/v2/articlesection/';
export const ARTICLE_NEXT_GET = '/api/v2/articlenext/';

//LatestNews
//items_per_page is 5 or 10
//page start from 0
//offset is about from which position need to get the data
export const LATEST_ARTICLE_GET = 'api/v2/latestarticles';
export const SECTION_COMBO = ARTICLE_SECTION_ENDPOINT;
export const PODCAST_HOME = 'api/v2/podcasthome';
export const COVERAGE_ARTICLE_END_POINT = 'api/v2/home2/topview/coverage'
export const FEATURED_ARTICLE_ENDPOINT = 'api/v2/home2/topview/almqalat_alryysyt_'
export const HORIZONTAL_ARTICLE_END_POINT = 'api/v2/home2/topview/tghtyt_khast'
export const EDITORS_CHOICE = 'api/v2/home2/editorschoice';
export const SPOTLIGHT_COMBO = 'api/v2/home2/spotlight';
export const INFO_GRAPHIC_BLOCK = 'api/v2/pagenode/5062917';
export const SECTION_COMBO_TWO = 'api/v2/user/articlesection/11+97115+97110';
export const ARCHIVED_ARTICLE_ENDPOINT = 'api/v2/archivedarticle'
export const NODE_LIST_ENDPOINT = 'api/v2/queue/nodelist/'

//opinion tab in category section
//writer list
export const OPINION_TAB_WRITER_ENDPOINT = 'api/v2/applist/authors';

//opinion tab in category section
//opinions list
export const OPINIONS_ENDPOINT = 'api/v2/opinions/';
export const OPINION_BY_WRITER_END_POINT = 'api/v2/opinions/'
export const OPINION_LIST_END_POINT = 'api/v2/opinionslist/'
export const OPINION_LIST_ALL_END_POINT = 'api/v2/opinionslist/all'
export const HOME_OPINION_LIST_VIEW_END_POINT = 'api/v2/listview/opinion'

export const NEWS_CATEGORIES_ENDPOINT = 'api/v2/sections/news_categories';

export const SIDE_MENU_ENDPOINT = 'api/v2/sidemenu';

export const SECTION_ARTICLES = ARTICLE_SECTION_ENDPOINT;


//news View tab in category section
//items_per_page is 10
//page start from 0
//offset is about from which position need to get the data
export const NEWS_VIEW_ENDPOINT = ARTICLE_SECTION_ENDPOINT;
export const ARTICLE_SUB_SECTION_ENDPOINT = 'api/v2/articlesubsection';

//all writers list
export const ALL_WRITERS_ENDPOINT = 'api/v2/applist/authors';
export const SEND_SELECTED_WRITERS_ENDPOINT = 'api/ums/v1/addFavoriteAuthor?tid=';
export const GET_SELECTED_AUTHORS_ENDPOINT = 'api/ums/v1/getFavoriteAuthor';
export const REMOVE_WRITERS_ENDPOINT = 'api/ums/v1/removeFavoriteAuthor?tid=';
export const GET_WRITER_DETAIL_END_POINT = 'api/v2/sections/writer/'


//all site categories
export const ALL_SITE_CATEGORIES_ENDPOINT = "api/v2/applist/sections";
export const GET_SELECTED_TOPICS_ENDPOINT = 'api/ums/v1/getFavoriteTopics';

export const INFO = 'api/v2/info/'

// Side Menu
export const ADVERTISE_INFO_ID = 49
export const AWSATT_HISTORY_INFO_ID = 153
export const ABOUT_US = 56
export const TERMS_AND_CONDITION = 57
export const PRIVACY_POLICY_ID = 138
export const CONTACT_US_END_POINT = 'api/ums/v1/sendContactUsMail'

// Register
export const REGISTER_ENDPOINT = 'api/ums/v1/register';
export const LOGIN_ENDPOINT = 'api/ums/v1/login';
export const LOGOUT_ENDPOINT = 'api/ums/v1/logout';
export const CHECK_EMAIL = 'api/ums/v1/loginCheckEmail'

//VideoList
export const VIDEO_LIST_ENDPOINT = 'api/v2/videolist'
export const VIDEO_DETAIL_ENDPOINT = 'api/v2/videonode/'

//Top Menu
export const TOP_MENU_ENDPOINT = 'api/v2/topmenu'
//UMS update interests 
export const ADD_YOUR_TOPICS_ENDPOINT = 'api/ums/v1/addFavoriteTopics?tid='

//Opinion Article Detail
export const OPINION_ARTICLE_DETAIL = 'api/v2/opinionnode/'

//User Profile Details
export const USER_PROFILE_DETAIL = 'api/ums/v1/profile'
export const SEND_PROFILE_DETAIL = 'api/ums/v1/update-user-profile?email='
//Bookmark
export const SEND_BOOK_MARK = 'api/ums/v1/addBookmarks'
export const GET_BOOK_MARK_END_POINT = 'api/ums/v1/getBookmarks'
export const REMOVE_BOOK_MARK_END_POINT = 'api/ums/v1/removeBookmarks'
export const GET_BOOK_DETAIL_INFO_END_POINT = 'api/v2/nodelist/'

//User Profile Details
export const UPDATE_PROFILE_USER_IMAGE = 'api/ums/v1/updateProfileUserImage'

//Change password
export const CHANGE_PASSWORD = 'api/ums/v1/changePassword?password='

//News Letters
export const SEND_SELECTED_NEWS_LETTERS_ENDPOINT = 'api/ums/v1/addNewsletters?tid=';
// export const GET_SELECTED_NEWS_LETTERS_ENDPOINT = 'api/ums/v1/getNewsletters';
export const GET_SELECTED_NEWS_LETTERS_ENDPOINT = 'api/ums/v1/getAPPNewslettersList';
export const GET_MY_NEWS_LETTERS_ENDPOINT = 'api/ums/v1/getMyNewsletters';

//Keep Notified
export const SEND_SELECTED_NOTIFICATION_END_POINT = 'api/ums/v1/addNotificationCategories'
export const GET_SELECTED_NOTIFICATION_END_POINT = 'api/ums/v1/getMyNotificationCategories'
export const GET_LIST_OF_NOTIFICATION_END_POINT = 'api/ums/v1/getAPPNotificationsList'

//Podcast
export const PODCAST_LIST_ENDPOINT = 'api/v2/podcastsection/';
export const PODCAST_NODE_ENDPOINT = 'api/v2/podcastnode/';


//Related Opinion
export const GET_RELATED_OPINION_ENDPOINT = 'api/v2/opinionsrelated';

//favouriteOpinions
//opinions list
export const FAVOURITE_OPINIONS_ENDPOINT = 'api/v2/opinions';

//Forgot Password
export const FORGOT_PASSWORD_ENDPOINT = 'api/ums/v1/forgotPassword'

//Details of Selected Writers
export const ALL_SELECTED_WRITERS_ENDPOINT = 'api/v2/sections/writer';

//Documentary Video
export const DOCUMENTARY_VIDEO_ENDPOINT = 'api/v2/docvideolist';

//Content for you
export const CONTENT_FOR_YOU_ARTICLE_ENDPOINT = 'api/v2/user/articlesection'

//Notification FCM token
export const SAVE_FCM_TOKEN_ENDPOINT = 'api/ums/v1/saveToken'

//Photo Gallery
export const PHOTO_GALLERY_LIST_ENDPOINT = 'api/v2/albumslist';
export const PHOTO_GALLERY_DETAIL_ENDPOINT = 'api/v2/albumnode/';

//Journalist
export const JOURNALIST_ARTICLE_ENDPOINT = 'api/v2/journalistsarticles/'
export const GET_JOURNALIST_DETAIL_END_POINT = 'api/v2/jordetails/'

//DeleteMyAccount
export const DMA_INTRODUCTION_ENDPOINT = 'api/v2/info/4816'
export const DMA_FEEDBACK_ENDPOINT = 'api/v2/info/4817'
export const DMA_LIST_ENDPOINT = 'api/ums/v1/getDeleteAccountOptions'
export const DMA_DELETE_CONFIRMATION_ENDPOINT = 'api/ums/v1/delete-user-account'

//Cartoon
export const CARTOON_LIST_END_POINT = 'api/v2/cartoonlist';

// Entity-Queue
export const ENTITY_QUEUE_LIST_END_POINT = 'api/v2/entityqlist';
