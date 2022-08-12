import { WeatherDetail, WeatherDetailSuccess, WeatherDetailFailed } from '../action';
import { GET_WEATHER_DETAILS_FAILED, GET_WEATHER_DETAILS_REQUEST, GET_WEATHER_DETAILS_SUCCESS } from '../actionType';

describe('<MostReadAction', () => {

    const errorMessage = 'This is sample error'

    it('Fetch Most Read', () => {
        const result = WeatherDetail({
            lat: 12.00,
            lon: 17.00,
        })
        expect(result.type).toEqual(GET_WEATHER_DETAILS_REQUEST)
    })

    it('Fetch Most Read success', () => {
        const result = WeatherDetailSuccess({
            city: {
                id: 12,
                name: 'string',
                country: 'string',
                timezone: 12,
            },
            cod: 'string',
            cnt: 7,
            list: [],
        })
        expect(result.type).toEqual(GET_WEATHER_DETAILS_SUCCESS)
    })

    it('Fetch Most Read failed', () => {
        const result = WeatherDetailFailed({error: errorMessage})
        expect(result.type).toEqual(GET_WEATHER_DETAILS_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

})