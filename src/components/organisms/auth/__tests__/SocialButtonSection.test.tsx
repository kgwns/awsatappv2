import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React from 'react';
import { SocialLoginButton } from 'src/components/atoms';
import { appleSignin } from 'src/shared/utils/appleSignin';
import {SocialButtonSection} from '../SocialButtonSection';

jest.mock("src/hooks/useNotificationSaveToken", () => ({
  useNotificationSaveToken: () => {
    return {
      isSaveTokenLoading: false,
      saveTokenData: {
        id: 2,
        message: "string",
      },
      storeServerEnvironmentInfo: () => [],
      saveTokenError: '',
      saveTokenRequest: () => [],
      saveTokenAfterRegistrationRequest: () => [],
    }
  },
}));

describe('<SocialButtonSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn()
  describe('when SocialButtonSection only', () => {
    beforeEach(() => {
      const component = <SocialButtonSection showAlertNoInternet={mockFunction} socialButtonBoldStyle={true} onButtonPress={mockFunction} />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SocialButtonSection', () => {
      expect(instance).toBeDefined();
    });
    it('when onPree Social Buttons', () => {
      const testID = instance.getByTestId('signin_facebook');
      fireEvent(testID, 'onPress');
      expect(mockFunction).toHaveBeenCalled();
    })
    it('when onPree Social Buttons', () => {
      const testID = instance.getByTestId('signin_google');
      fireEvent(testID, 'onPress');
      expect(mockFunction).toHaveBeenCalled();
    })
    it('when onPree Social Buttons', () => {
      const testID = instance.container.findAllByType(SocialLoginButton)[0];
      fireEvent(testID, 'onPress');
      expect(appleSignin()).toBeTruthy();
    })
  });
});
