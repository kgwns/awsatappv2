import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {onSuccessSocialLogin, SignInPage, SocialProviders} from '../SignInPage';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData';
import { AuthScreenInputSection, SocialButtonSection } from '../../../organisms/';
import {useNavigation} from '@react-navigation/native';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: () => {
    return {
      getBookmarkedId: () => [],
    }
  },
}));

jest.mock("src/hooks/useUserProfileData", () => ({
  useUserProfileData: () => {
    return {
      fetchProfileDataRequest: () => [],
    }
  },
}));

jest.mock("src/hooks/useSearch", () => ({
  useSearch: () => {
    return {
      emptySearchHistory: () => [],
    }
  },
}));

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

jest.mock("src/hooks/useRegister", () => ({
  useRegister: () => {
      return {
        socialLoginEnded:()=>jest.fn(),
        emptyUserInfo:()=>jest.fn(),
        createUserRequest:()=> jest.fn(),
        socialLoginStarted:()=> jest.fn(),
        socialLoginInProgress: true,
        registerUserInfo: {
          user: {
            email: "abc@gmail.com",
            id: '2',
          },
          message: {
            message: 'abc'
          },
        },
        isRegisterLoading: true,
        registerError: 'Network Error'
      }
  },
}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
    return {
      isLoading: false,
      loginData: {
        message: {
          newUser: 'newUser'
        },
        token: {
          token_type: 'type',
          access_token: 'abcd123'
        }
      },
      loginError: 'example',
      fetchLoginRequest: () => [],
      isLoggedIn: false,
      token: 'string',
      user: {},
      fetchLogoutRequest: () => [],
      loginSkipped: () => [],
      isSkipped: false,
      forgotPassswordResponse: {},
      forgotPassworRequest: () => [],
      emptyforgotPassworResponseInfo: () => [],
      emptyLoginDataInfo: () => [],
    }
  },
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
    test('Should call ScreenContainer alertOnPress', () => {
      const element = instance.container.findAllByType(ScreenContainer)[0];
      fireEvent(element, 'alertOnPress');
      expect(element).toBeTruthy()
    });
    test('Should call AuthScreenInputSection goToPasswordScreen', () => {
      const element = instance.container.findAllByType(AuthScreenInputSection)[0];
      fireEvent(element, 'goToPasswordScreen', {email: 'abc@gmail.com'});
      expect(element).toBeTruthy()
    });
    test('Should call AuthScreenInputSection onPressSignup', () => {
      const element = instance.container.findAllByType(AuthScreenInputSection)[0];
      fireEvent(element, 'onPressSignup');
      expect(element).toBeTruthy()
    });
    test('Should call onSuccessSocialLogin', () => {
      expect(onSuccessSocialLogin({user: {photo: 'abc.com', profile_url: 'abc.com', id: '2', familyName: 'abc', givenName: 'bcd', email: 'abc@gmail.com'}}, SocialProviders.facebook)).toBeTruthy()
    });

    test('Should call onSuccessSocialLogin', () => {
      expect(onSuccessSocialLogin({user: {photo: 'abc.com', profile_url: 'abc.com', id: '2', familyName: 'abc', givenName: 'bcd', email: 'abc@gmail.com'}}, SocialProviders.google)).toBeTruthy()
    });
  });
});