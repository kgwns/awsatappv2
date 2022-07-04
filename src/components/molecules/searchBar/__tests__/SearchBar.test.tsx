import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';

import {SearchBar} from '../SearchBar';

describe('<SearchBar>', () => {
  let instance: RenderAPI;

  const testString = 'testString';
  const mockFunction = jest.fn();

  describe('when SearchBar only', () => {
    beforeEach(() => {
      const component = (
        <SearchBar
          searchText={testString}
          onChangeText={mockFunction}
          onClearSearchText={mockFunction}
          testID="inputSearchId"
        />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SearchBar', () => {
      expect(instance).toBeDefined();
    });
    it('When Item is pressed', () => {
      const testInputSearchId = instance.getByTestId('inputSearchId');
      fireEvent(testInputSearchId, 'onChangeText', 'searchText');
      expect(mockFunction).toHaveBeenCalled();
    });
  });
});
