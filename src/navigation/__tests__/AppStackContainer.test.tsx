import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import AppStackContainer from 'src/navigation/AppStackContainer';
import {Provider} from 'react-redux';
import { storeSampleData} from '../../constants/Constants';
import { NavigationContainer } from '@react-navigation/native';
import { useLogin } from 'src/hooks/useLogin';

const mockString = 'example';
const mockNumber = 1234;

jest.mock("src/hooks/useAppPlayer",() => {
  return {
    useAppPlayer: jest.fn().mockReturnValue({
      selectedTrack: 'track',
      showMiniPlayer: true,
      setShowMiniPlayer: () => {},
      setPlayerTrack: () => {}
    })
  }
});

jest.mock('src/hooks/useLogin',() => ({
  useLogin: jest.fn()
}))

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

describe('render AppStackContainer when the user logged in and the user is not a new user', () => {
    let instance: RenderAPI;
    (useLogin as jest.Mock).mockReturnValueOnce({isLoggedIn:true,loginData:{message:{newUser:0}}});
    beforeEach(() => {
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
      const component = (
          <Provider store={storeSampleData}>
            <AppStackContainer />
          </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render AppStackContainer', () => {
      expect(instance).toBeDefined();
    });
    it("test NavigationContainer onStateChange",() => {
      const element = instance.container.findByType(NavigationContainer);
      fireEvent(element,'onStateChange');
      expect(element).toBeTruthy();
    })
});
describe('render AppStackContainer when the user logged in and the user is new user', () => {
  let instance: RenderAPI;
  (useLogin as jest.Mock).mockReturnValue({isLoggedIn:true,loginData:{message:{newUser:1}}});
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    const component = (
        <Provider store={storeSampleData}>
          <AppStackContainer />
        </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });
  it('Should render AppStackContainer', () => {
    expect(instance).toBeDefined();
  });
  it("test NavigationContainer onStateChange",() => {
    const element = instance.container.findByType(NavigationContainer);
    fireEvent(element,'onStateChange');
    expect(element).toBeTruthy();
  })
});
