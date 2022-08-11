import React from 'react'
import {render, RenderAPI } from '@testing-library/react-native'
import { WeatherDetailScreen } from '../WeatherDetailScreen'

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

describe('<WeatherDetailScreen>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <WeatherDetailScreen />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })  
})