import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState, useMemo} from 'react';
import {MyNewsWriters} from 'src/components/organisms';
import {AuthorsHorizontalSlider} from 'src/components/molecules';
import {useNavigation} from '@react-navigation/native';

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
}));

describe('<MyNewsWriters>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSelectedAuthors = mockFunction;
  const setPageCount = mockFunction;
  const setOpinionData = mockFunction;
  const setSelectedIndex = mockFunction;
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

  //   test('Should call AuthorItem onPress', () => {
  //     const element = instance.getByTestId('MyNewsAuthor_0');
  //     fireEvent(element, 'onPress', [mockData, 0]);
  //     expect(mockFn).toBeCalled();
  //   });

  test('Should call setInitialData onPress', () => {
    jest.useFakeTimers();
    expect(setPageCount).toBeCalled();
  });

  test('Should call AuthorsHorizontalSlider onPress', () => {
    const element = instance.container.findByType(
      AuthorsHorizontalSlider as any,
    );
    fireEvent(element, 'onPress', [mockData, 0]);
    expect(setPageCount).toBeCalled();
  });

  //   test('Should call ScrollView onContentSizeChange', () => {
  //     const element = instance.container.findByType(ScrollView as any);
  //     fireEvent(element, 'onContentSizeChange');
  //     expect(mockFn).toBeTruthy();
  //   });
});
