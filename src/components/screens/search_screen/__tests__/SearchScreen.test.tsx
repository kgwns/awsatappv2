import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React, {useState} from 'react';
import { SearchScreen } from '../SearchScreen';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import { SearchItemType } from 'src/redux/search/types';

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
  useSearch: () => {
    return {
      fetchSearchRequest: () => {},
      isLoading: false,
      searchData: mockData, 
      setSearchHistory: () => {}, 
      searchHistory: ['abc', 'def', 'abc','abc', 'def', 'abc','abc', 'def', 'abc','abc', 'def', 'abc','abc', 'def', 'abc','abc', 'def', 'abc']
    }
  },
}));

describe('<SearchScreen>', () => {
  let instance: RenderAPI;
  const setSearchText = jest.fn()
  const mockFunction = jest.fn()
  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  }
  describe('when SearchScreen only', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => ['example', setSearchText]);
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
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
    it('when onPress is pressed from GoBack', () => {
      const testID = instance.getByTestId('search_goBack');
      fireEvent(testID, 'onPress');
      expect(navigation.goBack).toHaveBeenCalled();
    });
    it('when onTextChange is called from SearchList', () => {
      const searchListId = instance.getByTestId('search-input');
      fireEvent(searchListId, 'onTextChange', 'search');
      expect(setSearchText).toHaveBeenCalled();
    });
    it('when onTextChange is called from SearchList', () => {
      const searchListId = instance.getByTestId('search-input');
      fireEvent(searchListId, 'onTextChange', '');
      expect(setSearchText).toHaveBeenCalled();
    });
    it('when onItemActionPress is called from SearchList', () => {
      const searchListId = instance.getByTestId('search-input');
      fireEvent(searchListId, 'onItemActionPress', mockData[0]);
      expect(navigation.navigate).toBeTruthy();
    });
    it('when onItemActionPress is called from SearchList', () => {
      const searchListId = instance.getByTestId('search-input');
      fireEvent(searchListId, 'onItemActionPress', mockData2[0]);
      expect(navigation.navigate).toBeTruthy();
    });
    it('when onPressHistory is called from SearchList', () => {
      const searchListId = instance.getByTestId('search-input');
      fireEvent(searchListId, 'onPressHistory', 'search');
      expect(navigation.navigate).toBeTruthy();
    });
  });
});
