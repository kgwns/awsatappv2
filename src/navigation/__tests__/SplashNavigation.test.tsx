import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import SplashNavigation from '../SplashNavigation';
import {useDispatch, useSelector} from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockString = 'example';
const mockNumber = 1234;

jest.mock("src/hooks/useWeatherDetails", () => ({
  useWeatherDetails: () => {
    return {
      isLoading: false,
      fetchWeatherDetailsSuccessInfo: {
          city: {
              id: mockNumber,
              name: mockString,
              country: mockString,
          },
          cod: mockString,
          cnt: 7,
          list: [
              {
                  dt: mockNumber,
                  sunrise: mockNumber,
                  sunset: mockNumber,
                  temp: {
                      day: mockNumber,
                      min: mockNumber,
                      max: mockNumber,
                      night: mockNumber,
                      eve: mockNumber,
                      morn: mockNumber
                  },
                  feels_like: {
                      day: mockNumber,
                      night: mockNumber,
                      eve: mockNumber,
                      morn: mockNumber
                  },
                  pressure: mockNumber,
                  humidity: mockNumber,
                  weather: [
                      {
                          id: mockNumber,
                          main: mockString,
                          description: mockString,
                          icon: mockString
                      }
                  ],
                  speed: mockNumber,
                  deg: mockNumber,
                  gust: mockNumber,
                  clouds: mockNumber,
                  pop: mockNumber
              }
          ]
      },
      fetchWeatherDetailsVisibilitySuccessInfo: {
        visibility: mockNumber,
      },
      fetchWeatherDetailsErrorInfo: '',
      fetchWeatherDetailsInfo: () => [],
      fetchWeatherDetailsVisibilityInfo: () => [],
    }
  },
}));

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: () => {
      return {
        isLoading: true,
        bookMarkSuccessInfo: {},
        error: '',
        getBookmarkedId: () => []
      }
  },
}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
      return {
        isLoggedIn: true,
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

jest.mock("src/hooks/useUserProfileData", () => ({
  useUserProfileData: () => {
    return {
      isLoading: false,
      userProfileData: {},
      fetchProfileDataRequest: () => [],
    }
  },
}));

jest.mock("src/hooks/useTopMenu", () => ({
  useTopMenu: () => {
    return {
      fetchTopMenuRequest: () => [],
    }
  },
}));

jest.mock("src/hooks/useSideMenu", () => ({
  useSideMenu: () => {
    return {
      fetchSideMenuRequest: () => [],
    }
  },
}));

jest.mock("src/hooks/useRegister", () => ({
  useRegister: () => {
      return {
        socialLoginEnded:()=>{},
        emptyUserInfo:()=>{}
      }
  },
}));

jest.mock("src/hooks/useAppCommon", () => ({
  useAppCommon: () => {
    return {
      theme: {},
      isFirstSession: true,
    }
  },
}));

jest.mock("src/hooks/useEmailCheck", () => ({
  useEmailCheck: () => {
      return {
        emptyEmailCheckInfo:()=>{}
      }
  },
}));

describe('<SplashNavigation>', () => {
  let instance: RenderAPI;
  const dispatchMock = jest.fn();
  const theme = true;
  const useColorScheme = jest.fn().mockReturnValueOnce(theme);

  describe('when SplashNavigation only', () => {
    beforeEach(() => {
      (useSelector as jest.Mock).mockImplementationOnce(useColorScheme);
      (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);
      const component = <SplashNavigation />
      instance = render(component);
    });
    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SplashNavigation', () => {
      expect(instance).toBeDefined();
    });
  });
});
