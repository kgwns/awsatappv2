import { WidgetHeaderProps } from 'src/components/atoms/widgetHeader/WidgetHeader';
import { LabelTypeProp, TextWithFlagProps } from 'src/components/atoms';
import { ImagesName, Styles } from 'src/shared/styles';
import {
    AuthorItemProps,
    articleFooterProps,
    TabBarDataProps,
    VideoItemProps,
    PodcastVerticalListProps,
} from 'src/components/molecules';
import { ArticleFontSize, ServerEnvironment, Theme } from 'src/redux/appCommon/types';
import configureStore from 'redux-mock-store';
import {
    articleProps,
    ShortArticleProps,
    SearchResultsProps,
    StoryListItemProps,
    StoryListProps,
    PodcastProgramInfoProps,
} from 'src/components/organisms';
import { normalize } from 'src/shared/utils';
import { podcastCardProps } from 'src/components/organisms/PodcastCardSection';
import { NewsWithImageItemProps } from 'src/components/molecules/podcast/NewsWithImageItem';
import { ArticleRectangleCardProps } from 'src/components/molecules/podcast/ArticleRectangleCard';
import { NewsFeedProps } from 'src/components/organisms/NewsFeed';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { isIOS } from "src/shared/utils";
import { ImageName } from "src/components/atoms";
import { useSelector } from 'react-redux';
import { getArabicData } from '../redux/arabicWords/selectors';

enum TranslateKey {
    RETURN,
    NOT_SUBSCRIBED,
    DESCRIPTION,
    SIGN_UP,
    CROSSWORD,
    SUDOKU,
    SOLVING_CROSS_PUZZLES,
    SOLVING_SUDOKU,
    CROSS_WORD_DESCRIPTION,
    SUDOKU_DESCRIPTION,
    GAMES,
    SECTION_MAIN,
    SECTION_COMBO_ONE,
    SECTION_COMBO_TWO,
    SECTION_COMBO_THREE,
    SECTION_COMBO_FOUR,
    SECTION_COMBO_FIVE,
    SECTION_COMBO_SIX,
    SECTION_COMBO_SEVEN,
    SECTION_COMBO_EIGHT,
    EDITOR_CHOICE_HEADER_TITLE,
    DRAWER_PDF_ARCHIVE,
    OPINION_COMBO_TITLE,
    OPINION_ARTICLE_TITLE,
    RICH_HTML_FACTS,
    CONST_MORE,
    CONST_READ_ARTICLE,
    RICH_OPINION_TITLE,
    TAB_ALL_TITLE,
    NO_CONTENT_TITLE,
    DRAWER_CALL_US,
    CONTACT_US_NAME,
    CONTACT_US_EMAIL,
    CONTACT_US_LETTER,
    CONTACT_US_SEND,
    TEXT_ALERT,
    COMMON_OK,
    LISTEN_TO_ARTICLE,
    ONBOARD_SUCCESS_MESSAGE,
    ONBOARD_SUCCESS_MAIL_ACKNOWLEDGEMENT,
    ONBOARD_SUCCESS_GO_TO_HOME,
    ONBOARD_SUCCESS_GO_TO_MY_NEWS,
    OPINION_SLIDER_TITLE,
    ADVERTISE_WITH_US,
    ABOUT_THE_MIDDLE_EAST,
    TERMS_OF_USE,
    EDITORS_PICK_HEADER_TITLE,
    WEATHER_DETAILS_SUNRISE,
    WEATHER_DETAILS_SUNSET,
    WEATHER_DETAILS_SIDEBAR,
    WEATHER_DETAILS_MAX,
    WEATHER_DETAILS_MBAR,
    WEATHER_DETAILS_KM,
    WEATHER_DETAILS_KMH,
    WEATHER_DETAILS_HUMIDITY,
    WEATHER_DETAILS_VISIBILITY,
    WEATHER_DETAILS_PRESSURE,
    WEATHER_DETAILS_SPEED,
    WEATHER_DETAILS_SEA_CONDITION,
    WEATHER_DETAILS_ENABLE_LOCATION,
    WEATHER_NO_INFORMATION_TEXT,
    CONTENT_BUNDLE_WIDGET_TITLE,
    ARCHIVED_ARTICLE_SECTION_TITLE,
    LIVE_TAG_TITLE,
    ANALYSIS_TAG_TITLE,
    SPECIAL_TAG_TITLE,
    SAVE_ARTICLE_TO_YOUR_FAVOURITES,
    CREATE_ACCOUNT_DESCRIPTION,
    NOT_SUBSCRIBED_POP_UP,
    SIGN_UP_POP_UP,
    LOG_IN_POP_UP,
    OK_TEXT,
    REQUIRE_ACCESS,
    REQUEST_CAMERA_ACCESS_MESSAGE,
    NAME_PLACE_HOLDER,
    PLEASE_ENTER_THE_NAME,
    TRY_AGAIN,
    PASSWORD_CHANGED_SUCCESSFULLY,
    OLD_PASSWORD_DOES_NOT_MATCH,
    OPEN_CAMERA_OPTION,
    OPEN_GALLERY_OPTION,
    CANCEL,
    SUCCESS,
    OPINION_LISTEN_TO_ARTICLE_LIST,
    FAVORITE_FILTERS_EVERYONE,
    ONBOARD_NEWSLETTER_SUBSCRIBED,
    ONBOARD_NEWSLETTER_NOT_SUBSCRIBED,
    MY_NEWS_TAB_WRITERS,
    MY_NEWS_TAB_TOPICS,
    MY_NEWS_TAB_MEDIA,
    PODCAST_PROGRAM_RETURN,
    SEARCH_PLACEHOLDER,
    VIDEO_DETAIL_EMPLOYMENT,
    OPINION_ARTICLE_RETURN,
    SECTION_COMBO_ONE_HEADER_RIGHT,
    PODCAST_HOME_LISTEN_TO_PODCAST,
    MOST_READ_TITLE,
    OPINION_WRITERS,
    PODCAST_EPISODE_LISTEN_TO_EPISODE,
    OPINION_ARTICLE_DETAIL_RELATED_OPINION_TITLE,
    CATEGORY_PAGE_VIDEO_CONTENT,
    FAVORITE_FILTERS_ARTICLES,
    FAVORITE_FILTERS_VIDEO,
    FAVORITE_FILTERS_OPINION,
    FAVORITE_FILTERS_PODCAST,
    FAVORITE_FILTERS_ALBUM,
    SIGNIN_LOGIN_ACCOUNT,
    SIGNIN_SIGNUP,
    SIGNIN_INFO,
    SIGNIN_SIGNUP_RECEIVE,
    SIGNIN_EMAIL,
    SIGNIN_PASSWORD,
    SIGNIN_FORGOT_PASSWORD,
    SIGNIN,
    SIGNIN_OR,
    SIGNIN_LOGIN_FACEBOOK,
    SIGNIN_LOGIN_GOOGLE,
    SIGNIN_LOGIN_APPLE,
    FAVORITE_ARTICLES_THAT_INTEREST_YOU,
    FAVORITE_ARTICLE_FROM_YOUR_FAVORITE_WRITERS,
    PODCAST_EPISODE_MORE_EPISODES,
    PODCAST_PROGRAM_EPISODES,
    PODCAST_EPISODE_LISTEN_TO,
    SEARCH_NOT_FOUND,
    CLEAR_SEARCH_HISTORY,
    VIDEO_DETAIL_WATCH,
    COMMON_ALERT,
    COMMON_NO_INTERNET_CONNECTION,
    COMMON_SOMETHING_WENT_WRONG,
    TERMS_AND_CONDITION,
    SIGNIN_SKIP,
    SIGNIN_AGREE_TO,
    SIGNIN_TERMS_AND_CONDITION,
    VERIFY_MAIL_AND_PASSWORD_AND_TRY_AGAIN,
    CREDENTIALS_ARE_INCORRECT,
    SIGNIN_RETURN,
    SIGNUP_RETURN,
    SIGNUP_CREATE_ACCOUNT,
    SIGNUP_ACCOUNT_DESCRIPTION,
    SIGNUP_EMAIL,
    SIGNUP_PASSWORD,
    SIGNUP_CONFIRM_PASSWORD,
    SIGNUP,
    CONTACT_US_DO_YOU_HAVE_QUESTIONS,
    CONTACT_US_DESCRIPTION,
    FAVORITE_TAB_ITEM_ARCHIEVES,
    SIGN_UP_PH_TITLE,
    SIGN_UP_PH_MESSAGE,
    SIGN_UP_PH_SIGNUP,
    ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE,
    ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION,
    ONBOARD_COMMON_NEXT_BUTTON,
    FORGOT_PASSWORD_CHECK_YOUR_MAIL,
    FORGOT_PASSWORD_INSTRUCTION,
    FORGOT_PASSWORD_OPEN_MAIL_APP,
    FORGOT_PASSWORD_SKIP_OPTION,
    SIGNIN_RIGHTS,
    ONBOARD_KEEP_NOTIFIED_TITLE,
    ONBOARD_KEEP_NOTIFIED_DESCRIPTION,
    ONBOARD_COMMON_COMPLETED,
    ONBOARD_COMMON_DONE,
    ONBOARD_SELECT_TOPICS_TITLE,
    ONBOARD_SELECT_TOPICS_DESCRIPTION,
    MANAGE_MY_NEWS_ALERT,
    MANAGE_MY_NEWS_REMOVE,
    MANAGE_MY_NEWS_REMOVE_TOPIC,
    MANAGE_MY_NEWS_REMOVE_AUTHOR,
    MANAGE_MY_NEWS_MY_FAVORITE_BOOKS,
    MANAGE_MY_NEWS_CONTINUE_READING_MORE_BOOKS,
    MANAGE_MY_NEWS_MY_FAVORITE_TOPICS,
    MANAGE_MY_NEWS_FOLLOW_MORE_TOPICS,
    NEW_PASSWORD_CREATE_NEW_PASSWORD,
    NEW_PASSWORD_DESCRIPTION,
    NEW_PASSWORD_WARNING,
    NEW_PASSWORD_MATCH_WARNING,
    NEW_PASSWORD_SET_NEW_PASSWORD,
    ONBOARD_NEWSLETTER_TITLE,
    ONBOARD_NEWSLETTER_DESCRIPTION,
    PHOTO_GALLERY_TITLE,
    PROFILE_SETTING_MANAGE_MY_NOTIFICATION,
    PROFILE_SETTING_MANAGE_MY_NEWS,
    PROFILE_SETTING_MY_NEWS_LETTER,
    PROFILE_SETTING_MY_ACCOUNT_DETAILS,
    PROFILE_SETTING_APP_APPEARANCE,
    PROFILE_SETTING_EXIT,
    PROFILE_SETTING_DARK_MODE,
    PROFILE_SETTING_LIGHT_MODE,
    PROFILE_SETTING_WELCOME,
    PROFILE_SETTING_CHANGE_ENVIRONMENT,
    PROFILE_SETTING_NOT_SUBSCRIBED,
    PROFILE_SETTING_LOGIN_FEATURE,
    PROFILE_SETTING_SIGN_UP,
    PROFILE_SETTING_ALERT,
    PROFILE_SETTING_LOG_OUT_ALERT_MESSAGE,
    PROFILE_SETTING_DEBUG,
    PROFILE_SETTING_PRODUCTION,
    ON_BOARD_COMMON_SKIP,
    ON_BOARD_COMMON_RETURN,
    PROFILE_SETTING_ARITHMETIC,
    PROFILE_USER_DETAIL_TITLE,
    MANAGE_MY_NEWS_HEADER,
    USER_DETAIL_SELECT_BIRTHDAY_TEXT,
    USER_DETAIL_YOUR_DETAILS,
    USER_DETAIL_PASSWORD_TITLE,
    USER_DETAIL_USER_NAME_TITLE,
    USER_DETAIL_BIRTHDAY_TITLE,
    CONFIRM,
    USER_DETAIL_SELECT_THE_DATE,
    USER_DETAIL_OCCUPATION_TITLE,
    USER_DETAIL_OCCUPATION_PLACEHOLDER,
    USER_DETAIL_UPDATE_BUTTON_TEXT,
    USER_DETAIL_OLD_PASSWORD,
    USER_DETAIL_NEW_PASSWORD,
    USER_DETAIL_CONFIRM_NEW_PASSWORD,
    USER_DETAIL_MOVE_AND_SCALE,
    FOLLOW,
    FOLLOWER,
    PODCAST_WIDGET_HEADER_LEFT,
    PODCAST_WIDGET_HEADER_RIGHT
}

