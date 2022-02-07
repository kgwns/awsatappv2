//Latest Tab Icons
import bookmarkActive from 'src/assets/images/latest_tab/bookmark_active.png';
import blackBdrBookMark from 'src/assets/images/latest_tab/bookmark-black-bdr.png';
import clock from 'src/assets/images/latest_tab/clock-icon.png';
import bookMarkWhiteBdr from 'src/assets/images/latest_tab/bookmark_white_bdr.png';
import bookMarkActiveWhite from 'src/assets/images/latest_tab/bookmark_active_white.png';
import arrowLeftFaced from 'src/assets/images/latest_tab/arrow_left_faced.png';
import greenPlayIcon from 'src/assets/images/latest_tab/green_play_icon.png';

// tabbar icons
import newsIcon from 'src/assets/images/tabIcons/news_icon.png';
import newsActiveIcon from 'src/assets/images/tabIcons/news_active_icon.png';
import sectionsIcon from 'src/assets/images/tabIcons/sections_icon.png';
import sectionsActiveIcon from 'src/assets/images/tabIcons/sections_active_icon.png';
import mostReadIcon from 'src/assets/images/tabIcons/mostread_icon.png';
import mostReadActiveIcon from 'src/assets/images/tabIcons/mostread_active_icon.png';
import favoriteIcon from 'src/assets/images/tabIcons/favorite_icon.png';
import favoriteActiveIcon from 'src/assets/images/tabIcons/favorite_active_icon.png';

// Header icons
import searchIcon from 'src/assets/images/headerIcons/search_icon.png';
import headerLogo from 'src/assets/images/headerIcons/header_logo.png';
import menuIcon from 'src/assets/images/headerIcons/menu_icon.png';

//onBoard Screen
import arrowPrev from 'src/assets/images/onBoard/arrow_prev.png';
import arrowNext from 'src/assets/images/onBoard/arrow_next.png';

//Keep Notified OnBoard
import notification from 'src/assets/images/keepNotified/notification.png';
import notificationSelected from 'src/assets/images/keepNotified/notification_selected.png';

// Follow your favorite book
import authorItemActive from 'src/assets/images/favorite_author/author_item_active.png';
import authorItem from 'src/assets/images/favorite_author/author_item.png';

//social icons
import googleIcon from 'src/assets/images/socialButton/google-icon-logo.png';
import appleIcon from 'src/assets/images/socialButton/apple-logo.png';
import facebookIcon from 'src/assets/images/socialButton/facebook-icon.png';
import mailIcon from 'src/assets/images/socialButton/Mail-icon.png';

export enum ImagesName {
  newsIcon = 'newsIcon',
  newsActiveIcon = 'newsActiveIcon',
  sectionsIcon = 'sectionsIcon',
  sectionsActiveIcon = 'sectionsActiveIcon',
  mostReadIcon = 'mostReadIcon',
  mostReadActiveIcon = 'mostReadActiveIcon',
  favoriteIcon = 'favoriteIcon',
  favoriteActiveIcon = 'favoriteActiveIcon',
  homeIcon = 'homeIcon',
  Image = 'Image',
  bookmarkActive = 'bookmarkActive',
  blackBdrBookMark = 'blackBdrBookMark',
  clock = 'clock',
  headerLogo = 'headerLogo',
  searchIcon = 'searchIcon',
  menuIcon = 'menuIcon',
  bookMarkWhiteBdr = 'bookMarkWhiteBdr',
  bookMarkActiveWhite = 'bookMarkActiveWhite',
  arrowLeftFaced = 'arrowLeftFaced',
  greenPlayIcon = 'greenPlayIcon',
  notification = 'notification',
  notificationSelected = 'notificationSelected',
  arrowPrev = 'arrowPrev',
  arrowNext = 'arrowNext',
  authorItem = 'authorItem',
  authorItemActive = 'authorItemActive',
  googleIcon = 'googleIcon',
  appleIcon = 'appleIcon',
  facebookIcon = 'facebookIcon',
  mailIcon = 'mailIcon',
}

export const images = {
  newsIcon,
  newsActiveIcon,
  sectionsIcon,
  sectionsActiveIcon,
  mostReadIcon,
  mostReadActiveIcon,
  favoriteIcon,
  favoriteActiveIcon,
  bookmarkActive,
  blackBdrBookMark,
  clock,
  headerLogo,
  searchIcon,
  menuIcon,
  bookMarkWhiteBdr,
  bookMarkActiveWhite,
  arrowLeftFaced,
  greenPlayIcon,
  notification,
  notificationSelected,
  arrowPrev,
  arrowNext,
  authorItemActive,
  authorItem,
  googleIcon,
  appleIcon,
  facebookIcon,
  mailIcon,
};

export type ImageName = keyof typeof images;
