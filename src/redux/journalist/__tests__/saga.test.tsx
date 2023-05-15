import { testSaga } from 'redux-saga-test-plan';
import { all, takeLatest } from "redux-saga/effects";
import { FETCH_JOURNALIST_DETAIL, GET_JOURNALIST_ARTICLE_INFO } from '../actionType';
import journalistSaga, { getJournalistArticleInfo, fetchJournalistDetails } from "../sagas";

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' }
}

describe('<JournalistSaga >', () => {
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        })
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

        it('check fetchJournalist failed', () => {
            const genObject = fetchJournalistDetails({
                type: FETCH_JOURNALIST_DETAIL,
                payload: {
                    tid: '1'
                }
            })
            genObject.next()
            genObject.throw({})
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
        it('check getJournalistArticleInfo failed', () => {
            const genObject = getJournalistArticleInfo({
                type: GET_JOURNALIST_ARTICLE_INFO,
                payload: {
                    page: 0,
                    nid: '1'
                }
            })
            genObject.next()
            genObject.throw({})
        })
    })

    describe('Check journalistSaga sage method', () => {
        const genObject = journalistSaga();
        it('should test all journalistSaga', () => {
            const generator = genObject.next();
            expect(generator.value).toEqual(
                all([
                    takeLatest(GET_JOURNALIST_ARTICLE_INFO, getJournalistArticleInfo),
                    takeLatest(FETCH_JOURNALIST_DETAIL, fetchJournalistDetails)
                ])
            );
        });
        it('should be done on next iteration', () => {
            expect(genObject.next().done).toBeTruthy();
        });
    })
})

describe('Test journalistSaga  saga', () => {
    it('fire on journalistSaga', () => {
      testSaga(journalistSaga)
        .next()
        .all([
          takeLatest(GET_JOURNALIST_ARTICLE_INFO, getJournalistArticleInfo),
          takeLatest(FETCH_JOURNALIST_DETAIL, fetchJournalistDetails)
        ])
        .finish()
        .isDone();
    });
  });
  