const TranslateConstants = ({
    key
}: { key: TranslateKey }) => {
    const arabic = useSelector(getArabicData);
    switch (key) {
        case TranslateKey.RETURN:
            return arabic.return;
        case TranslateKey.NOT_SUBSCRIBED:
            return arabic?.signUpAlert?.notSubscribed;
        case TranslateKey.DESCRIPTION:
            return arabic?.signUpAlert?.description
        case TranslateKey.SIGN_UP:
            return arabic?.signUpAlert?.signUp;
        case TranslateKey.CROSSWORD:
            return arabic?.games?.crossword;
        case TranslateKey.SUDOKU:
            return arabic?.games?.sudoku;
        case TranslateKey.SOLVING_CROSS_PUZZLES:
            return arabic?.games?.solvingCrossPuzzles;
        case TranslateKey.SOLVING_SUDOKU:
            return arabic?.games?.solvingSudoku;
        case TranslateKey.CROSS_WORD_DESCRIPTION:
            return arabic?.games?.crosswordDescription;
        case TranslateKey.SUDOKU_DESCRIPTION:
            return arabic?.games?.sudokuDescription;
        case TranslateKey.GAMES:
            return arabic?.games?.games;
        case TranslateKey.SECTION_MAIN:
            return arabic?.sectionTab?.main;
        case TranslateKey.SECTION_COMBO_ONE:
            return arabic?.latestNewsTab?.sectionComboOne?.headerLeft;
        case TranslateKey.SECTION_COMBO_TWO:
            return arabic?.latestNewsTab?.sectionComboTwo?.headerLeft;
        case TranslateKey.SECTION_COMBO_THREE:
            return arabic?.latestNewsTab?.sectionComboThree?.headerLeft;
        case TranslateKey.SECTION_COMBO_FOUR:
            return arabic?.latestNewsTab?.sectionComboFour?.headerLeft;
        case TranslateKey.SECTION_COMBO_FIVE:
            return arabic?.latestNewsTab?.sectionComboFive?.headerLeft;
        case TranslateKey.SECTION_COMBO_SIX:
            return arabic?.latestNewsTab?.sectionComboSix?.headerLeft;
        case TranslateKey.SECTION_COMBO_SEVEN:
            return arabic?.latestNewsTab?.sectionComboSeven?.headerLeft;
        case TranslateKey.SECTION_COMBO_EIGHT:
            return arabic?.latestNewsTab?.sectionComboEight?.headerLeft;
        case TranslateKey.EDITOR_CHOICE_HEADER_TITLE:
            return arabic?.latestNewsTab?.editorsChoice?.headerLeft;
        case TranslateKey.DRAWER_PDF_ARCHIVE:
            return arabic?.drawer?.pdfArchive;
        case TranslateKey.OPINION_COMBO_TITLE:
            return arabic?.latestNewsTab?.sectionWriters?.headerLeft;
        case TranslateKey.OPINION_ARTICLE_TITLE:
            return arabic?.opinion?.opinionArticles;
        case TranslateKey.RICH_HTML_FACTS:
            return arabic?.richHTMLContent?.facts;
        case TranslateKey.CONST_MORE:
            return arabic?.common?.more;
        case TranslateKey.CONST_READ_ARTICLE:
            return arabic?.richHTMLContent?.readArticle;
        case TranslateKey.RICH_OPINION_TITLE:
            return arabic?.richHTMLContent?.opinionTitle;
        case TranslateKey.TAB_ALL_TITLE:
            return arabic?.myNewsWriters?.allTxt;
        case TranslateKey.NO_CONTENT_TITLE:
            return arabic?.myNewsWriters?.noContent;
        case TranslateKey.DRAWER_CALL_US:
            return arabic?.drawer?.callUs;
        case TranslateKey.CONTACT_US_NAME:
            return arabic?.contactUs?.name;
        case TranslateKey.CONTACT_US_EMAIL:
            return arabic?.contactUs?.email;
        case TranslateKey.CONTACT_US_LETTER:
            return arabic?.contactUs?.yourLetter;
        case TranslateKey.CONTACT_US_SEND:
            return arabic?.contactUs?.send;
        case TranslateKey.TEXT_ALERT:
            return arabic?.profileSetting?.alert;
        case TranslateKey.COMMON_OK:
            return arabic?.common?.ok;
        case TranslateKey.LISTEN_TO_ARTICLE:
            return arabic?.opinionArticleDetail?.listenToArticle;
        case TranslateKey.ONBOARD_SUCCESS_MESSAGE:
            return arabic?.onboardSuccess?.successMessage;
        case TranslateKey.ONBOARD_SUCCESS_MAIL_ACKNOWLEDGEMENT:
            return arabic?.onboardSuccess?.mailAcknowledgement;
        case TranslateKey.ONBOARD_SUCCESS_GO_TO_HOME:
            return arabic?.onboardSuccess?.goToHome;
        case TranslateKey.ONBOARD_SUCCESS_GO_TO_MY_NEWS:
            return arabic?.onboardSuccess?.goToMyNews;
        case TranslateKey.WEATHER_DETAILS_SUNRISE:
            return arabic?.weatherDetail?.sunrise;
        case TranslateKey.WEATHER_DETAILS_SUNSET:
            return arabic?.weatherDetail?.sunset;
        case TranslateKey.WEATHER_DETAILS_SIDEBAR:
            return arabic?.weatherDetail?.sidebarTitle;
        case TranslateKey.WEATHER_DETAILS_MAX:
            return arabic?.weatherDetail?.max;
        case TranslateKey.WEATHER_DETAILS_HUMIDITY:
            return arabic?.weatherDetail?.humidity;
        case TranslateKey.WEATHER_DETAILS_SPEED:
            return arabic?.weatherDetail?.speed;
        case TranslateKey.WEATHER_DETAILS_KMH:
            return arabic?.weatherDetail?.kmh;
        case TranslateKey.WEATHER_DETAILS_VISIBILITY:
            return arabic?.weatherDetail?.visibility;
        case TranslateKey.WEATHER_DETAILS_PRESSURE:
            return arabic?.weatherDetail?.pressure;
        case TranslateKey.WEATHER_DETAILS_SEA_CONDITION:
            return arabic?.weatherDetail?.seaCondition;
        case TranslateKey.WEATHER_DETAILS_KM:
            return arabic?.weatherDetail?.km;
        case TranslateKey.WEATHER_DETAILS_MBAR:
            return arabic?.weatherDetail?.mbar;
        case TranslateKey.WEATHER_DETAILS_ENABLE_LOCATION:
            return arabic?.weatherDetail?.enableLocation;
        case TranslateKey.OPINION_SLIDER_TITLE:
            return arabic?.latestNewsTab?.sectionWriters?.sliderLeftHeader;
        case TranslateKey.ADVERTISE_WITH_US:
            return arabic?.drawer?.advertiseWithUs;
        case TranslateKey.ABOUT_THE_MIDDLE_EAST:
            return arabic?.drawer?.aboutTheMiddleEast;
        case TranslateKey.TERMS_OF_USE:
            return arabic?.drawer?.termsOfUse;
        case TranslateKey.EDITORS_PICK_HEADER_TITLE:
            return arabic?.latestNewsTab?.editorsPick?.headerRight;
        case TranslateKey.WEATHER_NO_INFORMATION_TEXT:
            return arabic?.weatherDetail?.noInformation;
        case TranslateKey.CONTENT_BUNDLE_WIDGET_TITLE:
            return arabic?.articleDetail?.contentBundleWidgetTitle;
        case TranslateKey.ARCHIVED_ARTICLE_SECTION_TITLE:
            return arabic?.latestNewsTab?.archivedArticle?.headerTitle;
        case TranslateKey.LIVE_TAG_TITLE:
            return arabic?.displayTag?.liveTagTitle;
        case TranslateKey.LIVE_TAG_TITLE:
            return arabic?.displayTag?.specialTagTitle;
        case TranslateKey.LIVE_TAG_TITLE:
            return arabic?.displayTag?.analysisTagTitle;
        case TranslateKey.CREATE_ACCOUNT_DESCRIPTION:
            return arabic?.notRegisteredPopUp?.createAccountDescription;
        case TranslateKey.NOT_SUBSCRIBED_POP_UP:
            return arabic?.notRegisteredPopUp?.notSubscribed;
        case TranslateKey.SAVE_ARTICLE_TO_YOUR_FAVOURITES:
            return arabic?.notRegisteredPopUp?.saveArticleToYourFavourite;
        case TranslateKey.SIGN_UP_POP_UP:
            return arabic?.notRegisteredPopUp?.signUp;
        case TranslateKey.LOG_IN_POP_UP:
            return arabic?.notRegisteredPopUp?.logIn;
        case TranslateKey.OK_TEXT:
            return arabic?.profile?.userDetail?.okText;
        case TranslateKey.REQUIRE_ACCESS:
            return arabic?.profile?.userDetail?.requireAccess;
        case TranslateKey.REQUEST_CAMERA_ACCESS_MESSAGE:
            return arabic?.profile?.userDetail?.requestCameraAccessMessage;
        case TranslateKey.NAME_PLACE_HOLDER:
            return arabic?.profile?.userDetail?.nameTitle;
        case TranslateKey.PLEASE_ENTER_THE_NAME:
            return arabic?.profile?.userDetail?.pleaseEnterTheName;
        case TranslateKey.TRY_AGAIN:
            return arabic?.profile?.userDetail?.tryAgain;
        case TranslateKey.PASSWORD_CHANGED_SUCCESSFULLY:
            return arabic?.profile?.userDetail?.passwordChangedSuccessfully;
        case TranslateKey.OLD_PASSWORD_DOES_NOT_MATCH:
            return arabic?.profile?.userDetail?.oldPasswordDoesNotMatch;
        case TranslateKey.OPEN_CAMERA_OPTION:
            return arabic?.profile?.userDetail?.openCameraOption;
        case TranslateKey.OPEN_GALLERY_OPTION:
            return arabic?.profile?.userDetail?.chooseFromGallery;
        case TranslateKey.CANCEL:
            return arabic?.profile?.userDetail?.cancelText;
        case TranslateKey.SUCCESS:
            return arabic?.profile?.userDetail?.success;
        case TranslateKey.OPINION_LISTEN_TO_ARTICLE_LIST:
            return arabic?.opinion?.listenToArticleText;
        case TranslateKey.FAVORITE_FILTERS_EVERYONE:
            return arabic?.favorite?.filters?.everyone;
        case TranslateKey.ONBOARD_NEWSLETTER_SUBSCRIBED:
            return arabic?.onBoard?.newsLetter?.subscribed;
        case TranslateKey.ONBOARD_NEWSLETTER_NOT_SUBSCRIBED:
            return arabic?.onBoard?.newsLetter?.notSubscribed;
        case TranslateKey.MY_NEWS_TAB_WRITERS:
            return arabic?.myNewsTab?.writers;
        case TranslateKey.MY_NEWS_TAB_TOPICS:
            return arabic?.myNewsTab?.topics;
        case TranslateKey.MY_NEWS_TAB_MEDIA:
            return arabic?.myNewsTab?.media;
        case TranslateKey.PODCAST_PROGRAM_RETURN:
            return arabic?.podcastProgram?.return;
        case TranslateKey.SEARCH_PLACEHOLDER:
            return arabic?.searchScreen?.placeholder;
        case TranslateKey.VIDEO_DETAIL_EMPLOYMENT:
            return arabic?.videoDetail?.employement;
        case TranslateKey.OPINION_ARTICLE_RETURN:
            return arabic?.opinionArticleDetail?.return;
        case TranslateKey.SECTION_COMBO_ONE_HEADER_RIGHT:
            return arabic?.latestNewsTab?.sectionComboOne?.headerRight;
        case TranslateKey.PODCAST_HOME_LISTEN_TO_PODCAST:
            return arabic?.podcastHome?.listen_to_podcast;
        case TranslateKey.MOST_READ_TITLE:
            return arabic?.mostRead?.mostReadTitle;
        case TranslateKey.OPINION_WRITERS:
            return arabic?.opinion?.opinionWriters;
        case TranslateKey.PODCAST_EPISODE_LISTEN_TO_EPISODE:
            return arabic?.podcastEpisode?.listenToEpisode;
        case TranslateKey.OPINION_ARTICLE_DETAIL_RELATED_OPINION_TITLE:
            return arabic?.opinionArticleDetail?.relatedOpinionTitle;
        case TranslateKey.CATEGORY_PAGE_VIDEO_CONTENT:
            return arabic?.categoryPage?.videoContent;
        case TranslateKey.FAVORITE_FILTERS_ARTICLES:
            return arabic?.favorite?.filters?.articles;
        case TranslateKey.FAVORITE_FILTERS_VIDEO:
            return arabic?.favorite?.filters?.video;
        case TranslateKey.FAVORITE_FILTERS_OPINION:
            return arabic?.favorite?.filters?.opinion;
        case TranslateKey.FAVORITE_FILTERS_PODCAST:
            return arabic?.favorite?.filters?.podcast;
        case TranslateKey.FAVORITE_FILTERS_ALBUM:
            return arabic?.favorite?.filters?.album;
        case TranslateKey.SIGNIN_LOGIN_ACCOUNT:
            return arabic?.signIn?.loginAccount;
        case TranslateKey.SIGNIN_SIGNUP:
            return arabic?.signIn?.signUp;
        case TranslateKey.SIGNIN_INFO:
            return arabic?.signIn?.signInInfo;
        case TranslateKey.SIGNIN_SIGNUP_RECEIVE:
            return arabic?.signIn?.signUpReceive;
        case TranslateKey.SIGNIN_EMAIL:
            return arabic?.signIn?.email;
        case TranslateKey.SIGNIN_PASSWORD:
            return arabic?.signIn?.password
        case TranslateKey.SIGNIN_FORGOT_PASSWORD:
            return arabic?.signIn?.forgotPassword
        case TranslateKey.SIGNIN:
            return arabic?.signIn?.signIn
        case TranslateKey.SIGNIN_OR:
            return arabic?.signIn?.or
        case TranslateKey.SIGNIN_LOGIN_FACEBOOK:
            return arabic?.signIn?.loginFacebook
        case TranslateKey.SIGNIN_LOGIN_GOOGLE:
            return arabic?.signIn?.loginGoogle
        case TranslateKey.SIGNIN_LOGIN_APPLE:
            return arabic?.signIn?.loginApple;
        case TranslateKey.FAVORITE_ARTICLES_THAT_INTEREST_YOU:
            return arabic?.favorite?.articles_that_interest_you;
        case TranslateKey.FAVORITE_ARTICLE_FROM_YOUR_FAVORITE_WRITERS:
            return arabic?.favorite?.articles_from_your_favorite_writers;
        case TranslateKey.PODCAST_EPISODE_MORE_EPISODES:
            return arabic?.podcastEpisode?.moreEpisodes;
        case TranslateKey.PODCAST_PROGRAM_EPISODES:
            return arabic?.podcastProgram?.episodes;
        case TranslateKey.PODCAST_EPISODE_LISTEN_TO:
            return arabic?.podcastEpisode?.listenTo;
        case TranslateKey.SEARCH_NOT_FOUND:
            return arabic?.searchScreen?.notFound;
        case TranslateKey.CLEAR_SEARCH_HISTORY:
            return arabic?.searchScreen.clearSearchHistory;
        case TranslateKey.VIDEO_DETAIL_WATCH:
            return arabic?.videoDetail.watch;
        case TranslateKey.COMMON_ALERT:
            return arabic?.common.alert;
        case TranslateKey.COMMON_NO_INTERNET_CONNECTION:
            return arabic?.common.noInternetConnection;
        case TranslateKey.COMMON_SOMETHING_WENT_WRONG:
            return arabic?.common?.somthingWentWrong;
        case TranslateKey.TERMS_AND_CONDITION:
            return arabic?.terms_and_condition;
        case TranslateKey.SIGNIN_SKIP:
            return arabic?.signIn?.skip;
        case TranslateKey.SIGNIN_AGREE_TO:
            return arabic?.signIn?.agreeTo;
        case TranslateKey.SIGNIN_TERMS_AND_CONDITION:
            return arabic?.signIn?.termsAndConditions;
        case TranslateKey.VERIFY_MAIL_AND_PASSWORD_AND_TRY_AGAIN:
            return arabic?.signIn?.verifyMailAndPasswordAndTryAgain;
        case TranslateKey.CREDENTIALS_ARE_INCORRECT:
            return arabic?.signIn?.credentialsAreIncorrect;
        case TranslateKey.SIGNIN_RETURN:
            return arabic?.signIn?.return;
        case TranslateKey.SIGNUP_RETURN:
            return arabic?.signUp?.return;
        case TranslateKey.SIGNUP:
            return arabic?.signUp?.signUp;
        case TranslateKey.SIGNUP_CREATE_ACCOUNT:
            return arabic?.signUp?.createAccount;
        case TranslateKey.SIGNUP_ACCOUNT_DESCRIPTION:
            return arabic?.signUp?.accountDescription;
        case TranslateKey.SIGNUP_EMAIL:
            return arabic?.signUp?.email;
        case TranslateKey.SIGNUP_PASSWORD:
            return arabic?.signUp?.password;
        case TranslateKey.SIGNUP_CONFIRM_PASSWORD:
            return arabic?.signUp?.confirmPassword;
        case TranslateKey.CONTACT_US_DO_YOU_HAVE_QUESTIONS:
            return arabic?.contactUs?.doYouHaveQuestions;
        case TranslateKey.CONTACT_US_DESCRIPTION:
            return arabic?.contactUs?.description;
        case TranslateKey.FAVORITE_TAB_ITEM_ARCHIEVES:
            return arabic?.favorite?.tabItem?.archives;
        case TranslateKey.SIGN_UP_PH_SIGNUP:
            return arabic?.signUpPH?.signUp;
        case TranslateKey.SIGN_UP_PH_MESSAGE:
            return arabic?.signUpPH?.message;
        case TranslateKey.SIGN_UP_PH_TITLE:
            return arabic?.signUpPH?.title;
        case TranslateKey.ONBOARD_FOLLOW_FAVORITE_AUTHOR_TITLE:
            return arabic?.onBoard?.followFavoriteAuthor?.title;
        case TranslateKey.ONBOARD_FOLLOW_FAVORITE_AUTHOR_DESCRIPTION:
            return arabic?.onBoard?.followFavoriteAuthor?.description;
        case TranslateKey.ONBOARD_COMMON_NEXT_BUTTON:
            return arabic?.onBoard?.common?.nextBtn;
        case TranslateKey.FORGOT_PASSWORD_CHECK_YOUR_MAIL:
            return arabic?.ForgotPassword?.checkYourMail;
        case TranslateKey.FORGOT_PASSWORD_INSTRUCTION:
            return arabic?.ForgotPassword?.instruction;
        case TranslateKey.FORGOT_PASSWORD_OPEN_MAIL_APP:
            return arabic?.ForgotPassword?.openMailApp;
        case TranslateKey.FORGOT_PASSWORD_SKIP_OPTION:
            return arabic?.ForgotPassword?.skipOption;
        case TranslateKey.SIGNIN_RIGHTS:
            return arabic?.signIn?.rights;
        case TranslateKey.ONBOARD_KEEP_NOTIFIED_TITLE:
            return arabic?.onBoard?.keepNotified?.title;
        case TranslateKey.ONBOARD_KEEP_NOTIFIED_DESCRIPTION:
            return arabic?.onBoard?.keepNotified?.description;
        case TranslateKey.ONBOARD_COMMON_COMPLETED:
            return arabic?.onBoard?.common?.completed;
        case TranslateKey.ONBOARD_COMMON_DONE:
            return arabic?.onBoard?.common?.done;
        case TranslateKey.ONBOARD_SELECT_TOPICS_TITLE:
            return arabic?.onBoard?.selectTopics?.title;
        case TranslateKey.ONBOARD_SELECT_TOPICS_DESCRIPTION:
            return arabic?.onBoard?.selectTopics?.description;
        case TranslateKey.MANAGE_MY_NEWS_ALERT:
            return arabic?.manageMyNews?.alert;
        case TranslateKey.MANAGE_MY_NEWS_REMOVE_AUTHOR:
            return arabic?.manageMyNews?.removeAuthor;
        case TranslateKey.MANAGE_MY_NEWS_REMOVE:
            return arabic?.manageMyNews?.remove;
        case TranslateKey.MANAGE_MY_NEWS_REMOVE_TOPIC:
            return arabic?.manageMyNews?.removeTopic;
        case TranslateKey.MANAGE_MY_NEWS_MY_FAVORITE_BOOKS:
            return arabic?.manageMyNews?.myFavoriteBooks;
        case TranslateKey.MANAGE_MY_NEWS_CONTINUE_READING_MORE_BOOKS:
            return arabic?.manageMyNews?.continueReadingMoreBooks;
        case TranslateKey.MANAGE_MY_NEWS_MY_FAVORITE_TOPICS:
            return arabic?.manageMyNews?.myFavoriteTopics;
        case TranslateKey.MANAGE_MY_NEWS_FOLLOW_MORE_TOPICS:
            return arabic?.manageMyNews?.followMoreTopics;
        case TranslateKey.NEW_PASSWORD_CREATE_NEW_PASSWORD:
            return arabic?.profile?.newPassword?.createNewPassword;
        case TranslateKey.NEW_PASSWORD_DESCRIPTION:
            return arabic?.profile?.newPassword?.passwordDescription;
        case TranslateKey.NEW_PASSWORD_WARNING:
            return arabic?.profile?.newPassword?.passwordWarning;
        case TranslateKey.NEW_PASSWORD_MATCH_WARNING:
            return arabic?.profile?.newPassword?.passwordMatchWarning;
        case TranslateKey.NEW_PASSWORD_SET_NEW_PASSWORD:
            return arabic?.profile?.newPassword?.setNewPassword;
        case TranslateKey.PHOTO_GALLERY_TITLE:
            return arabic?.photoGallery?.title;
        case TranslateKey.PROFILE_SETTING_MANAGE_MY_NOTIFICATION:
            return arabic?.profileSetting?.manageMyNotification;
        case TranslateKey.PROFILE_SETTING_MANAGE_MY_NEWS:
            return arabic?.profileSetting?.manageMyNews;
        case TranslateKey.PROFILE_SETTING_MY_NEWS_LETTER:
            return arabic?.profileSetting?.myNewsLetter;
        case TranslateKey.PROFILE_SETTING_MY_ACCOUNT_DETAILS:
            return arabic?.profileSetting?.myAccountDetails;
        case TranslateKey.PROFILE_SETTING_APP_APPEARANCE:
            return arabic?.profileSetting?.appAppearance;
        case TranslateKey.PROFILE_SETTING_EXIT:
            return arabic?.profileSetting?.exit;
        case TranslateKey.PROFILE_SETTING_DARK_MODE:
            return arabic?.profileSetting?.darkMode;
        case TranslateKey.PROFILE_SETTING_LIGHT_MODE:
            return arabic?.profileSetting?.lightMode;
        case TranslateKey.PROFILE_SETTING_WELCOME:
            return arabic?.profileSetting?.welcome;
        case TranslateKey.PROFILE_SETTING_CHANGE_ENVIRONMENT:
            return arabic?.profileSetting?.changeEnvironment;
        case TranslateKey.PROFILE_SETTING_NOT_SUBSCRIBED:
            return arabic?.profileSetting?.notSubscribed;
        case TranslateKey.PROFILE_SETTING_LOGIN_FEATURE:
            return arabic?.profileSetting?.loginFeature;
        case TranslateKey.PROFILE_SETTING_SIGN_UP:
            return arabic?.profileSetting?.signUp;
        case TranslateKey.PROFILE_SETTING_LOG_OUT_ALERT_MESSAGE:
            return arabic?.profileSetting?.logoutAlertMessage;
        case TranslateKey.PROFILE_SETTING_ALERT:
            return arabic?.profileSetting?.alert;
        case TranslateKey.PROFILE_SETTING_DEBUG:
            return arabic?.profileSetting?.debug;
        case TranslateKey.PROFILE_SETTING_PRODUCTION:
            return arabic?.profileSetting?.production;
        case TranslateKey.ON_BOARD_COMMON_SKIP:
            return arabic?.onBoard?.common?.skip;
        case TranslateKey.ON_BOARD_COMMON_RETURN:
            return arabic?.onBoard?.common?.return;
        case TranslateKey.PROFILE_SETTING_ARITHMETIC:
            return arabic?.profileSetting?.arithmetic;
        case TranslateKey.PROFILE_USER_DETAIL_TITLE:
            return arabic?.profile?.userDetail?.userDetailTitle;
        case TranslateKey.MANAGE_MY_NEWS_HEADER:
            return arabic?.manageMyNews?.header;
        case TranslateKey.USER_DETAIL_SELECT_BIRTHDAY_TEXT:
            return arabic?.profile?.userDetail?.selectBirthdayText;
        case TranslateKey.USER_DETAIL_YOUR_DETAILS:
            return arabic?.profile?.userDetail?.yourDetails;
        case TranslateKey.USER_DETAIL_PASSWORD_TITLE:
            return arabic?.profile.userDetail?.passwordTitle;
        case TranslateKey.USER_DETAIL_USER_NAME_TITLE:
            return arabic?.profile?.userDetail?.userNameTitle;
        case TranslateKey.USER_DETAIL_BIRTHDAY_TITLE:
            return arabic?.profile?.userDetail?.birthdayTitle;
        case TranslateKey.CONFIRM:
            return arabic?.profile?.userDetail?.confirmText;
        case TranslateKey.USER_DETAIL_SELECT_THE_DATE:
            return arabic?.profile?.userDetail?.selectTheDate;
        case TranslateKey.USER_DETAIL_OCCUPATION_TITLE:
            return arabic?.profile?.userDetail?.occupationTitle;
        case TranslateKey.USER_DETAIL_OCCUPATION_PLACEHOLDER:
            return arabic?.profile?.userDetail?.occupationPlaceholder;
        case TranslateKey.USER_DETAIL_UPDATE_BUTTON_TEXT:
            return arabic?.profile?.userDetail?.updateButtonText;
        case TranslateKey.USER_DETAIL_OLD_PASSWORD:
            return arabic?.profile?.userDetail?.oldPassword;
        case TranslateKey.USER_DETAIL_NEW_PASSWORD:
            return arabic?.profile?.userDetail?.newPassword;
        case TranslateKey.USER_DETAIL_CONFIRM_NEW_PASSWORD:
            return arabic?.profile?.userDetail?.confirmNewPassword;
        case TranslateKey.USER_DETAIL_MOVE_AND_SCALE:
            return arabic?.profile?.userDetail?.moveAndScale;
        case TranslateKey.ONBOARD_NEWSLETTER_TITLE:
            return arabic?.onBoard?.newsLetter?.title;
        case TranslateKey.ONBOARD_NEWSLETTER_DESCRIPTION:
            return arabic?.onBoard?.newsLetter?.description;
        case TranslateKey.FOLLOW:
            return arabic?.opinionArticleDetail?.follow;
        case TranslateKey.FOLLOWER:
            return arabic?.opinionArticleDetail?.follower;
        case TranslateKey.PODCAST_WIDGET_HEADER_LEFT:
            return arabic?.podcastWidget?.headerLeft;
        case TranslateKey.PODCAST_WIDGET_HEADER_RIGHT:
            return arabic?.podcastWidget?.headerRight;
        default: return ''
    }
}

