import {
    FETCH_MOST_READ,
    FETCH_MOST_READ_SUCCESS,
    FETCH_MOST_READ_ERROR,
  } from '../actionTypes';
import { fetchMostReadFailed, fetchMostReadSuccess, fetchMostRead } from '../action';

describe('<MostReadAction', () => {

    const errorMessage = 'This is sample error'

    it('Fetch Most Read', () => {
        const result = fetchMostRead()
        expect(result.type).toEqual(FETCH_MOST_READ)
    })

    it('Fetch Most Read success', () => {
        const result = fetchMostReadSuccess({mostReadData: []})
        expect(result.type).toEqual(FETCH_MOST_READ_SUCCESS)
        expect(result.payload.mostReadData).toEqual([])
    })

    it('Fetch Most Read failed', () => {
        const result = fetchMostReadFailed({error: errorMessage})
        expect(result.type).toEqual(FETCH_MOST_READ_ERROR)
        expect(result.payload.error).toEqual(errorMessage)
    })

})