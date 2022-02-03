import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {AuthPage} from '../AuthPage';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData';
import { SocialButtonSection } from '../../../organisms/';


describe('<AuthPage>', () => {
  let instance: RenderAPI;
  describe('when AuthPage only', () => {
    beforeEach(() => {
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
      expect(testID).toBeTruthy();
    });
    it('When Press SignIn Button', () => {
      const testID = instance.getByTestId('signin_button');
      fireEvent(testID, 'onPress','SIGNINPAGE');
      expect(testID).toBeTruthy();
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
