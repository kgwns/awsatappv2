import {combineReducers} from 'redux';
import homeReducer from 'src/redux/home/reducer';
import appCommon from 'src/redux/appCommon/reducer';
import mostReadReducer from 'src/redux/mostRead/reducer';
import searchReducer from 'src/redux/search/reducer';
import articleDetail from 'src/redux/articleDetail/reducer';
import latestNewsTab from 'src/redux/latestNews/reducer';
import opinionWriter from 'src/redux/writers/reducer';
import opinionsReducer from 'src/redux/opinions/reducer';
import sideMenu from './sideMenu/reducer';
import sectionArticles from './sectionArticles/reducer';
import newsViewReducer from 'src/redux/newsView/reducer';
import allWriters from 'src/redux/allWriters/reducer';
import allSiteCategories from 'src/redux/allSiteCategories/reducer';
import termsAndAboutUs from 'src/redux/termsAndAboutUs/reducer';
import registerUser from 'src/redux/register/reducer';
import loginReducer from './login/reducer';
import emailCheckReducer from './auth/reducer';
import videoList from 'src/redux/videoList/reducer';
import topMenu from 'src/redux/topMenu/reducer';
import opinionArticleDetail from 'src/redux/opinionArticleDetail/reducer';
import bookmark from 'src/redux/bookmark/reducer';
import userDetails from 'src/redux/profileUserDetail/reducer';
import newsLetters from 'src/redux/newsLetter/reducer';
import keepNotified from 'src/redux/keepNotified/reducer'

export const RESET_STORE = 'RESET_STORE';

const rootReducer = combineReducers({
  home: homeReducer,
  appCommon: appCommon,
  mostRead: mostReadReducer,
  search: searchReducer,
  articleDetail: articleDetail,
  latestNewsTab,
  opinionWriter: opinionWriter,
  opinionsReducer: opinionsReducer,
  sideMenu: sideMenu,
  sectionArticles: sectionArticles,
  newsViewReducer: newsViewReducer,
  allWriters: allWriters,
  allSiteCategories: allSiteCategories,
  termsAndAboutUs: termsAndAboutUs,
  register: registerUser,
  login: loginReducer, 
  emailCheck: emailCheckReducer,
  videoList: videoList,
  topMenu: topMenu,
  opinionArticleDetail: opinionArticleDetail,
  bookmark: bookmark,
  userDetails: userDetails,
  newsLetters: newsLetters,
  keepNotified: keepNotified
});

export type AppState = ReturnType<typeof rootReducer>;

export type Selector<T> = (state: AppState) => T;

export default rootReducer;
