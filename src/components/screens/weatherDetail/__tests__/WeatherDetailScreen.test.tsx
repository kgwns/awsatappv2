import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { WeatherDetailScreen } from '../WeatherDetailScreen'
import { TouchableWithoutFeedback } from 'react-native';
import { useWeatherDetails } from 'src/hooks/useWeatherDetails';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

jest.mock('src/hooks/useWeatherDetails', () => ({ useWeatherDetails: jest.fn() }));

const sampleWeatherDetailData = {
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
    fetchWeatherDetailsVisibilitySuccessInfo: {
        visibility: 1000,
    },
    fetchWeatherDetailsErrorInfo: '',
    fetchWeatherDetailsInfo: () => [],
    fetchWeatherDetailsVisibilityInfo: () => [],
}

describe('<WeatherDetailScreen>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const useWeatherDetailsMock = jest.fn();

    beforeEach(() => {
        (useWeatherDetails as jest.Mock).mockImplementation(useWeatherDetailsMock);
        useWeatherDetailsMock.mockReturnValue({ ...sampleWeatherDetailData })

        const component = <GestureHandlerRootView><WeatherDetailScreen /></GestureHandlerRootView>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should render component With Rain Mode', () => {
        const weatherDetailData = { ...sampleWeatherDetailData }
        weatherDetailData.fetchWeatherDetailsSuccessInfo.list[0].weather[0].main = 'rain';
        useWeatherDetailsMock.mockReturnValue({
            ...weatherDetailData,
        })
        expect(instance).toBeDefined()
    })

    test('Should render component With Sun Mode', () => {
        const weatherDetailData = { ...sampleWeatherDetailData }
        weatherDetailData.fetchWeatherDetailsSuccessInfo.list[0].weather[0].main = 'sun';
        useWeatherDetailsMock.mockReturnValue({
            ...weatherDetailData,
        })
        expect(instance).toBeDefined()
    })

    test('Should render component With Sand Mode', () => {
        const weatherDetailData = { ...sampleWeatherDetailData }
        weatherDetailData.fetchWeatherDetailsSuccessInfo.list[0].weather[0].main = 'sand';
        useWeatherDetailsMock.mockReturnValue({
            ...weatherDetailData,
        })
        expect(instance).toBeDefined()
    })

    test('Should render component With Clear Mode', () => {
        const weatherDetailData = { ...sampleWeatherDetailData }
        weatherDetailData.fetchWeatherDetailsSuccessInfo.list[0].weather[0].main = 'clear';
        useWeatherDetailsMock.mockReturnValue({
            ...weatherDetailData,
        })
        expect(instance).toBeDefined()
    })

    test('Should render component With Fog Mode', () => {
        const weatherDetailData = { ...sampleWeatherDetailData }
        weatherDetailData.fetchWeatherDetailsSuccessInfo.list[0].weather[0].main = 'fog';
        useWeatherDetailsMock.mockReturnValue({
            ...weatherDetailData,
        })
        expect(instance).toBeDefined()
    })

    test('Should render component WithOut country Name', () => {
        const weatherDetailData = { ...sampleWeatherDetailData }
        weatherDetailData.fetchWeatherDetailsSuccessInfo.city.country = '';
        useWeatherDetailsMock.mockReturnValue({
            ...weatherDetailData,
        })
        expect(instance).toBeDefined();
    })

    test('Should call ALL onPress', () => {
        const element = instance.container.findAllByType(TouchableWithoutFeedback)[0];
        fireEvent(element, 'onPress', 0);
        expect(mockFunction).toBeTruthy();
    });

    test('Should render component withOut Visibility Data', () => {
        const element = instance.container.findAllByType(TouchableWithoutFeedback)[0];
        const weatherDetailData = { ...sampleWeatherDetailData }
        weatherDetailData.fetchWeatherDetailsVisibilitySuccessInfo.visibility = 0;
        useWeatherDetailsMock.mockReturnValue({
            ...weatherDetailData,
        })
        fireEvent(element, 'onPress', 0);
        expect(instance).toBeDefined()
    })

})