enum flatListUniqueKey {
    ARTICLE_SECTION = 'ArticleSection',
    SHORT_ARTICLE = 'shortArticle',
    CAROUSEL_WIDGET = 'carousel',
    STORY_WIDGET = 'StoryWidget',
    AUTHOR_WIDGET = 'AuthorWidget',
    MOST_READ_LIST = 'MostReadList',
    BANNER_ARTICLE_LIST = 'BannerArticleList',
    FOLLOW_FAVORITE_AUTHOR_WIDGET = 'FollowFavoriteAuthorWidget',
    KEEP_NOTIFIED_WIDGET = 'KeepNotifiedWidget',
    RELATED_ARTICLE_WIDGET = 'RelatedArticleWidget',
    OPINION_WRITER_SECTION = 'OpinionWriterSection',
    OPINION_WRITER_ARTICLES_SECTION = 'OpinionWriterArticleSection',
    PODCAST_CARD_SECTION = 'PodcastCardSection',
    MOST_PLAYED_CARD = 'MostPlayedcard',
    LATEST_NEWS_SUMMARY_WIDGET = 'LatestNewsSummarySection',
    EDITORS_PICK_WIDGET = 'EditorPickWidget',
    PODCAST_OPINION_ARTICLE_WIDGET = 'PodcastOpinionArticleSection',
    INTERESTED_TOPICS = 'InterestedTopics',
    NEWS_FEED = 'NewsFeed',
    NEWS_LETTER_WIDGET = 'NewsLetterWidget',
    CONTENT_FOR_YOU = 'ContentForYou',
    TAB_ARTICLE_SECTION_ONE = 'TAB_ARTICLE_SECTION_ONE',
    TAB_ARTICLE_SECTION_TWO = 'TAB_ARTICLE_SECTION_TWO',
    VIDEO_CONTENT = 'VideoContent',
    TAB_PODCAST_HOME = 'TAB_PODCAST_HOME',
    PHOTO_GALLERY_LIST = 'PhotoGalleryList',
    ARTICLE_GRID_VIEW = 'ArticleGridView',
    ARTICLE_IMAGE_VIEW = 'ArticleImageView',
}

