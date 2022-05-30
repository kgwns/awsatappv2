//Latest Tab Icons
import bookmarkActive from 'src/assets/images/latest_tab/bookmark_active.png';
import blackBdrBookMark from 'src/assets/images/latest_tab/bookmark-black-bdr.png';
import bookMarkWhiteBdr from 'src/assets/images/latest_tab/bookmark_white_bdr.png';
import bookMarkActiveWhite from 'src/assets/images/latest_tab/bookmark_active_white.png';
import greenPlayIcon from 'src/assets/images/latest_tab/green_play_icon.png';
import returnIcon from 'src/assets/images/icons/return_arrow/returnArrow.png';

import earlyEditionImg from 'src/assets/images/earlyEditionImg.png'
import moneyAndBusinessImg from 'src/assets/images/moneyAndBusinessImg.png'
import technologyImg from 'src/assets/images/technologyImg.png'
import placeholderImg from 'src/assets/images/icons/placeholder_image.png'
import crossWord from 'src/assets/images/cross_word_image.png'
import sudoku from 'src/assets/images/sudoku_image.png'
import pdfIcon from 'src/assets/images/pdf_icon.png'
import popupImage from 'src/assets/images/popupImage.png'

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
  bookmarkBlackActive = 'bookmarkBlackActive',
  bookmarkBlack = ' bookmarkBlack',
  clock = 'clock',
  clockWhite = 'clockWhite',
  headerLogo = 'headerLogo',
  logoBlack = 'logoBlack',
  searchIcon = 'searchIcon',
  menuIcon = 'menuIcon',
  bookMarkWhite = 'bookMarkWhite',
  bookMarkWhiteActive = 'bookMarkWhiteActive',
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
  bookMarkSVG = 'bookMarkSVG',
  bookMarkActiveSVG = 'bookMarkActiveSVG',
  applePodcast = 'applePodcast',
  spotifyPodcast = 'spotifyPodcast',
  googlePodcast = 'googlePodcast',
  closeSVG = 'closeSVG',
  playIconSVG = 'playIconSVG',
  returnIcon = 'returnIcon',
  mail = 'mail',
  mailSelected = 'mailSelected',
  earlyEditionImg = 'earlyEditionImg',
  moneyAndBusinessImg = 'moneyAndBusinessImg',
  technologyImg = 'technologyImg',
  notificationGrey = 'notificationGrey',
  manageNews = 'manageNews',
  newsLetter = 'newsLetter',
  profile = 'profile',
  exit = 'exit',
  pen = 'pen',
  bookmark = 'bookmark',
  returnSvg = 'returnSvg',
  arrowLeftGrey = 'arrowLeftGrey',
  plusSvg = 'plusSvg',
  returnGreenish = 'returnGreenish',
  userDefaultIcon = 'userDefaultIcon',
  editIcon = 'editIcon',
  dropDownIcon = 'dropDownIcon',
  placeholderImg = 'placeholderImg',
  returnBlackSvg = 'returnBlackSvg',
  playerCloseIcon = 'playerCloseIcon',
  pauseIcon = 'pauseIcon',
  leftArrowIcon = 'leftArrowIcon',
  downArrowIcon = 'downArrowIcon',
  plusGreen = 'plusGreen',
  tickIcon = 'tickIcon',
  default = 'default',
  crossWord = 'crossWord',
  sudoku = 'sudoku',
  greenArrowLeft = 'greenArrowLeft',
  returnWhiteIcon = 'returnWhiteIcon',
  arrowLeftFacedBlack = 'arrowLeftFacedBlack',
  facebookGray = 'facebookGray',
  twitterGray = 'twitterGray',
  instagramGray = 'instagramGray',
  bookmarkGray = 'bookmarkGray',
  shareGray = 'shareGray',
  menuCloseIcon = 'menuCloseIcon',
  pdfIcon = 'pdfIcon',
  gridToggleIcon = 'gridToggleIcon',
  listToggleIcon = 'listToggleIcon',
  playForwardIcon = 'playForwardIcon',
  playBackwardIcon = 'playBackwardIcon',
  headPhoneIcon = 'headPhoneIcon',
  arrowLeftBlack = 'arrowLeftBlack',
  printVersionActiveIcon = 'printVersionActiveIcon',
  printVersionGrayIcon = 'printVersionGrayIcon',
  popupImage = 'popupImage',
  calendarIcon = 'calendarIcon'
}

export const images = {
  bookmarkActive,
  blackBdrBookMark,
  bookMarkWhiteBdr,
  bookMarkActiveWhite,
  greenPlayIcon,
  returnIcon,
  earlyEditionImg,
  moneyAndBusinessImg,
  technologyImg,
  placeholderImg,
  crossWord,
  sudoku,
  pdfIcon,
  popupImage
};

export const darkImages = {
  ...images,
  bookmarkActive: bookMarkActiveWhite,
};

export type ImageName = keyof typeof images;
