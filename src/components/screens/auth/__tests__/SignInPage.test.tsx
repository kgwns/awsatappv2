import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {SignInPage} from '../SignInPage';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData';
import { SocialButtonSection } from '../../../organisms/';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<SignInPage>', () => {
  let instance: RenderAPI;
  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }
  describe('when SignInPage only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      const component = (
        <Provider store={storeSampleData}>
          <SignInPage route={{ params: { email: 'testEmail@gmail.com' } }}  />
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SignInPage', () => {
      expect(instance).toBeDefined();
    });
    it('When Press Skip Button', () => {
      const testID = instance.getByTestId('signin_back');
      fireEvent(testID, 'onPress')
      expect(navigation.goBack).toHaveBeenCalled();
    });
    it('When Press SignIn Button', () => {
      const testID = instance.container.findByType(SocialButtonSection);
      fireEvent(testID, 'onPress')
      expect(jest.fn()).toBeTruthy();
    });
    it('When Press Apple Button', () => {
      const testID = instance.container.findByType(SocialButtonSection);
      fireEvent(testID, 'onButtonPress','APPLE');
      expect(testID).toBeTruthy();
    });
    it('When Press Google Button', () => {
      const testID = instance.container.findByType(SocialButtonSection);
      fireEvent(testID, 'onButtonPress','GOOGLE');
      expect(testID).toBeTruthy();
    });
    it('When Press Facebook Button', () => {
      const testID = instance.container.findByType(SocialButtonSection);
      fireEvent(testID, 'onButtonPress','FACEBOOK');
      expect(testID).toBeTruthy();
    });
  });
});
