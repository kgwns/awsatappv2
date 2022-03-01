import {
  FavoriteScreen,
  MostReadScreen,
  SectionsScreen,
  LatestNewsScreen,
  AuthPage,
  SearchScreen,
  FollowFavoriteAuthorScreen,
  KeepNotifiedScreen,
  ArticleDetailScreen,
  SelectTopicsScreen,
  PodcastProgram,
  StoryScreen,
  SectionArticlesScreen,
  PodcastEpisode,
  VideoDetailScreen,
  SignInPage,
  TermsAndAboutUs,
  SignUpPage,
  ForgotPassword,
  SuccessScreen,
  NewsLetterScreen,
} from '../components/screens';
import AppNavigator from 'src/navigation/AppNavigator';
import AuthNavigator from 'src/navigation/AuthNavigator';
import OnBoardNavigator from './OnBoardNavigator';

export const Routes = {
  FavoriteScreen,
  MostReadScreen,
  SectionsScreen,
  LatestNewsScreen,
  AuthPage,
  AppNavigator,
  AuthNavigator,
  SearchScreen,
  OnBoardNavigator,
  FollowFavoriteAuthorScreen,
  KeepNotifiedScreen,
  ArticleDetailScreen,
  SelectTopicsScreen,
  PodcastProgram,
  StoryScreen,
  SectionArticlesScreen,
  PodcastEpisode,
  VideoDetailScreen,
  SignInPage,
  TermsAndAboutUs,
  SignUpPage,
  ForgotPassword,
  SuccessScreen,
  NewsLetterScreen,
};

/**
 * List of all screens in the app. This is an object type with key-value pairs
 * where the key is the name of the screen and the value is its navigation
 * or route props. In many cases, this may be `undefined`
 */
export type ScreenList = {
  FavoriteScreen: undefined;
  MostReadScreen: undefined;
  SectionsScreen: undefined;
  LatestNewsScreen: undefined;
  AuthPage: undefined;
  AppNavigator: undefined;
  AuthNavigator: undefined;
  SearchScreen: undefined;
  OnBoardNavigator: undefined;
  FollowFavoriteAuthorScreen: undefined;
  KeepNotifiedScreen: undefined;
  articleDetailScreen: undefined;
  SelectTopicsScreen: undefined;
  StoryScreen: undefined;
  ForgotPassword: undefined;
  SuccessScreen: undefined;
};

export type ScreenName = keyof undefined;

const favoriteScreen = 'favoriteScreen' as ScreenName;
const mostReadScreen = 'mostReadScreen' as ScreenName;
const sectionsScreen = 'sectionsScreen' as ScreenName;
const latestNewsScreen = 'latestNewsScreen' as ScreenName;
const authPage = 'authPage' as ScreenName;
const appNavigator = 'appNavigator' as ScreenName;
const authNavigator = 'authNavigator' as ScreenName;
const onBoardNavigator = 'onBoardNavigator' as ScreenName;
const followFavoriteAuthorScreen = 'followFavoriteAuthorScreen' as ScreenName;
const keepNotifiedScreen = 'keepNotifiedScreen' as ScreenName;
const articleDetailScreen = 'articleDetailScreen' as ScreenName
const selectTopicsScreen = 'selectTopicsScreen' as ScreenName;
const termsAndAboutUs = 'termsAndAboutUs' as ScreenName;
const forgotPassword = 'forgotPassword' as ScreenName
const successScreen = 'successScreen' as ScreenName;


export const RoutesName = {
  favoriteScreen,
  mostReadScreen,
  sectionsScreen,
  latestNewsScreen,
  authPage,
  appNavigator,
  authNavigator,
  onBoardNavigator,
  followFavoriteAuthorScreen,
  keepNotifiedScreen,
  articleDetailScreen,
  selectTopicsScreen,
  termsAndAboutUs,
  forgotPassword,
  successScreen,
};
