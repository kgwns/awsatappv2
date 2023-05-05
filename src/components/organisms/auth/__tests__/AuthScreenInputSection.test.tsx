import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {AuthScreenInputSection} from '../AuthScreenInputSection';
import {SocialButtonSection} from '../SocialButtonSection';
import { TextInputField, SocialLoginButton } from 'src/components/atoms';

describe('<AuthScreenInputSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn()
  describe('when AuthScreenInputSection only', () => {
    beforeEach(() => {
      const component = <AuthScreenInputSection
        setChangeText={mockFunction}
        navigateToSection={mockFunction}
        setChangePassword={mockFunction}
        onPressSignup={mockFunction}
        goToPasswordScreen={mockFunction}
        isPassword={true}
        passwordTestID={'testid'}
        showAlertNoInternet={mockFunction}
      />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render AuthScreenInputSection', () => {
      expect(instance).toBeDefined();
    });
    it('When TextInputField change', () => {
      const testId = instance.container.findAllByType(TextInputField)[0];
      fireEvent(testId, 'onChangeText',{text: 'mockString',type: 'email'});
      expect(mockFunction).toHaveBeenCalled;
    });
    it('When TextInputField change', () => {
      const testId = instance.container.findAllByType(TextInputField)[1];
      fireEvent(testId, 'onChangeText',{text: 'mockString',type: 'password'});
      expect(mockFunction).toBeTruthy();
    });
    it('When SocialLoginButton Press', () => {
      const testId = instance.container.findAllByType(SocialLoginButton)[0];
      fireEvent(testId, 'onPress');
      expect(mockFunction).toHaveBeenCalled;
    });
    it('When Password Press', () => {
      const testId = instance.getByTestId('testid');
      fireEvent(testId, 'onPress');
      expect(mockFunction).toHaveBeenCalled;
    });
    it('When signin_forget_password Press', () => {
      const testId = instance.getByTestId('signin_forget_password');
      fireEvent(testId, 'onPress');
      expect(mockFunction).toHaveBeenCalled;
    });
    it('When SocialButtonSection Press', () => {
      const testId = instance.container.findByType(SocialButtonSection);
      const socialButton = testId.findAllByType(SocialLoginButton)[0]
      fireEvent(socialButton, 'onPress',['FACEBOOK']);
      expect(mockFunction).toHaveBeenCalled;
    });
  });
  describe('when AuthScreenInputSection only', () => {
    beforeEach(() => {
      const component = <AuthScreenInputSection
        setChangeText={mockFunction}
        navigateToSection={mockFunction}
        setChangePassword={mockFunction}
        onPressSignup={mockFunction}
        goToPasswordScreen={mockFunction}
        isPassword={false}
        passwordTestID={'testid'}
        showAlertNoInternet={mockFunction}
      />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render AuthScreenInputSection', () => {
      expect(instance).toBeDefined();
    });
  });
});
