import {SocialLoginButton} from 'src/components/atoms/social-login-button/SocialLoginButton';
import { render, RenderAPI, fireEvent } from '@testing-library/react-native';
import React from 'react';
import * as utilsSignIn from 'src/shared/utils/appleSignin';
import { SocialButtonSection } from '../SocialButtonSection';
import { useNavigation } from '@react-navigation/native';
import { useRegister } from 'src/hooks/useRegister';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
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



jest.mock('@invertase/react-native-apple-authentication',()=> ({
  appleAuth:{
    isSupported:true
  }
}))

jest.mock("src/hooks/useRegister", () => {
  return {
    useRegister: jest.fn()
  }
});

jest.mock('src/hooks/useLogin', () => ({
  useLogin: () => {
    return {
      loginData: {
        user: {
          id: 2
        }
      }
    }
  }
}));

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn()
  }
})

describe('<SocialButtonSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const useRegisterMock = jest.fn()
  const navigation = {
    reset: mockFunction
  }
  beforeEach(()=>{
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
  })

  describe('when SocialButtonSection only', () => {
    beforeEach(() => {
      DeviceTypeUtilsMock.isIOS = true;
      (useRegister as jest.Mock).mockImplementation(useRegisterMock);
      useRegisterMock.mockReturnValue({
        isRegisterLoading: false,
        registerUserInfo: {
          user: 'user',
          token: 'token',
          message: {
            code: 200,
            message:'message'
          }
        },
        registerError: 'string',
        socialLoginInProgress: false,
        createUserRequest: () => { },
        socialLoginStarted: () => { },
        socialLoginEnded: () => { },
        emptyUserInfo: () => { }
      });
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
    it('when onPress facebook Social Buttons', () => {
      const testID = instance.getByTestId('signin_facebook');
      fireEvent(testID, 'onPress');
      expect(mockFunction).toHaveBeenCalled();
    })
    it('when onPress google Social Buttons', () => {
      const testID = instance.getByTestId('signin_google');
      fireEvent(testID, 'onPress');
      expect(mockFunction).toHaveBeenCalled();
    })
    it('when onPress Social Buttons', () => {
      const testID = instance.container.findAllByType(SocialLoginButton)[0];
      fireEvent(testID, 'onPress');
      expect(utilsSignIn.appleSignin()).toBeTruthy();
    })

    it('when press apple login', () => {
      jest.spyOn(utilsSignIn,'appleSignin').mockResolvedValue({
        user:'user',
        email: 'email@test.com',
        nonce: 'nonce',
        identityToken: 'token',
        realUserStatus: {},
        fullName:{
          givenName:'givenName',
          familyName:'familyname',
          middleName:'middleName',
          namePrefix:'namePrefix',
          nameSuffix:'nameSuffix',
          nickname:'nickName'
        }
      });
      const testID = instance.getByTestId('signin_apple')
      fireEvent(testID, 'onPress');
      const response = utilsSignIn.appleSignin();
      expect(response).toBeDefined();
    })
  });

  describe('test when register fails', () => {
    beforeEach(() => {
      (useRegister as jest.Mock).mockImplementation(useRegisterMock);
      useRegisterMock.mockReturnValue({
        isRegisterLoading: false,
        registerUserInfo: {
          user: 'user',
          token: 'token',
          message:{}
        },
        registerError: 'string',
        socialLoginInProgress: false,
        createUserRequest: () => { },
        socialLoginStarted: () => { },
        socialLoginEnded: () => { },
        emptyUserInfo: () => { }
      });
      const component = <SocialButtonSection showAlertNoInternet={mockFunction} socialButtonBoldStyle={false} onButtonPress={mockFunction} />;
      instance = render(component);
    });
    afterEach(()=>{
      jest.clearAllMocks();
      instance.unmount();
    })
    it('render when register fails', () => {
      expect(instance).toBeDefined();
    })
  });
});