const storeInfo = [
    {
        appCommon: {
            theme: Theme.LIGHT,
            isAppFirstSession: true,
            articleFontSize: ArticleFontSize.normal,
            serverEnvironment: ServerEnvironment.PRODUCTION
        },
        home: {
            isLoading: false,
            homeData: {
                homeData: ''
            },
            error: '',
        },
        latestNewsTab: {
            isLoading: true,
            error: '',
            ticker: [],
            hero: [],
            heroList: [],
            topList: [],
            opinionList: [],
            sectionComboOne: [],
            sectionComboTwo: [],
            sectionComboThree: [],
            sectionComboFour: [],
            podcastHome: [],
            sectionComboFive: [],
            sectionComboSix: [],
            sectionComboSeven: [],
            coverageInfo: [],
            featuredArticle: [],
            horizontalArticle: [],
            editorsChoice: [],
            spotlight: [],
            spotlightArticleSection: [],
            coverageInfoLoaded: false,
            featuredArticleLoaded: false,
            horizontalArticleLoaded: false,
            opinionLoaded: false,
            podcastHomeLoaded: false,
            editorChoiceLoaded: false,
            sectionComboOneLoaded: false,
            sectionComboTwoLoaded: false,
            sectionComboThreeLoaded: false,
        },
        articleDetail: {
            isLoading: true,
            error: '',
            articleDetailData: [],
            relatedArticleData: [],
            pager: {},
            articleSectionData: [],
            articleSectionLoaded: false,
            refreshBookmarkDetail: true,
        },
        search: {
            searchData: [],
            error: '',
            isLoading: false,
            searchHistory: [],
        },
        mostRead: {
            mostReadData: [],
            error: '',
            isLoading: false,
        },
        opinionWriter: {
            opinionWriterData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
            error: '',
            isLoading: false
        },
        opinionsReducer: {
            opinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
            error: '',
            isLoading: false,
            writerOpinionLoading: true,
            writerOpinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
            writerOpinionError: '',
            homeOpinionNid: '',
        },
        sideMenu: {
            sideMenuData: [],
            error: '',
            isLoading: false,
        },
        notificationSaveToken: {
            SaveTokenInfo: { id: 2, message: '' },
            SaveTokenAfterRegistraionInfo: { message: '' },
            error: '',
            isLoading: false,
        },
        weatherDetails: {
            isLoading: false,
            WeatherDetailInfo: {
                city: {
                    id: 0,
                    name: '',
                    country: '',
                    timezone: 0
                },
                cod: '',
                cnt: 0,
                list: [],
            },
            WeatherDetailVisibilityInfo: {
                visibility: 0
            },
            error: '',
        },
        sectionArticles: {
            sectionArticlesData: {
                rows: [],
                pager: { current_page: 0, items_per_page: '' }
            },
            error: '',
            isLoading: false
        },
        newsViewReducer: {
            heroListData: {
                rows: [],
                pager: { current_page: 0, items_per_page: '' }
            },
            topListData: [],
            bottomListData: {
                rows: [],
                pager: { current_page: 0, items_per_page: '' }
            },
            error: '',
            isLoading: false,

        },
        allWriters: {
            allWritersData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
            error: '',
            isLoading: false,
            sendAuthorInfo: {},
            selectedAuthorsData: {},
            allSelectedWritersDetailsList: [],
            selectedAuthorLoading: false,
            selectedDataFromOnboard: [],
        },
        allSiteCategories: {
            allSiteCategoriesData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
            error: '',
            isLoading: false,
            sendTopicInfo: {},
            selectedTopicsData: {},
        },
        termsAndAboutUs: {
            isLoading: true,
            data: [],
            error: ''
        },
        register: {
            userInfo: null,
            error: '',
            isLoading: false,
            socialLoginInProgress: false,
        },
        topMenu: {
            topMenuData: [],
            error: '',
            isLoading: false,
        },
        opinionArticleDetail: {
            isLoading: true,
            error: '',
            opinionArticleDetailData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
            isLoadingRelatedOpinion: true,
            relatedOpinionError: '',
            relatedOpinionListData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
            mediaData: {}
        },
        bookmark: {
            isLoading: true,
            error: '',
            sendBookMarkSuccessInfo: {},
            bookmarkedSuccessInfo: [],
            bookmarkDetailSuccessInfo: [],
            removeBookmarkInfo: {},
            removeBookmarkError: '',
            getBookmarkDetailError: '',
            bookmarkDetailLoading: false,
            filteredBookmarkDetailInfo: [],
        },
        newsLetters: {
            error: '',
            isLoading: false,
            sendNewsLettersInfo: {},
            selectedNewsLettersData: {},
            isMyNewsLoading: false,
            myNewsError: '',
            myNewsLetters: {},
            selectedDataFromNewsLetterOnboard: [],
        },
        keepNotified: {
            isLoading: true,
            sendSelectedError: '',
            sendSelectedNotificationInfo: {},
            getSelectedNotificationInfo: {},
            getSelectedError: '',
            allNotificationList: {},
            allNotificationListError: '',
            isMyNotificationLoading: false,
        },
        podcast: {
            podcastListData: [],
            podcastEpisodeData: [],
            error: '',
            isLoading: true,
            selectedNewsLettersData: {}
        },
        contentForYou: {
            favouriteOpinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
            error: '',
            isLoading: false,
            favouriteArticlesData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
            articleError: '',
            isArticleLoading: false,
        },
        changePassword: {
            error: '',
            isLoading: true,
            response: {}
        },
        userDetails: {
            userProfileData: {},
            error: '',
            isLoading: false,
            sendUserInfo: {},
            userDetail: null
        },
        podcastReducer: {
            podcastListData: [],
            podcastEpisodeData: [],
            error: '',
            isLoading: true,
        },
        login: {
            loginData: null,
            error: '',
            isLoading: false,
            isSkipped: false,
            forgotPasswordResponse: {}
        },
        emailCheck: {
            emailCheckData: null,
            error: '',
            isLoading: false,
            actionType: '',
        },
        writerDetail: {
            writersDetail: [],
            error: 'error',
            isLoading: true,
        },
        videoList: {
            videoData: [],
            error: '',
            isLoading: false,
        },
        documentaryVideo: {
            videoDocumentaryData: [],
            videoDocumentaryError: '',
            isVideoLoading: false,
        },
        appPlayer: {
            showMiniPlayer: false,
            selectedTrack: null,
            isPlaying: false,
            showControl: false
        },
        contactUsInfo: {
            isLoading: false,
            sendContactInfoSuccess:
            {
                code: 1,
                message: ''
            },
            sendContactInfoError: ''
        },
        albumList: {
            albumData: {
                rows: [],
                pager: { current_page: 0, items_per_page: '', total_pages: 0 },
            },
            error: '',
            isLoading: false,
            albumDetailData: {
                rows: [],
                pager: { current_page: 0, items_per_page: '', total_pages: 0 },
            },
            albumDetailError: '',
            albumDetailLoading: false,
        },
        journalist: {
            isLoading: false,
            journalistArticle: [],
            journalistArticleError: '',
            journalistDetail: [],
            error: '',
            isDetailLoading: false,
        },
    },
];

