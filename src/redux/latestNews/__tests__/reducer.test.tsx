import { LatestArticleBodyGet, LatestNewsTabState, RequestSectionComboBodyGet } from '../types'
import { REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_FAILED, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_OPINION_DATA_LIST_FAILED, REQUEST_OPINION_DATA_SUCCESS, REQUEST_OPINION_LIST_DATA, REQUEST_SECTION_COMBO_FOUR, REQUEST_SECTION_COMBO_FOUR_FAILED, REQUEST_SECTION_COMBO_FOUR_SUCCESS, REQUEST_SECTION_COMBO_ONE, REQUEST_SECTION_COMBO_ONE_FAILED, REQUEST_SECTION_COMBO_ONE_SUCCESS, REQUEST_SECTION_COMBO_THREE, REQUEST_SECTION_COMBO_THREE_FAILED, REQUEST_SECTION_COMBO_THREE_SUCCESS, REQUEST_SECTION_COMBO_TWO, REQUEST_SECTION_COMBO_TWO_FAILED, REQUEST_SECTION_COMBO_TWO_SUCCESS, REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_TICKER_HERO_DATA_SUCCESS } from '../actionType'
import latestNewsReducer from '../reducer'

describe('LatestNewsTab Reducer', () => {
    const payload: LatestArticleBodyGet = {
        items_per_page: 10,
        page: 0,
        offset: 0
    }

    const sectionComboPayload:RequestSectionComboBodyGet = {
       id: 726,
       items_per_page: 10,
       page: 0
    }

    const errorMessage = 'This is sample error'

    const data = {
        isLoading: true,
        error: '',
        ticker: [],
        hero: [],
        heroList: [],
        topList: [],
        opinionList: [],
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

    test('Check loading state when request opinionList API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_OPINION_LIST_DATA,
            payload: payload
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details opinionList API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_OPINION_DATA_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details opinionList API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_OPINION_DATA_LIST_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })


    test('Check loading state when request sectionComboOne API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_ONE,
            payload: sectionComboPayload
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboOne API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_ONE_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboOne API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_ONE_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })



    test('Check loading state when request sectionComboTwo API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_TWO,
            payload: sectionComboPayload
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboTwo API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_TWO_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboTwo API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_TWO_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })



    test('Check loading state when request sectionComboThree API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_THREE,
            payload: sectionComboPayload
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboThree API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_THREE_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboThree API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_THREE_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })



    test('Check loading state when request sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_FOUR,
            payload: sectionComboPayload
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_FOUR_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_FOUR_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })
})