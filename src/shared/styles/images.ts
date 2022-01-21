import save from 'src/assets/images/save-instagram.png'
import unSave from 'src/assets/images/bookmark-black-bdr.png'
import clock from 'src/assets/images/clock-icon.png'

// tabbar icons
import newsIcon from 'src/assets/images/tabIcons/news_icon.png';
import newsActiveIcon from 'src/assets/images/tabIcons/news_active_icon.png';
import sectionsIcon from 'src/assets/images/tabIcons/sections_icon.png';
import sectionsActiveIcon from 'src/assets/images/tabIcons/sections_active_icon.png';
import mostReadIcon from 'src/assets/images/tabIcons/mostread_icon.png';
import mostReadActiveIcon from 'src/assets/images/tabIcons/mostread_active_icon.png';
import favoriteIcon from 'src/assets/images/tabIcons/favorite_icon.png';
import favoriteActiveIcon from 'src/assets/images/tabIcons/favorite_active_icon.png';

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
  save = 'save',
  unSave = 'unSave',
  clock = 'clock'
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
  save,
  unSave,
  clock
};

export type ImageName = keyof typeof images;
