import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import ArchiveArticle from 'src/components/molecules/ArchiveArticle';
import {useNavigation} from '@react-navigation/native';
import { ScreensConstants } from 'src/constants/Constants'
import FixedTouchable from 'src/shared/utils/FixedTouchable'
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { DARK_THEME_ID, LIGHT_THEME_ID } from 'src/shared/styles/colors';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true
}));

jest.mock('src/shared/styles/ThemeProvider',() => ({
  ...jest.requireActual('src/shared/styles/ThemeProvider'),
  useTheme: jest.fn().mockReturnValue(false)
}))

describe('<ArchiveArticle />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const navigation = {
    navigate: mockFunction,
  }
  
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useTheme as jest.Mock).mockReturnValue({themeData: { id: LIGHT_THEME_ID}});
    const component = <ArchiveArticle title={''} author={''} created={''} isAlbum={false} nid=''/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  test('should not display title, if the title is empty', () => {
    expect(instance.queryByTestId('titleTestId')).toBeNull()
  });

  test('Should not navigate to any screens, when nid is passing as empty',() => {
    const element = instance.container.findByType(FixedTouchable)
    fireEvent(element, 'onPress');
    expect(navigation.navigate).not.toHaveBeenCalled();
  })

});

describe('<ArchiveArticle />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const navigation = {
    navigate: mockFunction,
  }
  
  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useTheme as jest.Mock).mockReturnValue({themeData: { id: DARK_THEME_ID}});
    const component = <ArchiveArticle nid='2' title={'title'} author={'author'} created={'created'} isAlbum={true} showDivider = {true} />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  test('should display title', () => {
    expect(instance.queryByTestId('titleTestId')).not.toBeNull()
  });

  test('Should navigate to PHOTO_GALLERY_DETAIL_SCREEN when the article is album', () => {
    const element = instance.container.findByType(FixedTouchable)
    fireEvent(element, 'onPress');
    expect(navigation.navigate).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN, {nid: '2'});
  })
});

describe('<ArchiveArticle />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const navigation = {
    navigate: mockFunction,
  }
  
  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useTheme as jest.Mock).mockReturnValue({themeData: { id: LIGHT_THEME_ID}});
    const component = <ArchiveArticle nid='2' title={'title'} author={'author'} created={'created'} isAlbum={false} showDivider = {true} />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  test('Should navigate to ARTICLE_DETAIL_SCREEN when the article is not an album', () => {
    const element = instance.container.findByType(FixedTouchable)
    fireEvent(element, 'onPress');
    expect(navigation.navigate).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: '2'});
  })
});