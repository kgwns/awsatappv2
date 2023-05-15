import {render, RenderAPI} from '@testing-library/react-native';
import React, { useState } from 'react';
import SplashNavigation from '../SplashNavigation';
import {useDispatch, useSelector} from 'react-redux';
import * as serviceApi from 'src/services/api';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockImplementation(() => [false,jest.fn()]),
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
      storeBaseUrlConfigInfo: jest.fn(),
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

jest.mock("src/hooks/useFetchPodcastData", () => ({
  useFetchPodcastData: () => {
    return {
      podcastData: {
        content_title: '',
        content_duration: '',
        content_type: ''
      }
    }
  },
}));

describe('<SplashNavigation>', () => {
  let instance: RenderAPI;
  const dispatchMock = jest.fn();
  const theme = true;
  const useColorScheme = jest.fn().mockReturnValueOnce(theme);
  const setLoading = jest.fn()

  describe('when SplashNavigation only', () => {
    beforeEach(() => {
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
      jest.spyOn(serviceApi,'getCacheApiRequest').mockReturnValue({
        base_url: 'https://aawsat.srpcdigital.com/',
        ums_base_url:  "https://awsatapi.srpcdigital.com/",
        image_url: 'https://static.srpcdigital.com/',
        profile_image_url: "https://awsatapi.srpcdigital.com/storage/",
        live_blog_url: "https://aawsat.srpcdigital.com/livenews/",
      });
      (useState as jest.Mock).mockImplementation(() => [false,setLoading]);
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
    it('Should call setTimeout',async () => {
      const spyon = jest.spyOn(global,'setTimeout');
      expect(spyon).toHaveBeenCalled();
      jest.runAllTimers();
      expect(setLoading).toHaveBeenCalled();
    });
  });
});

describe("SplashNavigation",() => {
  let instance: RenderAPI;
  const dispatchMock = jest.fn();
  const theme = true;
  const useColorScheme = jest.fn().mockReturnValueOnce(theme);
  const setLoading = jest.fn()
  let spyon:any;
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    spyon = jest.spyOn(console,'log');
    jest.spyOn(serviceApi,'getCacheApiRequest').mockImplementation(() => {throw new Error('error message')});
    (useState as jest.Mock).mockImplementation(() => [false,setLoading]);
    (useSelector as jest.Mock).mockImplementationOnce(useColorScheme);
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);
    const component = <SplashNavigation />
    instance = render(component);
  });
  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });
  it('Should throw error', async() => {
    try{
      await serviceApi.getCacheApiRequest('');
    }
    catch(error){
      expect(spyon).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith("getBaseURL - Error",error)

    }
  });
});

describe('when SplashNavigation only', () => {
  let instance: RenderAPI;
  const dispatchMock = jest.fn();
  const theme = true;
  const useColorScheme = jest.fn().mockReturnValueOnce(theme);
  const setLoading = jest.fn()
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    jest.spyOn(serviceApi,'getCacheApiRequest').mockReturnValue({
      base_url: '',
      ums_base_url:  '',
      image_url: '',
      profile_image_url: '',
      live_blog_url: '',
    });
    (useState as jest.Mock).mockImplementation(() => [false,setLoading]);
    (useSelector as jest.Mock).mockImplementationOnce(useColorScheme);
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);
    const component = <SplashNavigation />
    instance = render(component);
  });
  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });
  it('Should call getCacheApiRequest with empty response url', () => {
    expect(serviceApi.getCacheApiRequest).toHaveBeenCalled();
  });
});
