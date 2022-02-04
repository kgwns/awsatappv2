import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState} from 'react';
import {SearchList} from '../SearchList';
import {TouchableWithoutFeedback} from 'react-native';
import { SearchBar } from 'src/components/molecules'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<SearchList>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setSearchText = jest.fn();

  describe('when SearchList is displayed when SearchText length is 0', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => ['', setSearchText]);
      instance = render(<SearchList onItemActionPress={mockFunction} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('Should render SearchList', () => {
      expect(instance).toBeDefined();
    });
  });
  describe('when SearchList is displayed when SearchText length grater than 0', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => ['search', setSearchText]);
      instance = render(<SearchList onItemActionPress={mockFunction} onTextChange={mockFunction} />);
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
  });
});
