//Latest Tab Icons
import bookmarkActive from 'src/assets/images/latest_tab/bookmark_active.png'
import blackBdrBookMark from 'src/assets/images/latest_tab/bookmark-black-bdr.png'
import clock from 'src/assets/images/latest_tab/clock-icon.png'
import bookMarkWhiteBdr from 'src/assets/images/latest_tab/bookmark_white_bdr.png'
import bookMarkActiveWhite from 'src/assets/images/latest_tab/bookmark_active_white.png'

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

//podcast
import widgetPlayIcon from 'src/assets/images/podcast/widgetPlay.png';

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
  searchIcon= 'searchIcon',
  menuIcon = 'menuIcon',
  bookMarkWhiteBdr = 'bookMarkWhiteBdr',
  bookMarkActiveWhite = 'bookMarkActiveWhite',
  widgetPlayIcon = 'widgetPlayIcon',
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
  widgetPlayIcon,
};

export type ImageName = keyof typeof images;
