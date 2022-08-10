import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {SignUpPage} from '../SignUpPage';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData';
import {useNavigation} from '@react-navigation/native';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock("src/hooks/useRegister", () => ({
  useRegister: () => {
      return {
        socialLoginEnded:()=>jest.fn(),
        emptyUserInfo:()=>jest.fn(),
        createUserRequest:()=> jest.fn(),
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

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
    return {
      loginData: {
        message: {
          newUser: 'newUser'
        },
        token: {
          token_type: 'type',
          access_token: 'abcd123'
        }
      },
    }
  },
}));

describe('<SignUpPage>', () => {
  let instance: RenderAPI;
  const mockDispatch = jest.fn();
  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
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
      expect(mockDispatch).toBeTruthy();
    });
    test('Should call ScreenContainer alertOnPress', () => {
      const element = instance.container.findAllByType(ScreenContainer)[0];
      fireEvent(element, 'alertOnPress');
      expect(element).toBeTruthy()
    });
  });
});