const mockStore = configureStore();
const storeSampleData = mockStore({
    storeInfo,
});

const sampleTextWithFlag: TextWithFlagProps = {
    title: ' يدمّر مسيّرتين بالأجواء اليمنية أُطلقت نحو المملكة',
    titleColor: Styles.color.davyGrey,
    barColor: Styles.color.greenishBlue,
    flag: 'آخر الأخبار',
    flagColor: Styles.color.darkSlateGray,
    labelType: LabelTypeProp.p5,
};

const shortArticleData: ShortArticleProps[] = [
    {
        image: 'https://picsum.photos/200/300',
        created: `لكن لا بد أن كل هذه الأفكار`,
        body: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
        nid: '2982411',
        author: 'يتحمل',
        isBookmarked: true,
        title: 'الأفكار'
    },
    {
        image: 'https://picsum.photos/200/300',
        created: `لكن لا بد أن كل هذه الأفكار`,
        body: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
        nid: '2982411',
        author: 'يتحمل',
        isBookmarked: true,
        title: 'الأفكار'
    },
];

const shortArticleWithTagProperties = {
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3,
};

const heroSectionProperties = {
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.title3,
}

const sortArticleWithTag = {
    image: 'https://picsum.photos/200/300',
    title: 'ميقاتي: استقالة قرداحي كانت ضرورية',
    titleColor: Styles.color.black,
    flag: 'استنكار',
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3,
    nid: '2982216',
    author: 'من ساعاتان',
    created: '2021-05-20T23:04:52+0000'
}

const shortArticleWithTagData: ShortArticleProps[] = Array(5).fill(sortArticleWithTag)

const authorHeaderData: WidgetHeaderProps = {
    headerLeft: {
        title: 'آراء وكتّاب ',
        color: Styles.color.greenishBlue,
        labelType: LabelTypeProp.h2,
    },
    headerRight: {
        title: 'المزيد',
        icon: () => {
            return getSvgImages({
                name: ImagesName.clock,
                size: normalize(12),
                style: { marginRight: normalize(7) }
            })
        },
        color: Styles.color.smokeyGrey,
        labelType: LabelTypeProp.h3,
        clickable: true,
    },
};

const articleFooterSample: articleFooterProps = {
    leftTitle: 'وتمجيد',
    leftTitleColor: Styles.color.greenishBlue,
    rightTitle: 'يتحمل',
    rightIcon: () => {
        return getSvgImages({
            name: ImagesName.clock,
            size: normalize(12),
            style: { marginRight: normalize(7) }
        })
    },
    rightTitleColor: Styles.color.silverChalice,
};

const mostReadItem = {
    image: 'https://picsum.photos/200/300',
    title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
    body: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
    flag: 'استنكار',
    flagColor: Styles.color.greenishBlue,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h3,
    tagStyle: { marginLeft: normalize(16) },
    tagLabelType: LabelTypeProp.p3,
    showDivider: false,
    nid: '123',
    author: '',
    created: '',
    isBookmarked: false,
};

const mostReadData: articleProps[] = [
    {
        tagName: '1',
        ...mostReadItem,
    },
    {
        tagName: '2',
        ...mostReadItem,
    },
    {
        tagName: '3',
        ...mostReadItem,
    },
    {
        tagName: '4',
        ...mostReadItem,
    },
    {
        tagName: '5',
        ...mostReadItem,
    },
    {
        tagName: '6',
        ...mostReadItem,
    },
    {
        tagName: '7',
        ...mostReadItem,
    },
    {
        tagName: '8',
        ...mostReadItem,
    },
    {
        tagName: '9',
        ...mostReadItem,
    },
    {
        tagName: '10',
        ...mostReadItem,
    },
];

const sectionTabItem: TabBarDataProps[] = [
    {
        tabName: 'العالم العربي',
        isSelected: true,
    },
    {
        tabName: 'الرأي',
        isSelected: false,
    },
    {
        tabName: 'بودكاست',
        isSelected: false,
    },
    {
        tabName: 'فيديو',
        isSelected: false,
    },
];

const weatherData = [
    {
        date: '1',
        month: 'الأحد',
        day: 'يونيو',
        selected: true,
    },
    {
        date: '2',
        month: 'العالم',
        day: 'يونيو',
        selected: false,
    },
    {
        date: '3',
        month: 'العالم',
        day: 'يونيو',
        selected: false,
    },
    {
        date: '4',
        month: 'العالم',
        day: 'يونيو',
        selected: false,
    },
    {
        date: '5',
        month: 'العالم',
        day: 'يونيو',
        selected: false,
    },
    {
        date: '6',
        month: 'العالم',
        day: 'يونيو',
        selected: false,
    },
    {
        date: '7',
        month: 'العالم',
        day: 'يونيو',
        selected: false,
    },
];

const searchResults: SearchResultsProps[] = [
    {
        id: '1',
        label: ' تضارب ایرانی بعد انفجار قرب موقع تطير النووي',
    },
    {
        id: '2',
        label: 'ه فيروس الاوميكرون',
    },
    {
        id: '3',
        label: 'اثر انبار مدينة نيوم',
    },
    {
        id: '4',
        label: 'السراع بين فلسطین و اسرائیل',
    },
    {
        id: '5',
        label: 'عنوان لأخر المواضيع بوضع هنا',
    },
    {
        id: '6',
        label: 'عنوان الآخر المواضيع يوضع هنا',
    },
    {
        id: '7',
        label: 'عنوان الاخر المواضيع بوضع هنا',
    },
    {
        id: '8',
        label: 'أخر اخبار مدينه بيوم',
    },
    {
        id: '9',
        label: 'السراع بين فلسطین و اسرائیل',
    },
    {
        id: '10',
        label: 'عنوان لآخر المواضيع بوضع هنا',
    },
    {
        id: '11',
        label: 'عنوان لاخر المواضيع بوضع هنا',
    },
];

