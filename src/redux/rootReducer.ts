import {combineReducers} from 'redux';
import homeReducer from 'src/redux/home/reducer';
import appCommonReducer from 'src/redux/appCommon/reducer';
import mostReadReducer from 'src/redux/mostRead/reducer';
import searchReducer from 'src/redux/search/reducer';
import articleDetail from 'src/redux/articleDetail/reducer';
import latestNewsTab from 'src/redux/latestNews/reducer';
import opinionWriter from 'src/redux/writers/reducer';
import opinionsReducer from 'src/redux/opinions/reducer';
import sideMenu from './sideMenu/reducer';
import sectionArticles from './sectionArticles/reducer';
import newsViewReducer from 'src/redux/newsView/reducer';
import allWritersReducer from 'src/redux/allWriters/reducer';
import allSiteCategoriesReducer from 'src/redux/allSiteCategories/reducer';
import termsAndAboutUs from 'src/redux/termsAndAboutUs/reducer';
import registerUser from 'src/redux/register/reducer';
import loginReducer from './login/reducer';
import emailCheckReducer from './auth/reducer';
import videoList from 'src/redux/videoList/reducer';
import topMenu from 'src/redux/topMenu/reducer';
import opinionArticleDetail from 'src/redux/opinionArticleDetail/reducer';
import bookmark from 'src/redux/bookmark/reducer';
import userDetails from 'src/redux/profileUserDetail/reducer';
import changePasswordReducer from 'src/redux/changePassword/reducer';
import newsLetters from 'src/redux/newsLetter/reducer';
import keepNotified from 'src/redux/keepNotified/reducer';
import podcastReducer from 'src/redux/podcast/reducer';
import contentForYouReducer from 'src/redux/contentForYou/reducer';
import writerDetailReducer from 'src/redux/writersDetail/reducer';
import documentaryVideoReducer from 'src/redux/documentaryVideo/reducer';
import appPlayerReducer from 'src/redux/appPlayer/reducer';
import notificationSaveTokenReducer from 'src/redux/notificationSaveToken/reducer';
import weatherDetails from 'src/redux/weatherDetails/reducer';
import contactUsInfo from 'src/redux/contactUs/reducer';
import albumList from 'src/redux/photoGallery/reducer';
import journalist from 'src/redux/journalist/reducer';
import arabicWordsReducer from 'src/redux/arabicWords/reducer';

export const RESET_STORE = 'RESET_STORE';

const rootReducer = combineReducers({
  home: homeReducer,
  appCommon: appCommonReducer,
  mostRead: mostReadReducer,
  search: searchReducer,
  articleDetail: articleDetail,
  latestNewsTab,
  opinionWriter: opinionWriter,
  opinionsReducer: opinionsReducer,
  sideMenu: sideMenu,
  sectionArticles: sectionArticles,
  newsViewReducer: newsViewReducer,
  allWriters: allWritersReducer,
  allSiteCategories: allSiteCategoriesReducer,
  termsAndAboutUs: termsAndAboutUs,
  register: registerUser,
  login: loginReducer, 
  emailCheck: emailCheckReducer,
  videoList: videoList,
  topMenu: topMenu,
  opinionArticleDetail: opinionArticleDetail,
  bookmark: bookmark,
  userDetails: userDetails,
  changePassword: changePasswordReducer,
  newsLetters: newsLetters,
  keepNotified: keepNotified,
  podcast: podcastReducer,
  contentForYou: contentForYouReducer,
  writerDetail: writerDetailReducer,
  documentaryVideo: documentaryVideoReducer,
  appPlayer: appPlayerReducer,
  notificationSaveToken: notificationSaveTokenReducer,
  weatherDetails: weatherDetails,
  contactUsInfo: contactUsInfo,
  albumList: albumList,
  journalist: journalist,
  arabicWords:arabicWordsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export type Selector<T> = (state: AppState) => T;

export default rootReducer;
