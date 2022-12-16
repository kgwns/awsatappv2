import {
    EMPTY_OPINION_DATA,
    EMPTY_WRITER_OPINION_DATA,
    FETCH_OPINIONS,
    FETCH_OPINIONS_ERROR,
    FETCH_OPINIONS_SUCCESS,
    FETCH_WRITER_OPINIONS,
    STORE_HOME_OPINION_NID,
  } from '../actionTypes';
  import {fetchOpinionsFailed, fetchOpinionsSuccess, fetchOpinions, emptyOpinionsAction, storeHomeOpinionNid, fetchWriterOpinions, emptyWriterOpinionAction} from '../action';
describe('<OpinionsAction', () => {

    const errorMessage = 'This is sample error'

    it('Fetch Opinions', () => {
        const result = fetchOpinions({page: 2,
            nid: '2'})
        expect(result.type).toEqual(FETCH_OPINIONS)
        expect(result.payload.page).toEqual(2)
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

    it('emptyOpinionsAction', () => {
        const result = emptyOpinionsAction()
        expect(result.type).toEqual(EMPTY_OPINION_DATA)
    })

    it('storeHomeOpinionNid', () => {
        const result = storeHomeOpinionNid({nid: '2'})
        expect(result.type).toEqual(STORE_HOME_OPINION_NID)
    })

    it('fetc writer Opinions', () => {
        const result = fetchWriterOpinions({ tid: '',
            page: 2})
        expect(result.type).toEqual(FETCH_WRITER_OPINIONS)
    })

    it('empty Writer Opinion', () => {
        const result = emptyWriterOpinionAction()
        expect(result.type).toEqual(EMPTY_WRITER_OPINION_DATA)
    })
})