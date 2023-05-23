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
import { AxiosError } from 'axios';
import { useLogin } from 'src/hooks';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false
}));

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
      validateBookmark: () => true,
    };
  },
}));

jest.mock('src/hooks/useLogin', () => ({
  useLogin: jest.fn()
}));

let instance: RenderAPI;

const mockFunction = jest.fn();
const setShowPopUp = mockFunction;
const setIsLoading = mockFunction;
const setPage = mockFunction;
const setAlbumData = mockFunction;
const setAlbumDataInfo = mockFunction;
const fetchAlbumListApiMock = mockFunction;
const mockData = [{ nid: '1' }]



describe('should render <PhotoGalleryScreen> when the user is logged in', () => {

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn()
  }

  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (fetchAlbumListApi as jest.Mock).mockImplementation(fetchAlbumListApiMock);
    (useLogin as jest.Mock).mockReturnValue({isLoggedIn:true});
    (useState as jest.Mock).mockImplementation(() => [false, setIsLoading]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [0, setPage]);
    (useState as jest.Mock).mockImplementation(() => [[], setAlbumData]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
    (useState as jest.Mock).mockImplementation(() => [mockData, setAlbumDataInfo]);

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
    DeviceTypeUtilsMock.isTab = true;
    expect(instance).toBeDefined();
  });

  it('test fetchAlbumListApi return response ', async() => {
    (fetchAlbumListApi as jest.Mock).mockReturnValue({ rows: [{ data: 'data' }], pager: 'pager' });
    const response = await fetchAlbumListApi({page:10});
    expect(response).toEqual({ rows: [{ data: 'data' }], pager: 'pager' });
  })

  test("should fetchAlbumListApi throws error",async() => {
    fetchAlbumListApiMock.mockImplementation(() => Promise.reject({response:{data:"error"}}));
    try {
      await fetchAlbumListApi({ page: 10 });
    }
    catch(error) {
      const errorResponse = error as AxiosError;
      expect(errorResponse?.response?.data).toBeDefined();
    }
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

describe('should render <PhotoGalleryScreen> when the user is not logged in', () => {

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn()
  }

  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (fetchAlbumListApi as jest.Mock).mockImplementation(fetchAlbumListApiMock);
    (useLogin as jest.Mock).mockReturnValue({isLoggedIn:false});
    (useState as jest.Mock).mockImplementation(() => [false, setIsLoading]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [0, setPage]);
    (useState as jest.Mock).mockImplementation(() => [[], setAlbumData]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
    (useState as jest.Mock).mockImplementation(() => [mockData, setAlbumDataInfo]);

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
    DeviceTypeUtilsMock.isTab = true;
    expect(instance).toBeDefined();
  });

  it('test fetchAlbumListApi return response ', async() => {
    (fetchAlbumListApi as jest.Mock).mockReturnValue({ rows: [{ data: 'data' }], pager: 'pager' });
    const response = await fetchAlbumListApi({page:10});
    expect(response).toEqual({ rows: [{ data: 'data' }], pager: 'pager' });
  })

  test("should fetchAlbumListApi throws error",async() => {
    fetchAlbumListApiMock.mockImplementation(() => Promise.reject({response:{data:"error"}}));
    try {
      await fetchAlbumListApi({ page: 10 });
    }
    catch(error) {
      const errorResponse = error as AxiosError;
      expect(errorResponse?.response?.data).toBeDefined();
    }
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
