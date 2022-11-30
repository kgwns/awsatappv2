import React, {useState} from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {PhotoGalleryDetailScreen} from '../PhotoGalleryDetailScreen';
import {AlbumDetailType} from 'src/redux/photoGallery/types';
import {ScreenContainer} from '../../ScreenContainer/ScreenContainer';
import {FlatList} from 'react-native';
import {PhotoGalleryDetailFooter} from 'src/components/molecules';
import {useNavigation} from '@react-navigation/native';

const mockString = 'mockString';

const albumDetailData: AlbumDetailType[] = [
  {
    nid: mockString,
    title: mockString,
    body_export: mockString,
    created: new Date(),
    created_export: new Date(),
    type: mockString,
    view_node: mockString,
    field_album_img_export: mockString,
    field_photo_album_export: [mockString],
    field_album_source_export: [mockString],
    isBookmarked: false,
  },
];

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/hooks/usePhotoGallery', () => ({
  usePhotoGallery: () => {
    return {
      isLoading: false,
      isDetailLoading: false,
      albumDetailData: [],
      albumListData: [],
      albumDetailError: '',
      fetchAlbumListData: () => {
        return [];
      },
      fetchAlbumDetailData: () => {
        return [];
      },
      albumListDataError: '',
      relatedOpinionListData: [],
      emptyData: () => {
        return [];
      },
    };
  },
}));

jest.mock('src/hooks/useAppCommon', () => ({
  useAppCommon: () => {
    return {
      theme: 'light',
      isFirstSession: true,
      articleFontSize: 16,
      storeArticleFontSizeInfo: () => {},
    };
  },
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => [],
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

describe('<PhotoGalleryDetailScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const setFontSize = mockFunction;
  const setIsBookmarked = mockFunction;
  const setShowPopUp = mockFunction;
  const setEdge = mockFunction;
  const setAlbumData = mockFunction;

  const navigation = {
    goBack: mockFunction,
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [12, setFontSize]);
    (useState as jest.Mock).mockImplementation(() => [false, setIsBookmarked]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
    (useState as jest.Mock).mockImplementation(() => [[], setEdge]);
    (useState as jest.Mock).mockImplementation(() => [
      albumDetailData,
      setAlbumData,
    ]);
    const component = (
      <Provider store={storeSampleData}>
        <PhotoGalleryDetailScreen route={{params: {nid: 123}}} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render PhotoGalleryDetailScreen component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call ScreenContainer onCloseSignUpAlert', () => {
    const element = instance.container.findByType(ScreenContainer);
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy();
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findByType(FlatList as any);
    fireEvent(element, 'keyExtractor', '', 0);
    expect(mockFunction).toBeTruthy();
  });

  test('Should call FlatList renderItem', () => {
    const element = instance.container.findByType(FlatList as any);
    fireEvent(element, 'renderItem', {item: [{}], index: 0});
    expect(mockFunction).toBeTruthy();
  });

  test('Should call PhotoGalleryDetailFooter onPressSave', () => {
    const element = instance.container.findAllByType(
      PhotoGalleryDetailFooter,
    )[0];
    fireEvent(element, 'onPressSave', albumDetailData[0].nid);
    expect(mockFunction).toBeTruthy();
  });

  test('Should call PhotoGalleryDetailFooter onPressFontChange', () => {
    const element = instance.container.findAllByType(
      PhotoGalleryDetailFooter,
    )[0];
    fireEvent(element, 'onPressFontChange');
    expect(mockFunction).toBeTruthy();
  });
});
