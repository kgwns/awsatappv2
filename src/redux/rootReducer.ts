import {combineReducers} from 'redux';
import homeReducer from 'src/redux/home/reducer';
import appCommonReducer from 'src/redux/appCommon/reducer';
import mostReadReducer from 'src/redux/mostRead/reducer';
import searchReducer from 'src/redux/search/reducer';
import articleDetail from 'src/redux/articleDetail/reducer';
import latestNewsTab from 'src/redux/latestNews/reducer';
import opinionWriterReducer from 'src/redux/writers/reducer';
import opinionsReducer from 'src/redux/opinions/reducer';
import sideMenuReducer from './sideMenu/reducer';
import sectionArticlesReducer from './sectionArticles/reducer';
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
import bookmarkReducer from 'src/redux/bookmark/reducer';
import userDetailsReducer from 'src/redux/profileUserDetail/reducer';
import changePasswordReducer from 'src/redux/changePassword/reducer';
import newsLetters from 'src/redux/newsLetter/reducer';
import keepNotifiedReducer from 'src/redux/keepNotified/reducer';
import podcastReducer from 'src/redux/podcast/reducer';
import contentForYouReducer from 'src/redux/contentForYou/reducer';
import writerDetailReducer from 'src/redux/writersDetail/reducer';
import documentaryVideoReducer from 'src/redux/documentaryVideo/reducer';
import appPlayerReducer from 'src/redux/appPlayer/reducer';
import notificationSaveTokenReducer from 'src/redux/notificationSaveToken/reducer';
import weatherDetailsReducer from 'src/redux/weatherDetails/reducer';
import contactUsInfo from 'src/redux/contactUs/reducer';
import albumListReducer from 'src/redux/photoGallery/reducer';
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
  opinionWriter: opinionWriterReducer,
  opinionsReducer: opinionsReducer,
  sideMenu: sideMenuReducer,
  sectionArticles: sectionArticlesReducer,
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
  bookmark: bookmarkReducer,
  userDetails: userDetailsReducer,
  changePassword: changePasswordReducer,
  newsLetters: newsLetters,
  keepNotified: keepNotifiedReducer,
  podcast: podcastReducer,
  contentForYou: contentForYouReducer,
  writerDetail: writerDetailReducer,
  documentaryVideo: documentaryVideoReducer,
  appPlayer: appPlayerReducer,
  notificationSaveToken: notificationSaveTokenReducer,
  weatherDetails: weatherDetailsReducer,
  contactUsInfo: contactUsInfo,
  albumList: albumListReducer,
  journalist: journalist,
  arabicWords:arabicWordsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export type Selector<T> = (state: AppState) => T;

export default rootReducer;
