import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/SampleData';
import {MostReadList} from '..';
import { ArticleItem } from 'src/components/molecules';
import { FlatList } from 'react-native';

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
  useLogin: () => {
    return {
      isLoggedIn: true,
    }
  },
}));

describe('<MostReadList>', () => {
  let instance: RenderAPI;
  const mockFn = jest.fn();

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
    },
  ];

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <MostReadList data={sampleData} onScroll={mockFn} isLoading={true} enableTag={true} flag={true}/>
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
    fireEvent(element, 'onPressBookmark', {index:2});
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
