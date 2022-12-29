import { REQUEST_STATIC_DETAIL, REQUEST_STATIC_DETAIL_FAILED, REQUEST_STATIC_DETAIL_SUCCESS } from '../actionType'
import termsAndAboutUsReducer from '../reducer'
import { StaticDetailState } from '../types'

describe('ArticleDetail Reducer', () => {
    const id: number = 123

    const errorMessage = 'This is sample error'

    let initialState: StaticDetailState;
    beforeEach(() => {
        initialState = {
            isLoading: true,
            data: [],
            error: ''
        }
    })

    test('Check loading state when request API', () => {
        const nextState = termsAndAboutUsReducer(initialState, {
            type: REQUEST_STATIC_DETAIL,
            payload: { id }
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of static detail API', () => {
        const nextState = termsAndAboutUsReducer(initialState, {
            type: REQUEST_STATIC_DETAIL_SUCCESS,
            payload: { data: [] }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of static detail API', () => {
        const nextState = termsAndAboutUsReducer(initialState, {
            type: REQUEST_STATIC_DETAIL_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Default State', () => {
        const nextState = termsAndAboutUsReducer(
          initialState, { type:'' }
        )
        expect(nextState.isLoading).toBeTruthy()
      })
})