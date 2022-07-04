import { ArticleDetailState } from '../types'
import { EMPTY_DATA, REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS, REQUEST_ARTICLE_SECTION, REQUEST_ARTICLE_SECTION_FAILED, REQUEST_ARTICLE_SECTION_SUCCESS, REQUEST_RELATED_ARTICLE, REQUEST_RELATED_ARTICLE_FAILED, REQUEST_RELATED_ARTICLE_SUCCESS, REQUEST_RICH_ARTICLE_CONTENT_SUCCESS, REQUEST_RICH_ARTICLE_OPINION_SUCCESS, REQUEST_RICH_ARTICLE_READ_ALSO_SUCCESS } from '../actionType'
import articleDetailReducer from '../reducer'

describe('ArticleDetail Reducer', () => {
    const nid: number = 123
    const tid: number = 123456

    const errorMessage = 'This is sample error'

    let initialState: ArticleDetailState;
    beforeEach(() => {
        initialState = {
            isLoading: true,
            error: '',
            articleDetailData: [],
            pager: {},
            relatedArticleData: [],
            articleSectionData: [],
            articleSectionLoaded: true
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

    test('Check loading state when request Related Article API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RELATED_ARTICLE,
            payload: { tid: tid }
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of Related Article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RELATED_ARTICLE_SUCCESS,
            payload: { relatedArticleData: [] }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of Related Article details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RELATED_ARTICLE_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request Article section API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_SECTION,
            payload: {   id: 1,
                page: 1,
                items_per_page:10,
                current_nid: 1,}
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of Article section details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_SECTION_SUCCESS,
            payload: { articleSectionData: [],
                pager: {} }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of Related Article section API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_ARTICLE_SECTION_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Success of rich Article section details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RICH_ARTICLE_READ_ALSO_SUCCESS,
            payload: { nid: '2'}
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of rich Article section details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RICH_ARTICLE_CONTENT_SUCCESS,
            payload: { contentBundleData: []}
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of rich Article section details API', () => {
        const nextState = articleDetailReducer(initialState, {
            type: REQUEST_RICH_ARTICLE_OPINION_SUCCESS,
            payload: { opinionData: {}}
        })
        expect(nextState.isLoading).toBe(true)
    })
    
    test('On empty data', () => {
        const nextState = articleDetailReducer(initialState, {
            type: EMPTY_DATA,
        })
        expect(nextState.isLoading).toBe(false)
    })
})