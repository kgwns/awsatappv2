import { OpinionsBodyGet } from '../types';
import {
    FETCH_OPINIONS,
    FETCH_OPINIONS_ERROR,
    FETCH_OPINIONS_SUCCESS,
  } from '../actionTypes';
  import {fetchOpinionsFailed, fetchOpinionsSuccess, fetchOpinions} from '../action';
describe('<OpinionsAction', () => {

    const errorMessage = 'This is sample error'
    const page = 0
    const payload: OpinionsBodyGet = {
        page: 0
      }
    it('Fetch Opinions', () => {
        const result = fetchOpinions(payload)
        expect(result.type).toEqual(FETCH_OPINIONS)
        expect(result.payload.page).toEqual(page)
    })

    it('Fetch Opinions success', () => {
        const result = fetchOpinionsSuccess({opinionListData: []})
        expect(result.type).toEqual(FETCH_OPINIONS_SUCCESS)
        expect(result.payload.opinionListData).toEqual([])
    })

    it('Fetch Opinions failed', () => {
        const result = fetchOpinionsFailed({error: errorMessage})
        expect(result.type).toEqual(FETCH_OPINIONS_ERROR)
        expect(result.payload.error).toEqual(errorMessage)
    })

})