//Latest Tab Icons
import bookmarkActive from 'src/assets/images/latest_tab/bookmark_active.png';
import blackBdrBookMark from 'src/assets/images/latest_tab/bookmark-black-bdr.png';
import clock from 'src/assets/images/latest_tab/clock-icon.png';
import bookMarkWhiteBdr from 'src/assets/images/latest_tab/bookmark_white_bdr.png';
import bookMarkActiveWhite from 'src/assets/images/latest_tab/bookmark_active_white.png';
import arrowLeftFaced from 'src/assets/images/latest_tab/arrow_left_faced.png';
import greenPlayIcon from 'src/assets/images/latest_tab/green_play_icon.png';



//social icons
import googleIcon from 'src/assets/images/socialButton/google-icon-logo.png';
import appleIcon from 'src/assets/images/socialButton/apple-logo.png';
import facebookIcon from 'src/assets/images/socialButton/facebook-icon.png';
import mailIcon from 'src/assets/images/socialButton/Mail-icon.png';

import returnIcon from 'src/assets/images/icons/return_arrow/returnArrow.png'

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
  fontScaling = 'fontScaling',
  share = 'share',
  themeChange = 'themeChange',
  bookMarkBlackBdrSVG = 'bookMarkBlackBdrSVG',
  bookMarkBlackFillSVG = 'bookMarkBlackFillSVG',
  applePodcast = 'applePodcast',
  spotifyPodcast = 'spotifyPodcast',
  googlePodcast = 'googlePodcast',
  closeSVG = 'closeSVG',
  playIconSVG = 'playIconSVG',
  returnIcon = 'returnIcon',
}

export const images = {
  bookmarkActive,
  blackBdrBookMark,
  clock,
  bookMarkWhiteBdr,
  bookMarkActiveWhite,
  arrowLeftFaced,
  greenPlayIcon,
  googleIcon,
  appleIcon,
  facebookIcon,
  mailIcon,
  returnIcon,
};

export const darkImages = {
  ...images,
  bookmarkActive: bookMarkActiveWhite,
};

export type ImageName = keyof typeof images;
