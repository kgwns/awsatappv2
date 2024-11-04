import {
  FavoriteScreen,
  MostReadScreen,
  SectionsScreen,
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
  ProfileSettings,
  OpinionArticleDetail,
  NewPassword,
  ManageMyNewsScreen,
  ManageMyFavoriteAuthorScreen,
  ManageMyFavoriteTopicsScreen,
  UserDetailScreen,
  WeatherDetailScreen,
  VideoPlayerScreen,
  VideoScreen,
  WritersDetailScreen,
  SectionArticlesParentScreen,
  GameScreen,
  DynamicGameScreen,
  DownloadNews,
  PDFArchive,
  PDFEditorView,
  MyNewsScreen,
  ContactUs,
  PhotoGalleryDetailScreen,
  JournalistDetail,
  PodcastEpisodeModal,
  DMAIntroductionScreen,
  DMAOptionsListScreen,
  DMAFeedbackScreen,
  DMADeleteAccountScreen,
} from '../components/screens';
import AppNavigator from 'src/navigation/AppNavigator';
import AuthNavigator from 'src/navigation/AuthNavigator';
import OnBoardNavigator from './OnBoardNavigator';
import { CartoonList } from 'src/components/screens/cartoonList/CartoonList';
import { EntityQueueListScreen } from 'src/components/screens/NotificationEntityQueue/EntityQueueListScreen';

export const Routes = {
  FavoriteScreen,
  MostReadScreen,
  SectionsScreen,
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
  ProfileSettings,
  OpinionArticleDetail,
  NewPassword,
  ManageMyNewsScreen,
  ManageMyFavoriteAuthorScreen,
  ManageMyFavoriteTopicsScreen,
  UserDetailScreen,
  WeatherDetailScreen,
  VideoPlayerScreen,
  VideoScreen,
  WritersDetailScreen,
  SectionArticlesParentScreen,
  GameScreen,
  DynamicGameScreen,
  DownloadNews,
  PDFArchive,
  PDFEditorView,
  MyNewsScreen,
  ContactUs,
  PhotoGalleryDetailScreen,
  JournalistDetail,
  PodcastEpisodeModal,
  DMAIntroductionScreen,
  DMAOptionsListScreen,
  DMAFeedbackScreen,
  DMADeleteAccountScreen,
  CartoonList,
  EntityQueueListScreen
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
  NewsLetterScreen: undefined;
  OpinionArticleDetail: undefined;
  NewPassword: undefined;
  ManageMyNewsScreen: undefined;
  ManageMyFavoriteAuthorScreen: undefined;
  ManageMyFavoriteTopicsScreen: undefined;
  UserDetailScreen: undefined;
  WeatherDetailScreen: undefined;
  WritersDetailScreen: undefined;
  SectionArticlesParentScreen: undefined;
  MyNewsScreen: undefined;
  PhotoGalleryDetailScreen: undefined;
  JournalistDetail: undefined;
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
const newsLetterScreen = 'newsLetterScreen' as ScreenName;
const opinionArticleDetail = 'opinionArticleDetail' as ScreenName;
const newPassword = 'newPassword' as ScreenName;
const manageMyNewsScreen = 'manageMyNewsScreen' as ScreenName;
const manageMyFavoriteAuthorScreen = 'manageMyFavoriteAuthorScreen' as ScreenName;
const manageMyFavoriteTopicsScreen = 'manageMyFavoriteTopicsScreen' as ScreenName;
const userDetailScreen = 'userDetailScreen' as ScreenName;
const writersDetailScreen = 'writersDetailScreen' as ScreenName
const sectionArticlesParentScreen = 'sectionArticlesParentScreen' as ScreenName;
const myNewsScreen = 'myNewsScreen' as ScreenName
const photoGalleryDetailScreen = 'photoGalleryDetailScreen' as ScreenName
const journalistDetail = 'journalistDetail' as ScreenName;
const PodcastEpisodeModalScreen = 'PodcastEpisodeModalScreen' as ScreenName;
const dmaIntroductionScreen = 'DMAIntroductionScreen' as ScreenName;
const dmaOptionsList = 'DMAOptionsListScreen' as ScreenName;
const cartoonList = 'CartoonList' as ScreenName;
const entityQueueList = 'EntityQueueList' as ScreenName;

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
  newsLetterScreen,
  opinionArticleDetail,
  newPassword,
  manageMyNewsScreen,
  manageMyFavoriteAuthorScreen,
  manageMyFavoriteTopicsScreen,
  userDetailScreen,
  writersDetailScreen,
  sectionArticlesParentScreen,
  DownloadNews,
  PDFArchive,
  PDFEditorView,
  myNewsScreen,
  photoGalleryDetailScreen,
  journalistDetail,
  PodcastEpisodeModalScreen,
  dmaIntroductionScreen,
  dmaOptionsList,
  cartoonList,
  entityQueueList
};
