import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React, { useState } from 'react';
import {SignUpPage} from '../SignUpPage';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { useRegister } from 'src/hooks';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/hooks/useRegister', () => ({useRegister: jest.fn()}));

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
        },
        user: {
          id: '2'
        }
      },
    }
  },
}));

describe('<SignUpPage>', () => {
  let instance: RenderAPI;
  const mockDispatch = jest.fn();
  const navigation = {
    reset: mockDispatch,
    navigate: mockDispatch,
    goBack: mockDispatch,
  }
  const password = mockDispatch;
  const useRegisterMock = mockDispatch;
  describe('when SignUpPage only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValue(navigation);
      (useRegister as jest.Mock).mockImplementation(useRegisterMock);
      (useState as jest.Mock).mockImplementation(() => ['Password@1', password]);
      useRegisterMock.mockReturnValue({
        socialLoginEnded:()=>mockDispatch,
        emptyUserInfo:()=>mockDispatch,
        createUserRequest:()=> mockDispatch,
        registerUserInfo: {
          user: {
            email: "abc@gmail.com",
            id: '2',
          },
          message: {
            message: 'abc',
            code: 200,
            newUser: 0,
          },
        },
        isRegisterLoading: true,
        registerError: 'Network Error'
      });
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

describe('<SignUpPage>', () => {
  let instance: RenderAPI;
  const mockDispatch = jest.fn();
  const navigation = {
    reset: mockDispatch,
    navigate: mockDispatch,
    goBack: mockDispatch,
  }
  const password = mockDispatch;
  const useRegisterMock = mockDispatch;
  describe('when SignUpPage only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValue(navigation);
      (useRegister as jest.Mock).mockImplementation(useRegisterMock);
      (useState as jest.Mock).mockImplementation(() => ['', password]);
      useRegisterMock.mockReturnValue({
        socialLoginEnded:()=>mockDispatch,
        emptyUserInfo:()=>mockDispatch,
        createUserRequest:()=> mockDispatch,
        registerUserInfo: {
          user: {
            email: "abc@gmail.com",
            id: '2',
          },
          message: {
            newUser: 0,
            message: 'abc',
            code: 0
          },
        },
        isRegisterLoading: true,
        registerError: 'Network Error'
      });
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
    it('When Press SignUp Button', () => {
      const testID = instance.getByTestId('signUp_signUp');
      fireEvent(testID, 'onPress')
      expect(mockDispatch).toBeTruthy();
    });
  });
});

describe('<SignUpPage>', () => {
  let instance: RenderAPI;
  const mockDispatch = jest.fn();
  const navigation = {
    reset: mockDispatch,
    navigate: mockDispatch,
    goBack: mockDispatch,
  }
  const password = mockDispatch;
  const useRegisterMock = mockDispatch;
  describe('when SignUpPage only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValue(navigation);
      (useRegister as jest.Mock).mockImplementation(useRegisterMock);
      (useState as jest.Mock).mockImplementation(() => ['', password]);
      useRegisterMock.mockReturnValue({
        socialLoginEnded:()=>mockDispatch,
        emptyUserInfo:()=>mockDispatch,
        createUserRequest:()=> mockDispatch,
        registerUserInfo: {},
        isRegisterLoading: true,
        registerError: 'Error'
      });
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
    it('When Press SignUp Button', () => {
      const testID = instance.getByTestId('signUp_signUp');
      fireEvent(testID, 'onPress')
      expect(mockDispatch).toBeTruthy();
    });
  });
});