const opinionWritersData: any = [
    {
        name: 'غسان الإمام',
        description__value_export: null,
        field_opinion_writer_path_export: null,
        view_taxonomy_term:
            'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92570',
        tid: '92570',
        vid_export: null,
        field_description_export: null,
        field_opinion_writer_path_export_1: null,
        field_opinion_writer_photo_export:
            'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2017/11/14/GhassanAlimam.jpg?itok=PjIkzard',
        parent_target_id_export: [],
    },
    {
        name: 'إياد أبو شقرا',
        description__value_export: null,
        field_opinion_writer_path_export: null,
        view_taxonomy_term:
            'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92571',
        tid: '92571',
        vid_export: null,
        field_description_export: null,
        field_opinion_writer_path_export_1: null,
        field_opinion_writer_photo_export:
            'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2019/03/03/EyadAbuShaqra.jpg?itok=knN3APSy',
        parent_target_id_export: [],
    },
    {
        name: 'عبد الرحمن الراشد',
        description__value_export: null,
        field_opinion_writer_path_export: null,
        view_taxonomy_term:
            'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92572',
        tid: '92572',
        vid_export: null,
        field_description_export: null,
        field_opinion_writer_path_export_1: null,
        field_opinion_writer_photo_export:
            'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2020/12/01/Abdulrahman-alrashid-01122020.png?itok=jHIC2vMz',
        parent_target_id_export: [],
    },
    {
        name: 'أونا هاثاواي وسكوت شابيرو',
        description__value_export: null,
        field_opinion_writer_path_export: null,
        view_taxonomy_term:
            'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92573',
        tid: '92573',
        vid_export: null,
        field_description_export: null,
        field_opinion_writer_path_export_1: null,
        field_opinion_writer_photo_export:
            'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/place-holder-sigalat_18_5.png?itok=Uym7-nDQ',
        parent_target_id_export: [],
    },
    {
        name: 'صالح القلاب',
        description__value_export: null,
        field_opinion_writer_path_export: null,
        view_taxonomy_term:
            'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92574',
        tid: '92574',
        vid_export: null,
        field_description_export: null,
        field_opinion_writer_path_export_1: null,
        field_opinion_writer_photo_export:
            'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/08/30/saleh_1.jpg?itok=PBtrVUNK',
        parent_target_id_export: [],
    },
    {
        name: 'زين العابدين الركابي',
        description__value_export: null,
        field_opinion_writer_path_export: null,
        view_taxonomy_term:
            'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92575',
        tid: '92575',
        vid_export: null,
        field_description_export: null,
        field_opinion_writer_path_export_1: null,
        field_opinion_writer_photo_export:
            'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/353-alrikabi_4.gif?itok=Fgo4PGoT',
        parent_target_id_export: [],
    },
    {
        name: 'ألبرتو تشيروتي',
        description__value_export: null,
        field_opinion_writer_path_export: null,
        view_taxonomy_term:
            'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92576',
        tid: '92576',
        vid_export: null,
        field_description_export: null,
        field_opinion_writer_path_export_1: null,
        field_opinion_writer_photo_export:
            'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/610-hiaghamedi_4.gif?itok=Lksu3ykZ',
        parent_target_id_export: [],
    },
    {
        name: 'صالح بن علي الحمادي',
        description__value_export: null,
        field_opinion_writer_path_export: null,
        view_taxonomy_term:
            'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92577',
        tid: '92577',
        vid_export: null,
        field_description_export: null,
        field_opinion_writer_path_export_1: null,
        field_opinion_writer_photo_export:
            'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/620-hamadi_3.gif?itok=vGLnP-m2',
        parent_target_id_export: [],
    },
    {
        name: 'موفق النويصر',
        description__value_export: null,
        field_opinion_writer_path_export: null,
        view_taxonomy_term:
            'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92578',
        tid: '92578',
        vid_export: null,
        field_description_export: null,
        field_opinion_writer_path_export_1: null,
        field_opinion_writer_photo_export:
            'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/604-Alnowaisir_3.gif?itok=sjyvDSa1',
        parent_target_id_export: [],
    },
    {
        name: 'محمد السلمي',
        description__value_export: null,
        field_opinion_writer_path_export: null,
        view_taxonomy_term:
            'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92579',
        tid: '92579',
        vid_export: null,
        field_description_export: null,
        field_opinion_writer_path_export_1: null,
        field_opinion_writer_photo_export:
            'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/mosilmi_2.jpg?itok=-oLBDYHu',
        parent_target_id_export: [],
    },
];

const opinionWritersArticlesData: any = {
    rows: [
        {
            name: 'غسان الإمام',
            description__value_export: null,
            field_opinion_writer_path_export: null,
            view_taxonomy_term:
                'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92570',
            tid: '92570',
            vid_export: null,
            field_description_export: null,
            field_opinion_writer_path_export_1: null,
            field_opinion_writer_photo_export:
                'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2017/11/14/GhassanAlimam.jpg?itok=PjIkzard',
            parent_target_id_export: [],
        },
        {
            name: 'إياد أبو شقرا',
            description__value_export: null,
            field_opinion_writer_path_export: null,
            view_taxonomy_term:
                'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92571',
            tid: '92571',
            vid_export: null,
            field_description_export: null,
            field_opinion_writer_path_export_1: null,
            field_opinion_writer_photo_export:
                'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2019/03/03/EyadAbuShaqra.jpg?itok=knN3APSy',
            parent_target_id_export: [],
        },
        {
            name: 'عبد الرحمن الراشد',
            description__value_export: null,
            field_opinion_writer_path_export: null,
            view_taxonomy_term:
                'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92572',
            tid: '92572',
            vid_export: null,
            field_description_export: null,
            field_opinion_writer_path_export_1: null,
            field_opinion_writer_photo_export:
                'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2020/12/01/Abdulrahman-alrashid-01122020.png?itok=jHIC2vMz',
            parent_target_id_export: [],
        },
        {
            name: 'أونا هاثاواي وسكوت شابيرو',
            description__value_export: null,
            field_opinion_writer_path_export: null,
            view_taxonomy_term:
                'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92573',
            tid: '92573',
            vid_export: null,
            field_description_export: null,
            field_opinion_writer_path_export_1: null,
            field_opinion_writer_photo_export:
                'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/place-holder-sigalat_18_5.png?itok=Uym7-nDQ',
            parent_target_id_export: [],
        },
        {
            name: 'صالح القلاب',
            description__value_export: null,
            field_opinion_writer_path_export: null,
            view_taxonomy_term:
                'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92574',
            tid: '92574',
            vid_export: null,
            field_description_export: null,
            field_opinion_writer_path_export_1: null,
            field_opinion_writer_photo_export:
                'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/08/30/saleh_1.jpg?itok=PBtrVUNK',
            parent_target_id_export: [],
        },
        {
            name: 'زين العابدين الركابي',
            description__value_export: null,
            field_opinion_writer_path_export: null,
            view_taxonomy_term:
                'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92575',
            tid: '92575',
            vid_export: null,
            field_description_export: null,
            field_opinion_writer_path_export_1: null,
            field_opinion_writer_photo_export:
                'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/353-alrikabi_4.gif?itok=Fgo4PGoT',
            parent_target_id_export: [],
        },
        {
            name: 'ألبرتو تشيروتي',
            description__value_export: null,
            field_opinion_writer_path_export: null,
            view_taxonomy_term:
                'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92576',
            tid: '92576',
            vid_export: null,
            field_description_export: null,
            field_opinion_writer_path_export_1: null,
            field_opinion_writer_photo_export:
                'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/610-hiaghamedi_4.gif?itok=Lksu3ykZ',
            parent_target_id_export: [],
        },
        {
            name: 'صالح بن علي الحمادي',
            description__value_export: null,
            field_opinion_writer_path_export: null,
            view_taxonomy_term:
                'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92577',
            tid: '92577',
            vid_export: null,
            field_description_export: null,
            field_opinion_writer_path_export_1: null,
            field_opinion_writer_photo_export:
                'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/620-hamadi_3.gif?itok=vGLnP-m2',
            parent_target_id_export: [],
        },
        {
            name: 'موفق النويصر',
            description__value_export: null,
            field_opinion_writer_path_export: null,
            view_taxonomy_term:
                'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92578',
            tid: '92578',
            vid_export: null,
            field_description_export: null,
            field_opinion_writer_path_export_1: null,
            field_opinion_writer_photo_export:
                'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/604-Alnowaisir_3.gif?itok=sjyvDSa1',
            parent_target_id_export: [],
        },
        {
            name: 'محمد السلمي',
            description__value_export: null,
            field_opinion_writer_path_export: null,
            view_taxonomy_term:
                'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92579',
            tid: '92579',
            vid_export: null,
            field_description_export: null,
            field_opinion_writer_path_export_1: null,
            field_opinion_writer_photo_export:
                'http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/large/public/2013/09/09/mosilmi_2.jpg?itok=-oLBDYHu',
            parent_target_id_export: [],
        },
    ],
    pager: {
        current_page: 0,
        items_per_page: '10',
    },
};

const podcastCardSectionData: podcastCardProps[] = [
    {
        imageUrl: 'https://picsum.photos/300/200',
        podcastTitle: 'عنوان لبرنامج البودكاست',
        announcerName: 'مع اسم المذيع',
    },
    {
        imageUrl: 'https://picsum.photos/300/200',
        podcastTitle: 'عنوان لبرنامج البودكاست',
        announcerName: 'مع اسم المذيع',
    },
    {
        imageUrl: 'https://picsum.photos/300/200',
        podcastTitle: 'عنوان لبرنامج البودكاست',
        announcerName: 'مع اسم المذيع',
    },
    {
        imageUrl: 'https://picsum.photos/300/200',
        podcastTitle: 'عنوان لبرنامج البودكاست',
        announcerName: 'مع اسم المذيع',
    },
];

const mostPlayedSectionData: ArticleRectangleCardProps[] = [
    {
        trendingNumber: 1,
        imageUrl: 'https://picsum.photos/200',
        title: 'عنوان لملخص آخر أخبار اليوم',
        footerRight: 'الخميس',
        footerLeft: '45 دقيقه',
    },
    {
        trendingNumber: 2,
        imageUrl: 'https://picsum.photos/200',
        title: 'عنوان لملخص آخر أخبار اليوم',
        footerRight: 'الخميس',
        footerLeft: '45 دقيقه',
    },
    {
        trendingNumber: 3,
        imageUrl: 'https://picsum.photos/200',
        title: 'عنوان لملخص آخر أخبار اليوم',
        footerRight: 'الخميس',
        footerLeft: '45 دقيقه',
    },
];

