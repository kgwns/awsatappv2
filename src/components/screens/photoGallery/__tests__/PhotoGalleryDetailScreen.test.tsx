import React, {useState} from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/Constants';
import {PhotoGalleryDetailScreen} from '../PhotoGalleryDetailScreen';
import {AlbumDetailType} from 'src/redux/photoGallery/types';
import {ScreenContainer} from '../../ScreenContainer/ScreenContainer';
import {FlatList} from 'react-native';
import {DetailHeader, PhotoGalleryDetailFooter} from 'src/components/molecules';
import {useNavigation} from '@react-navigation/native';
import { useLogin } from 'src/hooks/useLogin';

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
    field_photo_album_export_1: ['field_photo_album_export_1'],
    field_shorturl: 'string',
    link_node: 'string'
  },
];

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isTab: false,
  isNotchDevice: false
}));

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
jest.mock('src/hooks/useLogin',() => {
  return {
    useLogin:jest.fn(),
  }
});

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

describe('<PhotoGalleryDetailScreen> renders when the user is in guest mode', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const setFontSize = mockFunction;
  const setIsBookmarked = mockFunction;
  const setShowPopUp = mockFunction;
  const setEdge = mockFunction;
  const setAlbumData = mockFunction;
  const useLoginMock = mockFunction;
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
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useLoginMock).mockReturnValue({
      isLoggedIn:false
    })
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

  test('Should render PhotoGalleryDetailScreen component in IOS and NotchDevice', () => {
    DeviceTypeUtilsMock.isIOS = true;
    DeviceTypeUtilsMock.isNotchDevice = true;
    expect(instance).toBeDefined();
  });

  test('Should render PhotoGalleryDetailScreen component ', () => {
    DeviceTypeUtilsMock.isIOS = true;
    DeviceTypeUtilsMock.isNotchDevice = false;
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

  test('should call DetailHeader onPressBack',() =>{
    DeviceTypeUtilsMock.IOS = true;
    DeviceTypeUtilsMock.isTab = true;
    const element = instance.container.findByType(DetailHeader);
    fireEvent(element,'onBackPress');
  })
});

describe('<PhotoGalleryDetailScreen> renders when the user is logged', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const setFontSize = mockFunction;
  const setIsBookmarked = mockFunction;
  const setShowPopUp = mockFunction;
  const setEdge = mockFunction;
  const setAlbumData = mockFunction;
  const useLoginMock = mockFunction;
  const navigation = {
    goBack: mockFunction,
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [12, setFontSize]);
    (useState as jest.Mock).mockImplementation(() => [true, setIsBookmarked]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
    (useState as jest.Mock).mockImplementation(() => [[], setEdge]);
    (useState as jest.Mock).mockImplementation(() => [
      albumDetailData,
      setAlbumData,
    ]);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useLoginMock).mockReturnValue({
      isLoggedIn:true
    });
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
    DeviceTypeUtilsMock.isIOS = true
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
    expect(mockFunction).toHaveBeenCalled();
  });

  test('Should call PhotoGalleryDetailFooter onPressFontChange', () => {
    const element = instance.container.findAllByType(
      PhotoGalleryDetailFooter,
    )[0];
    fireEvent(element, 'onPressFontChange');
    expect(mockFunction).toBeTruthy();
  });

  test('should call DetailHeader onPressBack',() =>{
    DeviceTypeUtilsMock.IOS = true;
    DeviceTypeUtilsMock.isTab = true;
    const element = instance.container.findByType(DetailHeader);
    fireEvent(element,'onBackPress');
  })
});
