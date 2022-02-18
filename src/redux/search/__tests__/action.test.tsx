
import {
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_ERROR,
    FETCH_SEARCH_REQUEST,
} from '../actionTypes';
import { fetchSearchFailed, fetchSearchSuccess, fetchSearchRequest } from '../action';
import { FetchSearchRequestPayloadType } from '../types';

describe('<SearchAction', () => {

    const errorMessage = 'This is sample error'
    const payload: FetchSearchRequestPayloadType = {
        searchText: 'test'
    }
    it('Fetch Search Request', () => {
        const result = fetchSearchRequest(payload)
        expect(result.type).toEqual(FETCH_SEARCH_REQUEST)
        expect(result.payload.searchText).toEqual('test')
    })

    it('Fetch Search Request success', () => {
        const result = fetchSearchSuccess({ searchData: [] })
        expect(result.type).toEqual(FETCH_SEARCH_SUCCESS)
        expect(result.payload.searchData).toEqual([])
    })

    it('Fetch Search Request failed', () => {
        const result = fetchSearchFailed({ error: errorMessage })
        expect(result.type).toEqual(FETCH_SEARCH_ERROR)
        expect(result.payload.error).toEqual(errorMessage)
    })

})