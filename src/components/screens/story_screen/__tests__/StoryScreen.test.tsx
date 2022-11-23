import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { StoryScreen } from '../StoryScreen';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<StoryScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn()
  const navigation = {
    goBack: mockFunction
  }
  describe('when StoryScreen only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      const component = (
        <Provider store={storeSampleData}>
          <StoryScreen route={{params:{selectedIndex:0}}} />
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render StoryScreen', () => {
      expect(instance).toBeDefined();
    });
  });
});
