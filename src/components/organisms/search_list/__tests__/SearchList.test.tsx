import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState} from 'react';
import {SearchList} from '../SearchList';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import { SearchBar } from 'src/components/molecules'
import { recordLogEvent } from 'src/shared/utils';
import { SearchItemType } from 'src/redux/search/types';
import { ButtonList, SocialLoginButton } from 'src/components/atoms';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useSearch", () => ({
  useSearch: () => {
    return {
      emptySearchHistory: () => [],
    }
  },
}));

describe('<SearchList>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const setSearchText = jest.fn();
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
  describe('when SearchList is displayed when SearchText length grater than 0', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => ['search', setSearchText]);
      instance = render(<SearchList isLoading={false} data={mockData} onItemActionPress={mockFunction} onTextChange={mockFunction} searchHistory={['abc', 'bcd']} onPressHistory={mockFunction} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('Should render SearchList', () => {
      expect(instance).toBeDefined();
    });
    it('when SearchResults only When onPress', () => {
      const searchResults = instance.getByTestId('searchResultsListID')
      const testID = searchResults.findAllByType(TouchableWithoutFeedback)[0];
      fireEvent(testID, 'onPress', ['teststring']);
      expect(mockFunction).toHaveBeenCalled();
    });
    it('when searchBar onChangeText only', () => {
      const searchBarId = instance.container.findByType(SearchBar);
      fireEvent(searchBarId, 'onChangeText', ['teststring']);
      expect(setSearchText).toHaveBeenCalled();
    });
    it('when searchBar onClearSearchText only', () => {
      const searchBarId = instance.container.findByType(SearchBar);
      fireEvent(searchBarId, 'onClearSearchText');
      expect(mockFunction).toHaveBeenCalled();
    });
    it('when searchBar onSubmitSearch only', () => {
      const searchBarId = instance.container.findAllByType(SearchBar)[0];
      fireEvent(searchBarId, 'onSubmitSearch');
      expect(recordLogEvent).toBeTruthy();
    });
    test('Should call FlatList ListEmptyComponent', () => {
      const element = instance.container.findAllByType(FlatList)[0];
      fireEvent(element, 'ListEmptyComponent');
      expect(mockFunction).toBeTruthy()
  });
  });
});

describe('<SearchList>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const setSearchText = jest.fn();
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
  describe('when SearchList is displayed when SearchText length grater than 0', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => ['sea', setSearchText]);
      instance = render(<SearchList isLoading={false} data={mockData} onItemActionPress={mockFunction} onTextChange={mockFunction} searchHistory={['abc', 'bcd']} onPressHistory={mockFunction} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('Should render SearchList', () => {
      expect(instance).toBeDefined();
    });

    it('when ButtonList onPress', () => {
      const searchBarId = instance.container.findAllByType(ButtonList)[0];
      fireEvent(searchBarId, 'onPress', 'sea');
      expect(mockFunction).toBeTruthy();
    });

    it('when SocialLoginButton onPress', () => {
      const searchBarId = instance.container.findAllByType(SocialLoginButton)[0];
      fireEvent(searchBarId, 'onPress');
      expect(mockFunction).toBeTruthy();
    });
    
  });
});

