import { render, RenderAPI, fireEvent } from '@testing-library/react-native';
import React, { useState } from 'react';
import { SearchScreen } from '../SearchScreen';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { SearchItemType } from 'src/redux/search/types';
import { useSearch } from 'src/hooks';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true
}));  

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const mockData: SearchItemType[] = [{
  nid: '1',
  title: 'qsd',
  field_image: 'asd',
  view_node: 'asd',
  field_publication_date_export: 'asd',
  created_export: 'sd',
  field_news_categories_export: [],
  type: 'asd',
  body: 'asd',
  field_new_photo: 'asd'
},
{
  nid: '2',
  title: 'qsd',
  field_image: 'asd',
  view_node: 'asd',
  field_publication_date_export: 'asd',
  created_export: 'sd',
  field_news_categories_export: [],
  type: 'asd',
  body: 'asd',
  field_new_photo: 'asd'
},
]

const mockData2: SearchItemType[] = [{
  title: 'qsd',
  field_image: 'asd',
  view_node: 'asd',
  field_publication_date_export: 'asd',
  created_export: 'sd',
  field_news_categories_export: [],
  type: 'asd',
  body: 'asd',
  field_new_photo: 'asd'
},
]

jest.mock("src/hooks/useSearch", () => ({
  useSearch: jest.fn(),
}));


  let instance: RenderAPI;
  const setSearchText = jest.fn()
  const mockFunction = jest.fn()
  const useSearchMock = jest.fn();
  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  }
describe('when SearchScreen only', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => ['example', setSearchText]);
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useSearch as jest.Mock).mockImplementation(useSearchMock);
      (useSearchMock).mockReturnValue({
        fetchSearchRequest: () => { },
        isLoading: false,
        searchData: mockData,
        setSearchHistory: () => { },
        searchHistory: ['abc', 'def', 'abc', 'abc', 'def', 'abc', 'abc', 'def', 'abc', 'abc', 'def', 'abc', 'abc', 'def', 'abc', 'abc', 'def', 'abc']
      });
      const component = (
        <Provider store={storeSampleData}>
          <SearchScreen />
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SearchScreen', () => {
      expect(instance).toBeDefined();
    });
    it('when onPress is pressed from GoBack in mobile', () => {
      DeviceTypeUtilsMock.isTab = false;
      const testID = instance.getByTestId('search_goBack');
      fireEvent(testID, 'onPress');
      expect(navigation.goBack).toHaveBeenCalled();
    });
    it('when onTextChange is called from SearchList', () => {
      const searchListId = instance.getByTestId('search-input');
      fireEvent(searchListId, 'onTextChange', 'search');
    });
    it('when onTextChange is called from SearchList', () => {
      const searchListId = instance.getByTestId('search-input');
      fireEvent(searchListId, 'onTextChange', '');
    });
    it('when onItemActionPress is called from SearchList', () => {
      const searchListId = instance.getByTestId('search-input');
      fireEvent(searchListId, 'onItemActionPress', mockData[0]);
      expect(navigation.navigate).toHaveBeenCalled();
    });
    it('when onItemActionPress is called from SearchList without nid', () => {
      const searchListId = instance.getByTestId('search-input');
      fireEvent(searchListId, 'onItemActionPress', mockData2[0]);
      expect(navigation.navigate).not.toHaveBeenCalled();
    });
    it('when onPressHistory is called from SearchList', () => {
      const searchListId = instance.getByTestId('search-input');
      fireEvent(searchListId, 'onPressHistory', 'search');
    });
});

describe('SearchScreen renders in tab', () => {
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => ['example', setSearchText]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useSearch as jest.Mock).mockImplementation(useSearchMock);
    (useSearchMock).mockReturnValue({
      fetchSearchRequest: () => { },
      isLoading: false,
      searchData: mockData,
      setSearchHistory: () => { },
      searchHistory: ['abc', 'def', 'abc', 'abc', 'def', 'abc', 'abc', 'def', 'abc', 'abc', 'def', 'abc', 'abc', 'def', 'abc', 'abc', 'def', 'abc']
    });
    DeviceTypeUtilsMock.isTab = true;

    const component = (
      <Provider store={storeSampleData}>
        <SearchScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('when onPress is pressed from GoBack in tab', () => {
    const testID = instance.getByTestId('search_goBack');
    fireEvent(testID, 'onPress');
    expect(navigation.goBack).toHaveBeenCalled();
  });

});


describe('rendering with empty search data and history', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSearchText = jest.fn();
  const useSearchMock = jest.fn();  
  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  }
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => ['example', setSearchText]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useSearch as jest.Mock).mockImplementation(useSearchMock);
    (useSearchMock).mockReturnValue({
      fetchSearchRequest: () => { },
      isLoading: false,
      searchData: [],
      setSearchHistory: () => { },
      searchHistory: []
    });
    const component = (
      <Provider store={storeSampleData}>
        <SearchScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });
  it('Should render SearchScreen', () => {
    expect(instance).toBeDefined();
  });

});

describe('when SearchScreen only', () => {
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => ['', setSearchText]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useSearch as jest.Mock).mockImplementation(useSearchMock);
    (useSearchMock).mockReturnValue({
      fetchSearchRequest: () => { },
      isLoading: false,
      searchData: mockData,
      setSearchHistory: () => { },
      searchHistory: []
    });
    const component = (
      <Provider store={storeSampleData}>
        <SearchScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });
  it('when onItemActionPress is called from SearchList', () => {
    const searchListId = instance.getByTestId('search-input');
    fireEvent(searchListId, 'onItemActionPress', mockData[0]);
    expect(navigation.navigate).toHaveBeenCalled();
  });
});