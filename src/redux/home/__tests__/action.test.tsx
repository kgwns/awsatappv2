import {
    REQUEST_HOME,
    REQUEST_HOME_SUCCESS,
    REQUEST_HOME_ERROR,
  } from '../actionType';
import {requestHomeFailed, requestHomeSuccess, requestHome} from '../action';

describe('<HomeAction', () => {
    const page: number = 1
    const errorMessage = 'This is sample error'

    it('Check request home', () => {
        const result = requestHome({page})
        expect(result.type).toEqual(REQUEST_HOME)
        expect(result.payload.page).toEqual(page)
    })

    it('Check request home Detail success', () => {
        const result = requestHomeSuccess({homeData: []})
        expect(result.type).toEqual(REQUEST_HOME_SUCCESS)
        expect(result.payload.homeData).toEqual([])
    })

    it('Check request home Detail failed', () => {
        const result = requestHomeFailed({error: errorMessage})
        expect(result.type).toEqual(REQUEST_HOME_ERROR)
        expect(result.payload.error).toEqual(errorMessage)
    })

})