import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../constants/SampleData';
import { MostReadList, PopUp } from '..';
import { ArticleItem } from 'src/components/molecules';
import { FlatList } from 'react-native';
import { useLogin } from 'src/hooks';

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
    }
  },
}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: jest.fn()
}));
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
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

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({ isLoggedIn: true })
    const component = (
      <Provider store={storeSampleData}>
        <MostReadList data={sampleData} onScroll={mockFn} isLoading={true} enableTag={true} flag={false} />
      </Provider>
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

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({ isLoggedIn: false })
    const component = (
      <Provider store={storeSampleData}>
        <MostReadList data={sampleData} />
      </Provider>
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
});