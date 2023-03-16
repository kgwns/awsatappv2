import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import ArchiveArticle from 'src/components/molecules/ArchiveArticle';
import {useNavigation} from '@react-navigation/native';
import { ScreensConstants } from 'src/constants/Constants'
import FixedTouchable from 'src/shared/utils/FixedTouchable'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<ArchiveArticle />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const navigation = {
    navigate: mockFunction,
}
  
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <ArchiveArticle title={''} author={''} created={''} isAlbum={false} nid='1'/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  });

  test('Should call FixedTouchable onPress when isAlbum false', () => {
    const element = instance.container.findByType(FixedTouchable)
    fireEvent(element, 'onPress');
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: '1'});
})

});

describe('<ArchiveArticle />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const navigation = {
    navigate: mockFunction,
}
  
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <ArchiveArticle nid='2' title={'title'} author={'author'} created={'created'} isAlbum={true} showDivider = {true} />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  });

  test('Should call FixedTouchable onPress when isAlbum is true', () => {
    const element = instance.container.findByType(FixedTouchable)
    fireEvent(element, 'onPress');
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN, {nid: '2'});
})
});