import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState, useMemo } from 'react';
import { MyNewsTopics } from 'src/components/organisms';
import { MyTopicsHorizontalSlider } from 'src/components/molecules';
import { FlatList } from 'react-native';

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

  test('Should call AuthorsHorizontalSlider onPress', () => {
    const element = instance.container.findByType(
      MyTopicsHorizontalSlider as any,
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
