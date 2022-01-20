import {
  FavoriteScreen,
  MostReadScreen,
  SectionsScreen,
  LatestNewsScreen,
} from '../components/screens';

export const Routes = {
  FavoriteScreen,
  MostReadScreen,
  SectionsScreen,
  LatestNewsScreen,
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
};
