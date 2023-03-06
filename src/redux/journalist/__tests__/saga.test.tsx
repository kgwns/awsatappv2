import {takeLatest} from 'redux-saga/effects';
import { FETCH_JOURNALIST_DETAIL, GET_JOURNALIST_ARTICLE_INFO } from '../actionType';
import journalistSaga, { getJournalistArticleInfo, fetchJournalistDetails } from "../sagas";

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' }
}

describe('<JournalistSaga >', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    describe('Related fetchJournalist', () => {
        it('check fetchJournalist success', () => {
            const genObject = fetchJournalistDetails({
                type: FETCH_JOURNALIST_DETAIL,
                payload: {
                    tid: '1'
                }
            })
            genObject.next()
            genObject.next()
        })

        it('check fetchJournalist failed', () => {
            const genObject = fetchJournalistDetails({
                type: FETCH_JOURNALIST_DETAIL,
                payload: {
                    tid: '1'
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })
    })

    describe('Related getJournalistArticleInfo', () => {
        it('check getJournalistArticleInfo success', () => {
            const genObject = getJournalistArticleInfo({
                type: GET_JOURNALIST_ARTICLE_INFO,
                payload: {
                    page: 0,
                    nid: '1'
                }
            })
            genObject.next()
            genObject.next()
        })


        it('check getJournalistArticleInfo failed', () => {
            const genObject = getJournalistArticleInfo({
                type: GET_JOURNALIST_ARTICLE_INFO,
                payload: {
                    page: 0,
                    nid: '1'
                }
            })
            genObject.next()
            genObject.throw(errorResponse)
        })
    })
})
