import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState, useMemo } from 'react';
import { MyNewsTopics } from 'src/components/organisms';
import { MyTopicsHorizontalSlider } from 'src/components/molecules';
import { FlatList } from 'react-native';
import { keyExtractor } from '../MyNewsTopics';
import { ArticlesListItemType } from 'src/redux/contentForYou/types';
import { AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';
import { useContentForYou } from 'src/hooks';
import { useIsFocused } from '@react-navigation/native';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useMemo: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));

jest.mock('src/shared/styles/useThemeAware', () => {
  return {
    useThemeAwareObject: jest.fn(() => ({
      screenBackgroundColor: {
        backgroundColor: 'red'
      }
    })),
  }
})

jest.mock('src/hooks/useContentForYou', () => ({
  useContentForYou: jest.fn()
}));

const sampleAllSiteCategoriesItemTypeData: AllSiteCategoriesItemType[] = [
  {
    name: 'example',
    description__value_export: {},
    field_opinion_writer_path_export: {},
    view_taxonomy_term: 'example',
    tid: '1',
    vid_export: {},
    field_description_export: {},
    field_opinion_writer_path_export_1: {},
    field_opinion_writer_photo_export: 'example',
    parent_target_id_export: {},
    isSelected: true,
  },
  {
    name: 'example',
    description__value_export: {},
    field_opinion_writer_path_export: {},
    view_taxonomy_term: 'example',
    tid: '2',
    vid_export: {},
    field_description_export: {},
    field_opinion_writer_path_export_1: {},
    field_opinion_writer_photo_export: 'example',
    parent_target_id_export: {},
    isSelected: true,
  },
]

jest.mock("src/hooks/useAllSiteCategories", () => ({
  useAllSiteCategories: () => {
    return {
      isLoading: false,
      selectedTopicsData: {
        code: 200,
        message: "string",
        data: [
          {
            tid: '1'
          },
          {
            tid: '2'
          },
        ]
      },
      allSiteCategoriesData: sampleAllSiteCategoriesItemTypeData,
      error: 'error',
      getSelectedTopicsData: () => {
        return []
      },
      fetchAllSiteCategoriesRequest: () => {
        return []
      },
    }
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
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: jest.fn(),
  useNavigation: jest.fn()
}));


describe('<MyNewsTopics>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSelectedTopics = mockFunction;
  const setPageCount = mockFunction;
  const setArticleData = mockFunction;
  const setSelectedIndex = mockFunction;
  const setShowEmpty = mockFunction;
  const useContentForYouMock = mockFunction;
  const mockData = [
    {
      name: 'الحكومة',
    },
  ];
  const articleData = {
    nid: '3434',
    title: 'title',
    body: 'body',
    field_image: 'string',
    view_node: 'string',
    field_news_categories_export: [],
    field_publication_date_export: 'string',
    created_export: 'string',
    changed: 'string',
    author_resource: 'string',
    type: 'string',
    field_new_photo: 'string'
  }

 
  beforeEach(() => {
    (useIsFocused as jest.Mock).mockReturnValue(true);
    (useState as jest.Mock).mockImplementation(() => [
      [],
      setSelectedTopics,
    ]);
    (useState as jest.Mock).mockImplementation(() => [0, setPageCount]);
    (useState as jest.Mock).mockImplementation(() => [articleData, setArticleData]);
    (useState as jest.Mock).mockImplementation(() => [-1, setSelectedIndex]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowEmpty]);
    (useMemo as jest.Mock).mockReturnValue(mockData);
    (useContentForYou as jest.Mock).mockImplementation(useContentForYouMock)
    useContentForYouMock.mockReturnValueOnce({
      isArticalLoading: false,
      favouriteArticlesData: sampleData,
      fetchFavouriteArticlesRequest: () => {
        return [];
      },
    })
    DeviceTypeUtilsMock.isTab = true
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
    fireEvent(element, 'renderItem', { item: sampleData[0], index: 2 });
    expect(mockFunction).toHaveBeenCalled()
  });

  test('Should call FlatList onPress with isTab as false', () => {
    DeviceTypeUtilsMock.isTab = false
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', { item: sampleData[0], index: 0});
    expect(mockFunction).toHaveBeenCalled()
  });

  test('Should call MyTopicsHorizontalSlider onPress', () => {
    const element = instance.container.findAllByType(MyTopicsHorizontalSlider)[0];
    fireEvent(element, 'onPress', { item: { item: mockData[0], index: -1 } });
    expect(setPageCount).toBeCalled();
  });

});

