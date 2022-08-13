import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/SampleData';
import CustomDrawerContent, { SocialMediaType }  from '../CustomDrawerContent';
import {ButtonImage, ButtonList} from 'src/components/atoms';
import { ScreensConstants } from 'src/constants';

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

describe('<CustomDrawerContent>', () => {
    let instance: RenderAPI;
    const mockFunction =jest.fn();

    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <CustomDrawerContent />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[0]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'advertiseWithUs', id: 49 }});
        expect(mockFunction).toBeTruthy();
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[1]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'aboutTheEast', id: 153 }});
        expect(mockFunction).toBeTruthy();
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[2]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'about_the_news_paper', id: 56 }});
        expect(mockFunction).toBeTruthy();
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[3]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'termsOfUse', id: 57 }});
        expect(mockFunction).toBeTruthy();
    })

})
