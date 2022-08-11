import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import SplashNavigation from '../SplashNavigation';
import {useDispatch, useSelector} from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("src/hooks/useWeatherDetails", () => ({
  useWeatherDetails: () => {
    return {
      isLoading: false,
      fetchWeatherDetailsSuccessInfo: {
          city: {
              id: 12,
              name: "string",
              country: "string",
          },
          cod: "string",
          cnt: 7,
          list: [
              {
                  dt: 1660199400,
                  sunrise: 1660178215,
                  sunset: 1660223580,
                  temp: {
                      day: 24,
                      min: 18.44,
                      max: 26.51,
                      night: 20.55,
                      eve: 24.95,
                      morn: 18.66
                  },
                  feels_like: {
                      day: 24.1,
                      night: 20.8,
                      eve: 25.2,
                      morn: 18.96
                  },
                  pressure: 1010,
                  humidity: 63,
                  weather: [
                      {
                          id: 803,
                          main: "Clouds",
                          description: "غيوم متناثرة",
                          icon: "04d"
                      }
                  ],
                  speed: 10.04,
                  deg: 269,
                  gust: 15.21,
                  clouds: 52,
                  pop: 0
              }
          ]
      },
      fetchWeatherDetailsErrorInfo: '',
      fetchWeatherDetailsInfo: () => [],
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
