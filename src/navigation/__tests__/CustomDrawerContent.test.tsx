import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/SampleData';
import CustomDrawerContent, { SocialMediaType }  from '../CustomDrawerContent';
import {ButtonImage, ButtonList} from 'src/components/atoms';
import { ScreensConstants } from 'src/constants';

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
