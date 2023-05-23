import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../constants/Constants';
import { MostReadList, PopUp } from '..';
import { ArticleItem } from 'src/components/molecules';
import { FlatList } from 'react-native';
import { useLogin } from 'src/hooks';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: () => {
    return {
      bookmarkIdInfo: [
        {
          nid: '1',
          bundle: 'string'
        },
        {
          nid: '2',
          bundle: 'string'
        }
      ],
      sendBookmarkInfo: () => [],
      removeBookmarkedInfo: () => [],
      validateBookmark: () => true,
    }
  },
}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: jest.fn()
}));
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true,
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));


describe('<MostReadList>', () => {
  let instance: RenderAPI;
  const mockFn = jest.fn();
  const useLoginMock = jest.fn();
  const sampleData: any = [
    {
      nid: 'nid',
      title: 'title',
      body: 'body',
      field_image: 'field_image',
      view_node: 'view_node',
      field_news_categories_export: [{
        id: 'id',
        title: 'title',
        url: 'url',
        bundle: 'bundle',
        name: 'name',
      }],
      field_publication_date_export: 'field_publication_date_export',
      rows: [
        {
          result: true
        },
        {
          result: false
        },
      ]
    },
  ];
  const navigation = {
    reset: jest.fn()
  }
  beforeEach(() => {
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({ isLoggedIn: true });
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = (
      <NavigationContainer independent={true}>
        <Provider store={storeSampleData}>
          <MostReadList data={sampleData} onScroll={mockFn} isLoading={true} enableTag={true} flag={false} />
        </Provider>
      </NavigationContainer>
    );
    instance = render(component);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });
  
  test('Should render component', () => {
    DeviceTypeUtilsMock.isTab = false;
    expect(instance).toBeDefined();
  });

  test('Should render component in tab', () => {
    DeviceTypeUtilsMock.isTab = true;
    expect(instance).toBeDefined();
    DeviceTypeUtilsMock.isTab = false;
  });
  
  test('Should call ArticleItem onPress', () => {
    const element = instance.container.findByType(ArticleItem)
    fireEvent(element, 'onPressBookmark', { index: 2 });
    expect(mockFn).toBeTruthy()
  })

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onEndReached');
    expect(mockFn).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScrollBeginDrag');
    expect(mockFn).toBeTruthy()
  });
});


describe('<MostReadList>', () => {
  let instance: RenderAPI;
  const mockFn = jest.fn();
  const useLoginMock = jest.fn();
  const sampleData: any = [
    {
      nid: 'nid',
      title: 'title',
      body: 'body',
      field_image: 'field_image',
      view_node: 'view_node',
      field_news_categories_export: [{
        id: 'id',
        title: '',
        url: 'url',
        bundle: 'bundle',
        name: 'name',
      }],
      field_publication_date_export: 'field_publication_date_export',
      rows: [
        {
          result: true
        },
        {
          result: false
        },
      ]
    },
  ];
  const navigation = {
    reset: jest.fn()
  }
  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    useLoginMock.mockReturnValue({ isLoggedIn: false })
    const component = (
      <NavigationContainer independent={true}>
        <Provider store={storeSampleData}>
          <MostReadList data={sampleData} />
        </Provider>
      </NavigationContainer>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call ArticleItem onPress', () => {
    const element = instance.container.findByType(ArticleItem)
    fireEvent(element, 'onPressBookmark', { index: 2 });
    expect(mockFn).toBeTruthy()
  })

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onEndReached');
    expect(mockFn).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScrollBeginDrag');
    expect(mockFn).toBeTruthy()
  });

  test('Should call Popup onPress', () => {
    const element = instance.container.findByType(PopUp)
    fireEvent(element, 'onPressButton');
    expect(mockFn).toBeTruthy()
  });
});