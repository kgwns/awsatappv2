import { WeatherDetail, WeatherDetailSuccess, WeatherDetailFailed, WeatherDetailVisibility, WeatherDetailVisibilitySuccess, WeatherDetailVisibilityFailed } from '../action';
import { GET_WEATHER_DETAILS_FAILED, GET_WEATHER_DETAILS_REQUEST, GET_WEATHER_DETAILS_SUCCESS, GET_WEATHER_DETAILS_VISIBILITY_FAILED, GET_WEATHER_DETAILS_VISIBILITY_REQUEST, GET_WEATHER_DETAILS_VISIBILITY_SUCCESS } from '../actionType';

describe('<MostReadAction', () => {

    const errorMessage = 'This is sample error'
    const mockString = 'example';
    const mockNumber = 20;

    it('Fetch Fetch Weather Detail', () => {
        const result = WeatherDetail({
            lat: mockNumber,
            lon: mockNumber,
        })
        expect(result.type).toEqual(GET_WEATHER_DETAILS_REQUEST)
    })

    it('Fetch Weather Detail success', () => {
        const result = WeatherDetailSuccess({
            city: {
                id: mockNumber,
                name: mockString,
                country: mockString,
                timezone: mockNumber,
            },
            cod: mockString,
            cnt: mockNumber,
            list: [],
        })
        expect(result.type).toEqual(GET_WEATHER_DETAILS_SUCCESS)
    })

    it('Fetch Weather Detail failed', () => {
        const result = WeatherDetailFailed({error: errorMessage})
        expect(result.type).toEqual(GET_WEATHER_DETAILS_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Fetch Weather Detail Visibility', () => {
        const result = WeatherDetailVisibility({
            lat: mockNumber,
            lon: mockNumber,
        })
        expect(result.type).toEqual(GET_WEATHER_DETAILS_VISIBILITY_REQUEST)
    })

    it('Fetch Weather Detail Visibility success', () => {
        const result = WeatherDetailVisibilitySuccess({
            visibility: mockNumber
        })
        expect(result.type).toEqual(GET_WEATHER_DETAILS_VISIBILITY_SUCCESS)
    })

    it('Fetch Weather Detail Visibility failed', () => {
        const result = WeatherDetailVisibilityFailed({error: errorMessage})
        expect(result.type).toEqual(GET_WEATHER_DETAILS_VISIBILITY_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

})