const LatestNewsSummarySectionData: NewsWithImageItemProps[] = [
    {
        imageUrl: 'https://picsum.photos/300/200',
        title: 'ملخص آخر أخبار اليوم',
        description:
            'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
        footerRightLabel: 'الخميس',
        footerLeftLabel: '45 دقيقه',
    },
    {
        imageUrl: 'https://picsum.photos/300/200',
        title: 'ملخص آخر أخبار الجمعة',
        description:
            'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
        footerRightLabel: 'الخميس',
        footerLeftLabel: '45 دقيقه',
    },
    {
        imageUrl: 'https://picsum.photos/300/200',
        title: 'ملخص آخر أخبار اليوم',
        description:
            'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
        footerRightLabel: 'الخميس',
        footerLeftLabel: '45 دقيقه',
    },
    {
        imageUrl: 'https://picsum.photos/300/200',
        title: 'ملخص آخر أخبار الجمعة',
        description:
            'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
        footerRightLabel: 'الخميس',
        footerLeftLabel: '45 دقيقه',
    },
    {
        imageUrl: 'https://picsum.photos/300/200',
        title: 'ملخص آخر أخبار اليوم',
        description:
            'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
        footerRightLabel: 'الخميس',
        footerLeftLabel: '45 دقيقه',
    },
    {
        imageUrl: 'https://picsum.photos/300/200',
        title: 'ملخص آخر أخبار الجمعة',
        description:
            'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين. ',
        footerRightLabel: 'الخميس',
        footerLeftLabel: '45 دقيقه',
    },
];


const editPickData: NewsWithImageItemProps = {
    imageUrl: 'https://picsum.photos/300/200',
    highlightedTitle: 'إسم البودكاست',
    title: 'عنوان حلثه البودكاست',
    footerRightLabel: 'الخميس',
    footerLeftLabel: '45 دقيقه',
}

const EditorsPickSectionData: NewsWithImageItemProps[] = Array(5).fill(editPickData)

const podcastForYouInfo = {
    imageUrl: 'https://picsum.photos/300/200',
    highlightedTitle: 'إسم البودكاست',
    title: 'قضية الطفل المغربي ريان بين أهمية القصة الإنسانية إعلامياً',
}

const podcastForYouSection = Array(5).fill(podcastForYouInfo)

const podcastOpinionData: ArticleRectangleCardProps = {
    imageUrl: 'https://picsum.photos/200',
    title: 'عنوان لملخص آخر أخبار اليوم',
    footerRight: 'الخميس',
    footerLeft: '45 دقيقه',
}
const PodcastOpinionArticleSectionData: ArticleRectangleCardProps[] = Array(3).fill(podcastOpinionData)

const storyWidgetItemData: StoryListItemProps[] = [
    {
        id: '1',
        imageUrl: 'https://picsum.photos/500',
        title: 'كوفيد-19',
        description:
            'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
        buttonTitle: 'امرأ المقالة',
        thumbNail: 'https://picsum.photos/100',
    },
    {
        id: '2',
        imageUrl: 'https://picsum.photos/400',
        title: 'رحلة إلى المريخ',
        description:
            'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
        buttonTitle: 'امرأ المقالة',
        thumbNail: 'https://picsum.photos/100',
    },
    {
        id: '3',
        imageUrl: 'https://picsum.photos/600',
        title: 'كوفيد-19',
        description:
            'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
        buttonTitle: 'امرأ المقالة',
        thumbNail: 'https://picsum.photos/100',
    },
];


const storyWidgetDataInfo = {
    id: '1',
    imageUrl: 'https://picsum.photos/500',
    title: 'رحلة إلى المريخ',
    description:
        'دراسة تؤكد: تلقي جرعتين مختلفتين من لقاحات «كورونا» يعطي مناعة أقوى',
    buttonTitle: 'امرأ المقالة',
    thumbNail: 'https://picsum.photos/100',
}

const storyWidgetData: StoryListProps[] = [
    {
        id: '1',
        data: storyWidgetItemData,
    },
    {
        id: '2',
        data: [storyWidgetDataInfo],
    },
    {
        id: '3',
        data: [storyWidgetDataInfo],
    },
    {
        id: '4',
        data: [storyWidgetDataInfo],
    },
    {
        id: '5',
        data: [storyWidgetDataInfo],
    },
    {
        id: '6',
        data: [storyWidgetDataInfo],
    },
    {
        id: '7',
        data: [storyWidgetDataInfo],
    },
    {
        id: '8',
        data: storyWidgetItemData,
    },
];

const videoTabInfo: VideoItemProps = {
    title: 'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/400',
    videoLabel: 'أمريكا',
    time: '05:22',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    date: '7 ديسمبر ',
    views: '1374',
    shortDescription: 'عامة العصى وجلاها الله عماد الساند مان اوزن النوم ليس لها عنوانا بال ان له دور من الألم الناس الكل سايكي سند عام من المبادلات حول العلمي الدير',
    isBookmarked: false,
    onPressBookmark: () => { }
}

const videoTabData: VideoItemProps[] = Array(5).fill(videoTabInfo)

const newsFeedInfo: NewsFeedProps = {
    title: ' بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات',
    imageUrl: 'https://picsum.photos/300/200',
    videoLabel: 'أمريكا',
    des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    month: 'ديسمبر',
    date: '7',
    titleColor: Styles.color.black,
    barColor: Styles.color.greenishBlue,
    labelType: LabelTypeProp.h2,
}

const newsFeedData: NewsFeedProps[] = Array(4).fill(newsFeedInfo)

const PodcastEpisodeData: any = [
    {
        nid: "29",
        type: "podcast",
        view_node: "http://srpcawsatdev.prod.acquia-sites.com/node/111",
        field_new_sub_title_export: null,
        title: "أول شحنة عسكرية أميركية لـ«الحر» وغرفة عمليات إيرانية في حمص",
        field_duration_export: null,
        field_episode_export: null,
        field_google_podcast_export: null,
        field_podcast_image_export: null,
        field_podcast_sect_export: {
            id: "94842",
            title: "صباح الخير",
            url: "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842",
            bundle: "podcast_section",
            description: "<p class=\"text-align-right\">Breifing</p>\n",
            img_podcast_desktop: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast-banner2.jpg",
            img_podcast_mobile: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast2_0.jpg",
            name: "صباح الخير"
        },
        field_spotify_export: null,
        field_spreaker_episode_export: null,
        field_spreaker_show_export: null,
        field_announcer_name_export: null,
        field_apple_podcast_export: null,
        body_export: null
    },
];

const PodcastListData: any = [
    {
        nid: "29",
        type: "podcast",
        view_node: "http://srpcawsatdev.prod.acquia-sites.com/node/111",
        field_new_sub_title_export: null,
        title: "أول شحنة عسكرية أميركية لـ«الحر» وغرفة عمليات إيرانية في حمص",
        field_duration_export: null,
        field_episode_export: null,
        field_google_podcast_export: null,
        field_podcast_image_export: null,
        field_podcast_sect_export: {
            id: "94842",
            title: "صباح الخير",
            url: "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842",
            bundle: "podcast_section",
            description: "<p class=\"text-align-right\">Breifing</p>\n",
            img_podcast_desktop: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast-banner2.jpg",
            img_podcast_mobile: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast2_0.jpg",
            name: "صباح الخير"
        },
        field_spotify_export: null,
        field_spreaker_episode_export: null,
        field_spreaker_show_export: null,
        field_announcer_name_export: null,
        field_apple_podcast_export: null,
        body_export: null
    },
    {
        nid: "111",
        type: "podcast",
        view_node: "http://srpcawsatdev.prod.acquia-sites.com/node/111",
        field_new_sub_title_export: null,
        title: "أول شحنة عسكرية أميركية لـ«الحر» وغرفة عمليات إيرانية في حمص",
        field_duration_export: null,
        field_episode_export: null,
        field_google_podcast_export: null,
        field_podcast_image_export: null,
        field_podcast_sect_export: {
            id: "94842",
            title: "صباح الخير",
            url: "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842",
            bundle: "podcast_section",
            description: "<p class=\"text-align-right\">Breifing</p>\n",
            img_podcast_desktop: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast-banner2.jpg",
            img_podcast_mobile: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast2_0.jpg",
            name: "صباح الخير"
        },
        field_spotify_export: null,
        field_spreaker_episode_export: null,
        field_spreaker_show_export: null,
        field_announcer_name_export: null,
        field_apple_podcast_export: null,
        body_export: null
    },
];

const PodcastProgramInfoData: PodcastProgramInfoProps = {
    imageUrl: 'https://picsum.photos/200',
    title: 'عنوان لبرنامج البودكاست',
    announcer: 'مع اسم المذيع',
    description: 'أعلنت الشركة المسؤولة عن تأسيس شبكة تواصل اجتماعي مستقبلية للرئيس الأميركي السابق دونالد ترمب والشركة التي ستندمج معها للإدراج في البورصة، السبت.',
    data: PodcastEpisodeData as PodcastVerticalListProps[],
}
const articleSampleData = {
    image: 'https://picsum.photos/200/300',
    title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
    body: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
    tagName: 'الحكومة',
};
const videoArchiveData: VideoItemProps[] = [
    {
        title:
            'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
        imageUrl: 'https://picsum.photos/300/200',
        videoLabel: 'أمريكا',
        des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
        isBookmarked: true,
        onPressBookmark: () => { },
    },
    {
        title:
            'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
        imageUrl: 'https://picsum.photos/300/200',
        videoLabel: 'أمريكا',
        time: '05:22',
        des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
        date: '7 ديسمبر ',
        views: '1374',
        toWatchTitle: 'ديسمبر',
        isBookmarked: true,
        onPressBookmark: () => { },
    },
    {
        title:
            'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
        imageUrl: 'https://picsum.photos/300/200',
        videoLabel: 'أمريكا',
        des: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
        isBookmarked: true,
        onPressBookmark: () => { },
    },
];

const myNewsTopTabData = [
    {
        isSelected: true,
        keyName: 'topics',
        tabName: 'مواضيعي',
    },
    {
        isSelected: false,
        keyName: 'writers',
        tabName: 'كتابي',
    },

    // {
    //   isSelected: false, 
    //   keyName: 'media', 
    //   tabName: 'ميديا',
    // },

]

const journalistDatum = {
    title: 'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    image: 'https://static.srpcdigital.com/styles/1037xauto/public/2022-08/52858.jpg?itok=btM-vIUF',
    news_categories: [{
        title: 'أمريكا',
    }],
    isBookmarked: true,
    nid: '3650826',
    created: '2022-08-05T13:15:45+0100'
}
const journalistData = Array(10).fill(journalistDatum)

const journalistNames = [
    [{
        location: 'الرياض',
        author: 'بندر مسلم',
        tid: '92602',
    },
    {
        location: 'القاهرة',
        author: 'خالد محمود',
        tid: '92602',
    }]]


export type ScreenName = keyof undefined;

