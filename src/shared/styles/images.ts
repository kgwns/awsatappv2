import homeIcon from 'src/assets/images/homeIcon.png';
import Image from 'src/assets/images/Image.png';
import save from 'src/assets/images/save-instagram.png'
import unSave from 'src/assets/images/un-save-instagram.png'
import clock from 'src/assets/images/clock-icon.png'

export const images = {
  homeIcon,
  Image,
  save,
  unSave,
  clock
};

export enum ImagesName {
  homeIcon = 'homeIcon',
  Image = 'Image',
  save = 'save',
  unSave = 'unSave',
  clock = 'clock'
}

export type ImageName = keyof typeof images;
