import { ArticleDetailState } from '../types'
import { REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS } from '../actionType'
import articleDetailReducer from '../reducer'

describe('ArticleDetail Reducer', () => {
    const nid: number = 123
    const errorMessage = 'This is sample error'

    let initialState: ArticleDetailState;
    beforeEach(() => {
        initialState = {
            isLoading: true,
            error: '',
            articleDetailData: [],
            pager: {}
        }
    })

    test('Check loading state when request API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_DETAIL,
            payload: { nid: nid }
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_DETAIL_SUCCESS,
            payload: { articleDetailData: [], pager: {} }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_DETAIL_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })
})