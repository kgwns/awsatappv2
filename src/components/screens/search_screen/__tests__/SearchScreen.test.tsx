import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React, {useState} from 'react';
import { SearchScreen } from '../SearchScreen';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData';
import {useNavigation} from '@react-navigation/native';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
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
      (useState as jest.Mock).mockImplementation(() => ['', setSearchText]);
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
      fireEvent(searchListId, 'onTextChange', '');
      expect(setSearchText).toHaveBeenCalled();
    });
    it('when onItemActionPress is called from SearchList', () => {
      const searchListId = instance.getByTestId('search-input');
      fireEvent(searchListId, 'onItemActionPress', {nid:0});
      expect(navigation.navigate).toBeTruthy();
    });
  });
});
