import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState, useMemo } from 'react';
import { MyNewsTopics } from 'src/components/organisms';
import { ArticleItem, MyTopicsHorizontalSlider } from 'src/components/molecules';
import { FlatList } from 'react-native';
import { keyExtractor } from '../MyNewsTopics';
import { ArticlesListItemType } from 'src/redux/contentForYou/types';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useMemo: jest.fn(),
}));

jest.mock('src/hooks/useContentForYou', () => ({
  useContentForYou: () => {
    return {
      isLoading: false,
      favouriteOpinionsData: [],
      error: 'error',
      fetchFavouriteOpinionsRequest: () => {
        return [];
      },
      isArticleLoading: false,
      favouriteArticlesData: [],
      articleError: 'error',
      fetchFavouriteArticlesRequest: () => {
        return [];
      },
      emptyAllData: () => {
        return;
      },
    };
  },
}));

jest.mock('src/hooks/useAllWriters', () => ({
  useAllWriters: () => {
    return {
      isLoading: false,
      selectedAuthorsData: [],
      error: 'error',
      getSelectedAuthorsData: () => {
        return [];
      },
      fetchAllWritersRequest: () => {
        return [];
      },
    };
  },
}));

const sampleData: ArticlesListItemType[] = [
  {
    nid: '1',
    title: 'example',
    body: 'abc',
    field_image: 'abc',
    view_node: 'abc',
    field_news_categories_export: [
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ],
    field_publication_date_export: '2021-05-20T20:05:45+0000',
    created_export: '2021-05-20T20:05:45+0000',
    author_resource: 'author',
    type: 'type',
    field_new_photo: 'abc'
  },
  {
    nid: '2',
    title: 'example',
    body: 'abc',
    field_image: 'abc',
    view_node: 'abc',
    field_news_categories_export: [
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ],
    field_publication_date_export: '2021-05-20T20:05:45+0000',
    created_export: '2021-05-20T20:05:45+0000',
    author_resource: 'author',
    type: 'type',
    field_new_photo: 'abc'
  }
];

describe('<MyNewsWriters>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSelectedTopics = mockFunction;
  const setPageCount = mockFunction;
  const setArticleData = mockFunction;
  const setSelectedIndex = mockFunction;
  const setShowEmpty = mockFunction;
  const mockData = [
    {
      name: 'الحكومة',
    },
  ];

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [
      [],
      setSelectedTopics,
    ]);
    (useState as jest.Mock).mockImplementation(() => [0, setPageCount]);
    (useState as jest.Mock).mockImplementation(() => [[], setArticleData]);
    (useState as jest.Mock).mockImplementation(() => [-1, setSelectedIndex]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowEmpty]);
    (useMemo as jest.Mock).mockReturnValue(mockData);
    const component = <MyNewsTopics />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });
  
  it('should render component', () => {
    expect(keyExtractor('', 2)).toBeTruthy()
  });

  test('Should call LoadMore Data', () => {
    const element = instance.container.findByType(FlatList as any);
    fireEvent(element, 'onEndReached');
    expect(setPageCount).toBeCalled();
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call MyTopicsHorizontalSlider onPress', () => {
    const element = instance.container.findAllByType(MyTopicsHorizontalSlider)[0];
    fireEvent(element, 'onPress',{item: {item: mockData[0], index: -1}});
    expect(setPageCount).toBeCalled();
  });

});

describe('<MyNewsWriters>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSelectedTopics = mockFunction;
  const setPageCount = mockFunction;
  const setArticleData = mockFunction;
  const setSelectedIndex = mockFunction;
  const setShowEmpty = mockFunction;
  const mockData = [
    {
      name: 'الحكومة',
    },
  ];

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [
      [],
      setSelectedTopics,
    ]);
    (useState as jest.Mock).mockImplementation(() => [0, setPageCount]);
    (useState as jest.Mock).mockImplementation(() => [[], setArticleData]);
    (useState as jest.Mock).mockImplementation(() => [-1, setSelectedIndex]);
    (useState as jest.Mock).mockImplementation(() => [true, setShowEmpty]);
    (useMemo as jest.Mock).mockReturnValue(mockData);
    const component = <MyNewsTopics />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });

});
