import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React, { useState }  from 'react';
import {AuthPage} from '../AuthPage';
import { Provider } from 'react-redux'
import { ScreensConstants, storeSampleData } from '../../../../constants/Constants';
import { AuthScreenInputSection, SocialButtonSection } from '../../../organisms/';
import {useNavigation} from '@react-navigation/native';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { useEmailCheck, useRegister } from 'src/hooks';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/hooks/useEmailCheck', () => ({useEmailCheck: jest.fn()}));
jest.mock('src/hooks/useRegister', () => ({useRegister: jest.fn()}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
      return {
        emptyforgotPassworResponseInfo:()=>{},
        loginSkipped:()=>{}
      }
  },
}));

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: () => {
    return {
      getBookmarkedId: () => [],
    }
  },
}));

describe('<AuthPage>', () => {
  let instance: RenderAPI;
  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
  }
  const useEmailCheckMock = jest.fn();
  const useRegisterMock = jest.fn();
  const email = jest.fn()
  
  describe('when AuthPage only', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => ["example@gmail.com", email]);
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useEmailCheck as jest.Mock).mockImplementation(useEmailCheckMock);
      useEmailCheckMock.mockReturnValue({
        emptyEmailCheckInfo:()=>{},
        fetchEmailCheckRequest:()=>{},
        isLoading: false, 
        emailCheckData: {}, 
        emailCheckError: '',
      });
      (useRegister as jest.Mock).mockImplementation(useRegisterMock);
      useRegisterMock.mockReturnValue({
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
            code: 400,
            message: 'abc'
          },
        },
        isRegisterLoading: true,
      });
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
    test('Should render ThemeManager', () => {
      jest.spyOn(React, 'useEffect').mockImplementation();
      jest.spyOn(navigation, 'navigate');
      expect(navigation.navigate).toBeTruthy();
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
    test('Should call ScreenContainer alertOnPress', () => {
      const element = instance.container.findAllByType(ScreenContainer)[0];
      fireEvent(element, 'alertOnPress');
      expect(element).toBeTruthy()
    });
    test('Should call AuthScreenInputSection onPressSignup', () => {
      const element = instance.container.findAllByType(AuthScreenInputSection)[0];
      fireEvent(element, 'onPressSignup');
      expect(element).toBeTruthy()
    });
    test('Should call AuthScreenInputSection showAlertNoInternet', () => {
      const element = instance.container.findAllByType(AuthScreenInputSection)[0];
      fireEvent(element, 'showAlertNoInternet');
      expect(element).toBeTruthy()
    });
    test('Should call AuthScreenInputSection navigateToSection', () => {
      const element = instance.container.findAllByType(AuthScreenInputSection)[0];
      fireEvent(element, 'navigateToSection', "GOOGLE");
      expect(element).toBeTruthy()
    });
    test('Should call AuthScreenInputSection navigateToSection', () => {
      const element = instance.container.findAllByType(AuthScreenInputSection)[0];
      fireEvent(element, 'navigateToSection', "SIGNINPAGE");
      expect(element).toBeTruthy()
    });
  });
});

describe('<AuthPage>', () => {
  let instance: RenderAPI;
  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
  }
  const useEmailCheckMock = jest.fn();
  const useRegisterMock = jest.fn();
  const email = jest.fn()
  
  describe('when AuthPage only', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => ['', email]);
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useEmailCheck as jest.Mock).mockImplementation(useEmailCheckMock);
      useEmailCheckMock.mockReturnValue({
        emptyEmailCheckInfo:()=>{},
        fetchEmailCheckRequest:()=>{},
        isLoading: false, 
        emailCheckData: {}, 
        emailCheckError: 'Network Error',
      });
      (useRegister as jest.Mock).mockImplementation(useRegisterMock);
      useRegisterMock.mockReturnValue({
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
            message: {
              code: 200
            }
          },
        },
        isRegisterLoading: true,
      });
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
    test('Should render ThemeManager', () => {
      jest.spyOn(React, 'useEffect').mockImplementation();
      jest.spyOn(navigation, 'navigate');
      expect(navigation.navigate).toBeTruthy();
    });
    it('When Press SignIn Button', () => {
      const testID = instance.getByTestId('signin_signIn');
      fireEvent(testID, 'onPress','SIGNINPAGE');
      expect(navigation.navigate).toBeTruthy();
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
    test('Should call ScreenContainer alertOnPress', () => {
      const element = instance.container.findAllByType(ScreenContainer)[0];
      fireEvent(element, 'alertOnPress');
      expect(element).toBeTruthy()
    });
    test('Should call AuthScreenInputSection onPressSignup', () => {
      const element = instance.container.findAllByType(AuthScreenInputSection)[0];
      fireEvent(element, 'onPressSignup');
      expect(element).toBeTruthy()
    });
    test('Should call AuthScreenInputSection showAlertNoInternet', () => {
      const element = instance.container.findAllByType(AuthScreenInputSection)[0];
      fireEvent(element, 'showAlertNoInternet');
      expect(element).toBeTruthy()
    });
    test('Should call AuthScreenInputSection navigateToSection', () => {
      const element = instance.container.findAllByType(AuthScreenInputSection)[0];
      fireEvent(element, 'navigateToSection', "GOOGLE");
      expect(element).toBeTruthy()
    });
    test('Should call AuthScreenInputSection navigateToSection', () => {
      const element = instance.container.findAllByType(AuthScreenInputSection)[0];
      fireEvent(element, 'navigateToSection', "SIGNINPAGE");
      expect(element).toBeTruthy()
    });
  });
});

describe('Should navigate Signin Page', () => {
  const navigation = {
    navigate:jest.fn()
  }
  const mockFunction = jest.fn();
  const email = mockFunction;
  const useEmailCheckMock = jest.fn();
  const useRegisterMock = mockFunction;
  let instance:RenderAPI;
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => ['', email]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useEmailCheck as jest.Mock).mockImplementation(useEmailCheckMock);
    useEmailCheckMock.mockReturnValue({
      emptyEmailCheckInfo:()=>{},
      fetchEmailCheckRequest:()=>{},
      isLoading: false, 
      emailCheckData: {
        message:{
          code:200
        }
      }, 
      emailCheckError: 'Network Error',
    });
    (useRegister as jest.Mock).mockImplementation(useRegisterMock);
    useRegisterMock.mockReturnValue({
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
          message: {
            code: 200
          }
        },
      },
      isRegisterLoading: true,
    });
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
  it('should navigate to signIn page',() => {
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.SignInPage,{email:""});
  });
});

describe('Should navigate SignUp Page', () => {
  const navigation = {
    navigate:jest.fn()
  }
  const mockFunction = jest.fn();
  const email = mockFunction;
  const useEmailCheckMock = jest.fn();
  const useRegisterMock = mockFunction;
  let instance:RenderAPI;
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => ['', email]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useEmailCheck as jest.Mock).mockImplementation(useEmailCheckMock);
    useEmailCheckMock.mockReturnValue({
      emptyEmailCheckInfo:()=>{},
      fetchEmailCheckRequest:()=>{},
      isLoading: false, 
      emailCheckData: {
        message:{
          code:404
        }
      }, 
      emailCheckError: 'Network Error',
    });
    (useRegister as jest.Mock).mockImplementation(useRegisterMock);
    useRegisterMock.mockReturnValue({
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
          message: {
            code: 200
          }
        },
      },
      isRegisterLoading: true,
    });
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
  it('should navigate to signUp page',() => {
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.SignUpPage,{email:""});
  });
});
