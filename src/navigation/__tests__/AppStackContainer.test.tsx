import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import AppStackContainer from 'src/navigation/AppStackContainer';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../constants/SampleData';

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

describe('<AppStackContainer>', () => {
  let instance: RenderAPI;

  describe('when AppStackContainer only', () => {
    beforeEach(() => {
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
  });
});
