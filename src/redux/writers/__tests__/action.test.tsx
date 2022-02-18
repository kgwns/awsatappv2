import {
    FETCH_OPINION_WRITER,
    FETCH_OPINION_WRITER_SUCCESS,
    FETCH_OPINION_WRITER_ERROR,
} from 'src/redux/writers/actionTypes';
import { fetchOpinionWriterFailed, fetchOpinionWriterSuccess, fetchOpinionWriter } from '../action';
import { WritersBodyGet } from '../types';

describe('<WritersAction', () => {

    const errorMessage = 'This is sample error'
    const payload: WritersBodyGet = {
        items_per_page: 0
    }
    it('Opinion Writer', () => {
        const result = fetchOpinionWriter(payload)
        expect(result.type).toEqual(FETCH_OPINION_WRITER)
        expect(result.payload.items_per_page).toEqual(0)
    })

    it('Opinion Writer success', () => {
        const result = fetchOpinionWriterSuccess({ opinionWriterListData: [] })
        expect(result.type).toEqual(FETCH_OPINION_WRITER_SUCCESS)
        expect(result.payload.opinionWriterListData).toEqual([])
    })

    it('Opinion Writer failed', () => {
        const result = fetchOpinionWriterFailed({ error: errorMessage })
        expect(result.type).toEqual(FETCH_OPINION_WRITER_ERROR)
        expect(result.payload.error).toEqual(errorMessage)
    })

})