const AuthPage = 'AuthPage' as ScreenName;
const AppNavigator = 'AppNavigator' as ScreenName;
const AuthNavigator = 'AuthNavigator' as ScreenName;
const SearchScreen = 'SearchScreen' as ScreenName;
const OnBoardNavigator = 'OnBoardNavigator' as ScreenName;
const HOME_SCREEN = 'HOME';
const AUTH_SCREEN = 'AUTH';
const ARTICLE_DETAIL_SCREEN = 'ARTICLE_DETAIL_SCREEN' as ScreenName;
const SELECT_TOPICS_SCREEN = 'SELECT_TOPICS_SCREEN' as ScreenName;
const FOLLOW_FAVORITE_AUTHOR_SCREEN = 'FOLLOWFAVORITEAUTHORSCREEN' as ScreenName;
const KEEP_NOTIFIED_ONBOARD_SCREEN = 'KEEP_NOTIFIED_ONBOARD_SCREEN' as ScreenName;
const LatestNewsScreen = 'LatestNewsScreen' as ScreenName;
const PodcastProgram = 'PodcastProgram' as ScreenName;
const StoryScreen = 'StoryScreen' as ScreenName;
const SectionArticlesScreen = 'SectionArticlesScreen' as ScreenName;
const PodcastEpisode = 'PodcastEpisode' as ScreenName;
const VideoDetailScreen = 'VideoDetailScreen' as ScreenName;
const SignInPage = 'SignInPage' as ScreenName;
const TERMS_AND_ABOUT_US = 'TERMS_AND_ABOUT_US' as ScreenName;
const SignUpPage = 'SignUpPage' as ScreenName;
const FORGOT_PASSWORD = 'ForgotPassword' as ScreenName;
const SUCCESS_SCREEN = 'SuccessScreen' as ScreenName;
const NEWS_LETTER_SCREEN = 'NewsLetterScreen' as ScreenName;
const PROFILE_SETTING = 'PROFILE_SETTING' as ScreenName
const OPINION_ARTICLE_DETAIL_SCREEN = 'OPINION_ARTICLE_DETAIL_SCREEN' as ScreenName;
const NEW_PASSWORD = 'NewPassword' as ScreenName;
const MANAGE_MY_NEWS_SCREEN = 'MANAGE_MY_NEWS_SCREEN' as ScreenName;
const MANAGE_MY_FAVORITE_AUTHOR_SCREEN = 'MANAGE_MY_FAVORITE_AUTHOR_SCREEN' as ScreenName;
const MANAGE_MY_FAVORITE_TOPICS_SCREEN = 'MANAGE_MY_FAVORITE_TOPICS_SCREEN' as ScreenName;
const USER_DETAIL_SCREEN = 'UserDetailScreen' as ScreenName;
const WEATHER_DETAIL_SCREEN = 'WeatherDetailScreen' as ScreenName;
const VideoPlayerScreen = 'VideoPlayerScreen' as ScreenName;
const WRITERS_DETAIL_SCREEN = 'WriterDetailScreen' as ScreenName
const SectionArticlesParentScreen = 'SectionArticlesParentScreen' as ScreenName
const GAME_SCREEN = 'GameScreen' as ScreenName
const DYNAMIC_GAME_SCREEN = 'DynamicGameScreen' as ScreenName
const DOWNLOAD_NEWS_SCREEN = 'DOWNLOAD_NEWS' as ScreenName
const PDFArchive = 'PDFArchive' as ScreenName
const PDF_EDITOR_VIEW = 'PDFEditorView' as ScreenName
const CONTACT_US_SCREEN = 'ContactUsScreen' as ScreenName
const PHOTO_GALLERY_DETAIL_SCREEN = 'PhotoGalleryDetailScreen' as ScreenName
const JOURNALIST_DETAIL_SCREEN = 'JournalistDetail' as ScreenName
const PODCAST_EPISODE_MODAL = 'PodcastEpisodeModal' as ScreenName;

const HEADER_LOGO = 'headerLogo';
const SEARCH_ICON = 'searchIcon';
const MENU_ICON = 'menuIcon';

const ScreensConstants = {
    HOME_SCREEN,
    HEADER_LOGO,
    SEARCH_ICON,
    MENU_ICON,
    AUTH_SCREEN,
    AuthPage,
    AppNavigator,
    AuthNavigator,
    SearchScreen,
    OnBoardNavigator,
    FOLLOW_FAVORITE_AUTHOR_SCREEN,
    KEEP_NOTIFIED_ONBOARD_SCREEN,
    ARTICLE_DETAIL_SCREEN,
    SELECT_TOPICS_SCREEN,
    LatestNewsScreen,
    PodcastProgram,
    StoryScreen,
    SectionArticlesScreen,
    PodcastEpisode,
    VideoDetailScreen,
    SignInPage,
    TERMS_AND_ABOUT_US,
    SignUpPage,
    FORGOT_PASSWORD,
    SUCCESS_SCREEN,
    NEWS_LETTER_SCREEN,
    PROFILE_SETTING,
    OPINION_ARTICLE_DETAIL_SCREEN,
    NEW_PASSWORD,
    MANAGE_MY_NEWS_SCREEN,
    MANAGE_MY_FAVORITE_AUTHOR_SCREEN,
    MANAGE_MY_FAVORITE_TOPICS_SCREEN,
    USER_DETAIL_SCREEN,
    WEATHER_DETAIL_SCREEN,
    VideoPlayerScreen,
    WRITERS_DETAIL_SCREEN,
    SectionArticlesParentScreen,
    GAME_SCREEN,
    DYNAMIC_GAME_SCREEN,
    DOWNLOAD_NEWS_SCREEN,
    PDFArchive,
    PDF_EDITOR_VIEW,
    CONTACT_US_SCREEN,
    PHOTO_GALLERY_DETAIL_SCREEN,
    JOURNALIST_DETAIL_SCREEN,
    PODCAST_EPISODE_MODAL,
};

const DEFAULT_ALERT_TITLE = '';
const DEFAULT_ALERT_MESSAGE = 'Need to implement';
const VALID_URL_REGEX = "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
const PROFILE = 'Profile'
const DURATION = ''
const CONST_OK = 'نعم'

//Permission
const REQUIRE_ACCESS = 'تتطلب الوصول'
const REQUEST_CAMERA_ACCESS_MESSAGE = 'يرجى تقديم إذن للوصول إلى كاميرا الجهاز'

//Podcast Spreaker
const PODCAST_URL_SUFFIX = '/play.mp3'

//Date picker
const DEFAULT_MINIMUM_DATE = '1940-01-01'   // need to confirm

//Social Media URLs
const FACEBOOK_URL = 'https://www.facebook.com/asharqalawsat.a';
const INSTAGRAM_URL = 'https://www.instagram.com/asharqalawsat/';
const LINKEDIN_URL = 'https://www.linkedin.com/company/asharq-alawsat';
const TWITTER_URL = 'https://twitter.com/aawsat_News';

const FACEBOOK_APP_URL = isIOS ? 'fb://page/?id=145726335465699' : 'fb://page/145726335465699';
const INSTAGRAM_APP_URL = 'instagram://user?username=asharqalawsat';
const LINKEDIN_APP_URL = 'linkedin://company/asharq-alawsat';
const TWITTER_APP_URL = 'twitter://user?screen_name=aawsat_News';

//Detail URLs
const IOS_WEBVIEW_URL = 'file:///';
const ANDROID_WEBVIEW_URL = 'about:blank';

//Podcast Services
const podcastServices = {
    anghami: 'anghami',
    apple: 'apple_podcasts',
    google: 'google_podcast',
    spotify: 'spotify'
}

//displayTypes
const displayTypes = {
    article: 'article',
    liveCoverage: 'livecoverage',
    video: 'video',
    analysis: 'analysis',
    special: 'special'
}

const LATEST_NEWS = 'آخر الأخبار';
const SECTIONS = 'أقسام';
const MOST_READ = 'الأكثر قراءة';
const FAVORITE = 'المحفوظات';
const DOWNLOAD_NEWS = 'الجريدة';
const MY_NEWS = 'أخباري'

const TABICONS = {
    NEWS: 'newsIcon' as ImageName,
    NEWS_ACTIVE: 'newsActiveIcon' as ImageName,
    SECTIONS: 'sectionsIcon' as ImageName,
    SECTIONS_ACTIVE: 'sectionsActiveIcon' as ImageName,
    MOST_READ: 'mostReadIcon' as ImageName,
    MOST_READ_ACTIVE: 'mostReadActiveIcon' as ImageName,
    FAVORITE: 'favoriteIcon' as ImageName,
    FAVORITE_ACTIVE: 'favoriteActiveIcon' as ImageName,
    DOWNLOAD_PDF: 'pdfIcon' as ImageName,
    MY_NEWS: 'myNewsIcon' as ImageName,
    MY_NEWS_ACTIVE: 'myNewsActiveIcon' as ImageName,
}

const TabConstants = {
    LATEST_NEWS,
    SECTIONS,
    MOST_READ,
    FAVORITE,
    TABICONS,
    DOWNLOAD_NEWS,
    MY_NEWS,
};

const atomTestID = {
    widgetHeaderButton: 'widgetHeaderButton'
}

const moleculesTestID = {
    storySaveBtn: 'StorySaveButton',
    tabItemBtn: 'tabItemButton',
    filterBtn: 'filterBtn'
}

const APPID = '2a8029b11a6c3cc7a196e8d7dd03ce67';
const LANG = 'ar';
const UNITS = 'metric';
const CNT = 7;

export {
    ScreensConstants,
    TabConstants,
    flatListUniqueKey,
    atomTestID,
    moleculesTestID,
    TranslateConstants,
    TranslateKey,
    storeInfo,
    storeSampleData,
    sampleTextWithFlag,
    shortArticleData,
    shortArticleWithTagProperties,
    heroSectionProperties,
    shortArticleWithTagData,
    authorHeaderData,
    articleFooterSample,
    mostReadData,
    sectionTabItem,
    weatherData,
    searchResults,
    opinionWritersData,
    opinionWritersArticlesData,
    podcastCardSectionData,
    mostPlayedSectionData,
    LatestNewsSummarySectionData,
    EditorsPickSectionData,
    podcastForYouSection,
    PodcastOpinionArticleSectionData,
    storyWidgetItemData,
    storyWidgetData,
    videoTabData,
    newsFeedData,
    PodcastEpisodeData,
    PodcastListData,
    PodcastProgramInfoData,
    articleSampleData,
    videoArchiveData,
    myNewsTopTabData,
    journalistData,
    journalistNames,
    DEFAULT_ALERT_TITLE,
    DEFAULT_ALERT_MESSAGE,
    VALID_URL_REGEX,
    PROFILE,
    DURATION,
    REQUIRE_ACCESS,
    REQUEST_CAMERA_ACCESS_MESSAGE,
    PODCAST_URL_SUFFIX,
    DEFAULT_MINIMUM_DATE,
    CONST_OK,
    FACEBOOK_URL,
    INSTAGRAM_URL,
    LINKEDIN_URL,
    TWITTER_URL,
    FACEBOOK_APP_URL,
    INSTAGRAM_APP_URL,
    LINKEDIN_APP_URL,
    TWITTER_APP_URL,
    IOS_WEBVIEW_URL,
    ANDROID_WEBVIEW_URL,
    podcastServices,
    displayTypes,
    APPID,
    LANG,
    UNITS,
    CNT
}
