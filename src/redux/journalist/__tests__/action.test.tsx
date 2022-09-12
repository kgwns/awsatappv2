import {
    GET_JOURNALIST_ARTICLE_INFO,
    GET_JOURNALIST_ARTICLE_SUCCESS,
    GET_JOURNALIST_ARTICLE_FAILED,
    EMPTY_JOURNALIST_ARTICLE,
    FETCH_JOURNALIST_DETAIL,
    FETCH_JOURNALIST_DETAIL_SUCCESS,
    FETCH_JOURNALIST_DETAIL_ERROR,
    EMPTY_JOURNALIST_DETAIL,
} from '../actionType';
import {
    getJournalistInfoDetail,
    getJournalistInfoDetailSuccess,
    getJournalistInfoDetailFailed,
    emptyJournalistArticle,
    fetchJournalistDetail,
    fetchJournalistDetailSuccess,
    fetchJournalistDetailFailed,
    emptyJournalistDetail,
} from '../action';

describe('<JournalistAction', () => {
    const page: number = 1
    const nid = '0'
    const tid = '1'
    const errorMessage = 'This is sample error'

    it('Check request journalist', () => {
        const result = getJournalistInfoDetail({ page, nid })
        expect(result.type).toEqual(GET_JOURNALIST_ARTICLE_INFO)
        expect(result.payload.page).toEqual(page)
        expect(result.payload.nid).toEqual(nid)
    })

    it('Check request journalist Detail success', () => {
        const result = getJournalistInfoDetailSuccess({ journalistData: [] })
        expect(result.type).toEqual(GET_JOURNALIST_ARTICLE_SUCCESS)
        expect(result.payload.journalistData).toEqual([])
    })

    it('Check request journalist Detail failed', () => {
        const result = getJournalistInfoDetailFailed({ error: errorMessage })
        expect(result.type).toEqual(GET_JOURNALIST_ARTICLE_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Check request emptySelectedTopicsInfo', () => {
        const request = emptyJournalistArticle()
        expect(request.type).toEqual(EMPTY_JOURNALIST_ARTICLE)
    })

    it('Check request journalist', () => {
        const result = fetchJournalistDetail({ tid })
        expect(result.type).toEqual(FETCH_JOURNALIST_DETAIL)
        expect(result.payload.tid).toEqual(tid)
    })

    it('Check request journalist Detail success', () => {
        const result = fetchJournalistDetailSuccess({ journalistDetail: [] })
        expect(result.type).toEqual(FETCH_JOURNALIST_DETAIL_SUCCESS)
        expect(result.payload.journalistDetail).toEqual([])
    })

    it('Check request journalist Detail failed', () => {
        const result = fetchJournalistDetailFailed({ error: errorMessage })
        expect(result.type).toEqual(FETCH_JOURNALIST_DETAIL_ERROR)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Check request emptySendTopicsInfo', () => {
        const request = emptyJournalistDetail()
        expect(request.type).toEqual(EMPTY_JOURNALIST_DETAIL)
    })

})
