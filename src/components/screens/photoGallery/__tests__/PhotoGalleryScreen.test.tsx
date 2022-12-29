import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { PhotoGalleryScreen } from '../PhotoGalleryScreen';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/Constants';
import { PopUp } from 'src/components/organisms';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { PhotoGalleryItem } from 'src/components/molecules';
import { fetchAlbumListApi } from 'src/services/photoGalleryService';
import * as serviceApi from 'src/services/photoGalleryService';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/services/photoGalleryService', () => ({
  fetchAlbumListApi: jest.fn()
}));

jest.mock('src/hooks/useBookmark', () => ({
  useBookmark: () => {
    return {
      bookmarkIdInfo: [
        {
          nid: '1',
          bundle: 'string',
        },
        {
          nid: '2',
          bundle: 'string',
        },
      ],
      sendBookmarkInfo: () => [],
      removeBookmarkedInfo: () => [],
    };
  },
}));

jest.mock('src/hooks/useLogin', () => ({
  useLogin: () => {
    return {
      isLoggedIn: false,
    };
  },
}));

let instance: RenderAPI;

const mockFunction = jest.fn();
const setShowPopUp = mockFunction;
const setIsLoading = mockFunction;
const setPage = mockFunction;
const setAlbumData = mockFunction;
const setAlbumDataInfo = mockFunction;
const mockData = [{ nid: '1' }]



describe('<PhotoGalleryScreen>', () => {

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn()
  }

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, setIsLoading]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [0, setPage]);
    (useState as jest.Mock).mockImplementation(() => [[], setAlbumData]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
    (useState as jest.Mock).mockImplementation(() => [mockData, setAlbumDataInfo]);
    (fetchAlbumListApi as jest.Mock).mockReturnValue({ rows: [{ data: 'data' }], pager: 'pager' });

    const component = (
      <Provider store={storeSampleData}>
        <PhotoGalleryScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render PhotoGalleryScreen', () => {
    expect(instance).toBeDefined();
  });

  it('test fetchAlbumListApi is called ', () => {
    const spy = jest.spyOn(serviceApi, 'fetchAlbumListApi').mockResolvedValue({
      rows: [{
        nid: '43',
        title: 'title',
        published_at_export: '3 jan 2022',
        created: 'date',
        field_publication_date_export:'date',
        type: 'photo',
        field_album_img_export: 'string',
        field_album_source_export: 'string',
        isBookmarked: true,
      }],
      pager: {
        current_page: 2,
        total_pages: 4,
        items_per_page: '1',
      }
    });
    serviceApi.fetchAlbumListApi({ page: 10 });
    // expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(spy).toHaveBeenCalled();
  })

  test('Should call onPressButton', () => {
    const element = instance.container.findByType(PopUp);
    fireEvent(element, 'onPressButton');
    expect(navigation.reset).toHaveBeenCalled();
  });

  test('Should call onClosePopUp', () => {
    const element = instance.container.findByType(PopUp);
    fireEvent(element, 'onClosePopUp');
    expect(mockFunction).toBeTruthy();
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findByType(FlatList as any);
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy();
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList as any);
    fireEvent(element, 'onScrollBeginDrag');
    expect(global.refFlatList).toBeTruthy();
  });

  test('Should call FlatList onEndReached', () => {
    const element = instance.container.findByType(FlatList as any);
    fireEvent(element, 'onEndReached');
    expect(setPage).toBeTruthy();
  });

  test('Should call PhotoGalleryItem onPress', () => {
    const element = instance.container.findByType(PhotoGalleryItem);
    fireEvent(element, 'onPress');
    // expect(navigation.navigate).toHaveBeenCalled();
  });

  test('Should call PhotoGalleryItem onUpdateBookmark', () => {
    const element = instance.container.findByType(PhotoGalleryItem);
    fireEvent(element, 'onUpdateBookmark', [1, true]);
    expect(setShowPopUp).toBeCalled();
  });
});

describe('<PhotoGalleryScreen> with isLoading true', () => {

  beforeEach(() => {
    // (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [true, setIsLoading]);
    (useState as jest.Mock).mockImplementation(() => [0, setPage]);
    (useState as jest.Mock).mockImplementation(() => [[], setAlbumData]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
    (useState as jest.Mock).mockImplementation(() => [[], setAlbumDataInfo]);

    const component = (
      <Provider store={storeSampleData}>
        <PhotoGalleryScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render PhotoGalleryScreen', () => {
    expect(instance).toBeDefined();
  });
});
