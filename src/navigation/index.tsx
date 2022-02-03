import {
  FavoriteScreen,
  MostReadScreen,
  SectionsScreen,
  LatestNewsScreen,
  AuthPage,
} from '../components/screens';
import AppNavigator from 'src/navigation/AppNavigator';
import AuthNavigator from 'src/navigation/AuthNavigator';

export const Routes = {
  FavoriteScreen,
  MostReadScreen,
  SectionsScreen,
  LatestNewsScreen,
  AuthPage,
  AppNavigator,
  AuthNavigator,
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
};


export type ScreenName = keyof undefined

const favoriteScreen = 'favoriteScreen' as ScreenName
const mostReadScreen = 'mostReadScreen' as ScreenName
const sectionsScreen = 'sectionsScreen' as ScreenName
const latestNewsScreen = 'latestNewsScreen' as ScreenName
const authPage = 'authPage' as ScreenName
const appNavigator = 'appNavigator' as ScreenName;
const authNavigator = 'authNavigator' as ScreenName;

export const RoutesName = {
  favoriteScreen,
  mostReadScreen,
  sectionsScreen,
  latestNewsScreen,
  authPage,
  appNavigator,
  authNavigator,
}
