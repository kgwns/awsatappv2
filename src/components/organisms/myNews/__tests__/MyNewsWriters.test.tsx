import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState, useMemo} from 'react';
import {MyNewsWriters} from 'src/components/organisms';
import {AuthorsHorizontalSlider} from 'src/components/molecules';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useMemo: jest.fn(),
}));

jest.mock('src/hooks/useContentForYou', () => ({
  useContentForYou: (...args: any) => {
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
  useAllWriters: (...args: any) => {
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

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

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
});
