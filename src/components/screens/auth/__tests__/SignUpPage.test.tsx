import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {SignUpPage} from '../SignUpPage';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<SignUpPage>', () => {
  let instance: RenderAPI;
  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
  }
  describe('when SignUpPage only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValue(navigation);
      const component = (
        <Provider store={storeSampleData}>
          <SignUpPage route={{ params: { email: 'testEmail@gmail.com' } }}  />
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SignUpPage', () => {
      expect(instance).toBeDefined();
    });
    it('When Press Back Button', () => {
      const testID = instance.getByTestId('signUp_back');
      fireEvent(testID, 'onPress')
      expect(navigation.goBack).toHaveBeenCalled();
    });
    it('When Press SignUp Button', () => {
      const testID = instance.getByTestId('signUp_signUp');
      fireEvent(testID, 'onPress')
      expect(navigation.dispatch).toHaveBeenCalled();
    });
  });
});
