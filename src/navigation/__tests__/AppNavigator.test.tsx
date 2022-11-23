import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from 'src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../constants/Constants';

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

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([]),
}));

describe('<AppNavigator>', () => {
  let instance: RenderAPI;

  describe('when AppNavigator only', () => {
    beforeEach(() => {
      const component = (
        <NavigationContainer independent={true}>
          <Provider store={storeSampleData}>
            <AppNavigator />
          </Provider>
      </NavigationContainer>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    
    it('Should render AppNavigator', () => {
      expect(instance).toBeDefined();
    });

  });

});
