import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState, useMemo} from 'react';
import {MyNewsWriters} from 'src/components/organisms';
import {AuthorsHorizontalSlider} from 'src/components/molecules';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native';
import { keyExtractor } from '../MyNewsWriters';

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
      selectedAuthorsData: {
        code: 2,
        message: 'string',
        data: {
          tid: '12'
        },
      },
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

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));


const sampleData = [
  {
    nid: '1',
    title: 'example',
    body: 'abc',
    field_image: 'abc',
    jwplayer: 'abc',
    field_jwplayer_id_opinion_export: [
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
    field_opinion_writer_node_export: [
      {
        id: 'example',
        opinion_writer_photo: 'example',
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
];

describe('<MyNewsWriters>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSelectedAuthors = mockFunction;
  const setPageCount = mockFunction;
  const setOpinionData = mockFunction;
  const setSelectedIndex = mockFunction;
  const setShowEmpty = mockFunction;

  const mockData = [
    {
      field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
      name: 'الحكومة',
    },
  ];

  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  };

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [
      null,
      setSelectedAuthors,
    ]);
    (useState as jest.Mock).mockImplementation(() => [0, setPageCount]);
    (useState as jest.Mock).mockImplementation(() => [[], setOpinionData]);
    (useState as jest.Mock).mockImplementation(() => [-1, setSelectedIndex]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowEmpty]);
    (useMemo as jest.Mock).mockReturnValue(mockData);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <MyNewsWriters />;
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
  
  test('Should call AuthorsHorizontalSlider onPress', () => {
    const element = instance.container.findByType(
      AuthorsHorizontalSlider as any,
    );
    fireEvent(element, 'onPress', [mockData, 0]);
    expect(setPageCount).toBeCalled();
  });

  test('Should call LoadMore Data', () => {
    const element = instance.container.findByType(FlatList as any);
    fireEvent(element, 'onEndReached');
    expect(setPageCount).toBeCalled();
  });

  test('Should call FlatList renderItem', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList ListFooterComponent', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'ListFooterComponent', {item: [{}], index: 0});
    expect(mockFunction).toBeTruthy()
  });
});
