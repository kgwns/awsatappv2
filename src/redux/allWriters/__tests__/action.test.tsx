import { AllWritersBodyGet } from 'src/redux/allWriters/types';
import {
    FETCH_ALL_WRITERS,
    FETCH_ALL_WRITERS_SUCCESS,
    FETCH_ALL_WRITERS_ERROR,
} from 'src/redux/allWriters/actionTypes';
import { fetchAllWritersFailed, fetchAllWritersSuccess, fetchAllWriters } from 'src/redux/allWriters/action';

describe('AllWriters Action', () => {
    const payload: AllWritersBodyGet = {
        items_per_page: 10,
    }

    test('Check request all writers data type', () => {
        const request = fetchAllWriters(payload)
        expect(request).toEqual({
            type: FETCH_ALL_WRITERS,
            payload
        })
    })

    test('Check request all writers data success type', () => {
        const request = fetchAllWritersSuccess({
            allWritersListData: []
        })
        expect(request.type).toEqual(FETCH_ALL_WRITERS_SUCCESS)
    })

    test('Check request all writers data failed type', () => {
        const request = fetchAllWritersFailed({
            error: ''
        })
        expect(request.type).toEqual(FETCH_ALL_WRITERS_ERROR)
    })
})