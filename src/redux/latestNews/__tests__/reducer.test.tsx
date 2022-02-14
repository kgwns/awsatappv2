import { LatestArticleBodyGet, LatestNewsTabState } from '../types'
import { REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_FAILED, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_TICKER_HERO_DATA_SUCCESS } from '../actionType'
import latestNewsReducer from '../reducer'

describe('LatestNewsTab Reducer', () => {
    const payload: LatestArticleBodyGet = {
        items_per_page: 10,
        page: 0,
        offset: 0
    }
    const errorMessage = 'This is sample error'

    const data = {
        isLoading: true,
        error: '',
        ticker: [],
        hero: [],
        heroList: [],
        topList: [],
        sectionComboOne: [],
        sectionComboTwo: [],
        sectionComboThree: [],
        sectionComboFour: []
    }

    let initialState: LatestNewsTabState;
    beforeEach(() => {
        initialState = data
    })

    test('Check loading state when request API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_TICKER_HERO_DATA,
            payload: payload
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_TICKER_HERO_DATA_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_TICKER_HERO_DATA_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request hero list and top list API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_HERO_AND_TOP_LIST_DATA,
            payload: payload
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details hero list and top list API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_HERO_AND_TOP_LIST_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details hero list and top list API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_HERO_AND_TOP_LIST_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })
})