describe('<MyNewsTopics>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSelectedTopics = mockFunction;
  const setPageCount = mockFunction;
  const setArticleData = mockFunction;
  const setSelectedIndex = mockFunction;
  const setShowEmpty = mockFunction;
  const useContentForYouMock = mockFunction;
  const mockData = [
    {
      name: 'الحكومة',
    },
  ];
  const articleData = {
    nid: '3434',
    title: 'title',
    body: 'body',
    field_image: 'string',
    view_node: 'string',
    field_news_categories_export: [],
    field_publication_date_export: 'string',
    created_export: 'string',
    changed: 'string',
    author_resource: 'string',
    type: 'string',
    field_new_photo: 'string'
  }

  beforeEach(() => {
    (useIsFocused as jest.Mock).mockReturnValue(false);
    (useState as jest.Mock).mockImplementation(() => [
      [],
      setSelectedTopics,
    ]);
    (useState as jest.Mock).mockImplementation(() => [0, setPageCount]);
    (useState as jest.Mock).mockImplementation(() => [articleData, setArticleData]);
    (useState as jest.Mock).mockImplementation(() => [-1, setSelectedIndex]);
    (useState as jest.Mock).mockImplementation(() => [true, setShowEmpty]);
    (useMemo as jest.Mock).mockReturnValue(mockData);
    (useContentForYou as jest.Mock).mockImplementation(useContentForYouMock)
    useContentForYouMock.mockReturnValueOnce({
      isArticalLoading: true,
      favouriteArticlesData: sampleData,
      fetchFavouriteArticlesRequest: () => {
        return [];
      },
    })
    DeviceTypeUtilsMock.isTab = false
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


describe('<MyNewsTopics>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSelectedAuthors = mockFunction;
  const setPageCount = mockFunction;
  const setOpinionData = mockFunction;
  const setSelectedIndex = mockFunction;
  const useContentForYouMock = mockFunction;
  const mockData = [
    {
      field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
      name: 'الحكومة',
    },
  ];

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useState as jest.Mock).mockImplementation(() => [
      null,
      setSelectedAuthors,
    ]);
    (useState as jest.Mock).mockImplementation(() => [0, setPageCount]);
    (useState as jest.Mock).mockImplementation(() => [[], setOpinionData]);
    (useState as jest.Mock).mockImplementation(() => [3, setSelectedIndex]);
    (useMemo as jest.Mock).mockReturnValue(mockData);
    (useContentForYou as jest.Mock).mockImplementation(useContentForYouMock)
    useContentForYouMock.mockReturnValueOnce({
      isArticalLoading: false,
      favouriteArticlesData: sampleData,
      fetchFavouriteArticlesRequest: () => {
        return [];
      },
    })
    const component = <MyNewsTopics />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should call MyTopicsHorizontalSlider onPress with sending index as 3', () => {
    const element = instance.container.findByType(
      MyTopicsHorizontalSlider as any,
    );
    fireEvent(element, 'onPress', mockData,3);
    expect(setPageCount).toBeCalled();
  });
});
describe('<MyNewsTopics>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setPageCount = mockFunction;
  const useContentForYouMock = mockFunction;
  const mockData = [
    {
      field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
      name: 'الحكومة',
    },
  ];

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useState as jest.Mock).mockImplementation(() => [0, setPageCount]);
    (useMemo as jest.Mock).mockReturnValue(mockData);
    (useContentForYou as jest.Mock).mockImplementation(useContentForYouMock)
    useContentForYouMock.mockReturnValueOnce({
      isArticalLoading: false,
      favouriteArticlesData: sampleData,
      fetchFavouriteArticlesRequest: () => {
        return [];
      },
    })
    const component = <MyNewsTopics />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render component with page count as 0', () => {
    expect(instance).toBeDefined();
  });
});