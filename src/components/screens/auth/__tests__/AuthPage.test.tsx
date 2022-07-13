import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {AuthPage} from '../AuthPage';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData';
import { SocialButtonSection } from '../../../organisms/';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

describe('<AuthPage>', () => {
  let instance: RenderAPI;
  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
  }
  describe('when AuthPage only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      const component = (
        <Provider store={storeSampleData}>
          <AuthPage  />
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render AuthPage', () => {
      expect(instance).toBeDefined();
    });
    it('When Press Skip Button', () => {
      const testID = instance.getByTestId('signin_skip');
      fireEvent(testID, 'onPress')
      expect(navigation.reset).toHaveBeenCalled();
    });
    it('When Press SignIn Button', () => {
      const testID = instance.getByTestId('signin_signIn');
      fireEvent(testID, 'onPress','SIGNINPAGE');
      expect(navigation.navigate).toBeTruthy();
    });
    it('When Press TermsAndCondition Button', () => {
      const testID = instance.getByTestId('terms_and_conditions');
      fireEvent(testID, 'onPress','TERMSANDCONDITIONS');
      expect(testID).toBeTruthy();
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
    it('When Press Email Button', () => {
      const testID = instance.container.findByType(SocialButtonSection);
      fireEvent(testID, 'onButtonPress','EMAIL');
      expect(testID).toBeTruthy();
    });
  });
});
