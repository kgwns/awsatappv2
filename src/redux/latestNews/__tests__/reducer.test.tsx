import { LatestArticleBodyGet, LatestNewsTabState, RequestSectionComboBodyGet,ArchivedArticleDataType, HomePageArticleType } from '../types'
import { REQUEST_COVERAGE_BLOCK, REQUEST_COVERAGE_BLOCK_FAILED, REQUEST_COVERAGE_BLOCK_SUCCESS, REQUEST_EDITORS_CHOICE_DATA, REQUEST_EDITORS_CHOICE_DATA_FAILED, REQUEST_EDITORS_CHOICE_DATA_SUCCESS, REQUEST_FEATURED_ARTICLE_BLOCK, REQUEST_FEATURED_ARTICLE_BLOCK_FAILED, REQUEST_FEATURED_ARTICLE_BLOCK_SUCCESS, REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_FAILED, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_HORIZONTAL_ARTICLE_BLOCK, REQUEST_HORIZONTAL_ARTICLE_FAILED, REQUEST_HORIZONTAL_ARTICLE_SUCCESS, REQUEST_OPINION_DATA_LIST_FAILED, REQUEST_OPINION_DATA_SUCCESS, REQUEST_OPINION_LIST_DATA, REQUEST_PODCAST_HOME_DATA, REQUEST_PODCAST_HOME_DATA_FAILED, REQUEST_PODCAST_HOME_DATA_SUCCESS, REQUEST_SECTION_COMBO_FIVE, REQUEST_SECTION_COMBO_FIVE_FAILED, REQUEST_SECTION_COMBO_FIVE_SUCCESS, REQUEST_SECTION_COMBO_FOUR, REQUEST_SECTION_COMBO_FOUR_FAILED, REQUEST_SECTION_COMBO_FOUR_SUCCESS, REQUEST_SECTION_COMBO_ONE, REQUEST_SECTION_COMBO_ONE_FAILED, REQUEST_SECTION_COMBO_ONE_SUCCESS, REQUEST_SECTION_COMBO_SEVEN, REQUEST_SECTION_COMBO_SEVEN_FAILED, REQUEST_SECTION_COMBO_SEVEN_SUCCESS, REQUEST_SECTION_COMBO_SIX, REQUEST_SECTION_COMBO_SIX_FAILED, REQUEST_SECTION_COMBO_SIX_SUCCESS, REQUEST_SECTION_COMBO_THREE, REQUEST_SECTION_COMBO_THREE_FAILED, REQUEST_SECTION_COMBO_THREE_SUCCESS, REQUEST_SECTION_COMBO_TWO, REQUEST_SECTION_COMBO_TWO_FAILED, REQUEST_SECTION_COMBO_TWO_SUCCESS, REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA, REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_SUCCESS, REQUEST_SPOTLIGHT_COMBO, REQUEST_SPOTLIGHT_COMBO_FAILED, REQUEST_SPOTLIGHT_COMBO_SUCCESS, REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_TICKER_HERO_DATA_SUCCESS,REQUEST_ARCHIVED_ARTICLE_DATA, REQUEST_ARCHIVED_ARTICLE_DATA_SUCCESS, REQUEST_ARCHIVED_ARTICLE_DATA_FAILED, REQUEST_INFO_GRAPHIC_BLOCK, REQUEST_INFO_GRAPHIC_BLOCK_SUCCESS, REQUEST_INFO_GRAPHIC_BLOCK_FAILED, REQUEST_SECTION_COMBO_EIGHT, REQUEST_SECTION_COMBO_EIGHT_SUCCESS, REQUEST_SECTION_COMBO_EIGHT_FAILED } from '../actionType'
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
        sectionComboFour: [],
        sectionComboFive: [],
        sectionComboSix: [],
        sectionComboSeven: [],
        podcastHome: [],
        coverageInfo: [],
        featuredArticle: [],
        horizontalArticle: [],
        editorsChoice: [],
        spotlight: [],
        spotlightArticleSection: [],
        coverageInfoLoaded: false,
        featuredArticleLoaded: false,
        horizontalArticleLoaded: false,
        opinionLoaded: false,
        podcastHomeLoaded: false,
        editorChoiceLoaded: false,
        sectionComboOneLoaded: false,
        sectionComboTwoLoaded: false,
        sectionComboThreeLoaded: false,
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

    test('Check loading state when request sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_FIVE,
            payload: sectionComboPayload
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_FIVE_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_FIVE_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_SIX,
            payload: sectionComboPayload
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_SIX_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_SIX_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_SEVEN,
            payload: sectionComboPayload
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_SEVEN_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_SEVEN_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_PODCAST_HOME_DATA,
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_PODCAST_HOME_DATA_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_PODCAST_HOME_DATA_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_COVERAGE_BLOCK,
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_COVERAGE_BLOCK_SUCCESS,
            payload: { ...data }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_COVERAGE_BLOCK_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('Check loading state when request sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_FEATURED_ARTICLE_BLOCK,
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_FEATURED_ARTICLE_BLOCK_SUCCESS,
            payload: { featureArticle: []}
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_FEATURED_ARTICLE_BLOCK_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('Check loading state when request sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_HORIZONTAL_ARTICLE_BLOCK,
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_HORIZONTAL_ARTICLE_SUCCESS,
            payload: { horizontalArticle: []}
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_HORIZONTAL_ARTICLE_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('Check loading state when request sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SPOTLIGHT_COMBO,
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SPOTLIGHT_COMBO_SUCCESS,
            payload: { spotlight: []}
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SPOTLIGHT_COMBO_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA,
            payload: { id: 1,
                page: 1,
                items_per_page:10,}
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of article details sectionComboFour API', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_SUCCESS,
            payload: { spotlightArticleSectionData: [],
                pager: {}}
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_EDITORS_CHOICE_DATA', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_EDITORS_CHOICE_DATA,
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('REQUEST_EDITORS_CHOICE_DATA_SUCCESS', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_EDITORS_CHOICE_DATA_SUCCESS,
            payload: {
                editorsChoice: []
            }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_EDITORS_CHOICE_DATA_FAILED', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_EDITORS_CHOICE_DATA_FAILED,
            payload: { error: '' }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_SPOTLIGHT_COMBO_FAILED', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SPOTLIGHT_COMBO_FAILED,
            payload: { error: '' }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_SPOTLIGHT_COMBO_FAILED', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SPOTLIGHT_COMBO_FAILED,
            payload: { error: '' }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_SECTION_COMBO_EIGHT', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_EIGHT,
            payload: sectionComboPayload
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('REQUEST_SECTION_COMBO_EIGHT_SUCCESS', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_EIGHT_SUCCESS,
            payload: {
                sectionComboEight:[]
            }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_SECTION_COMBO_EIGHT_FAILED', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_EIGHT_FAILED,
            payload: { error: '' }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_SECTION_COMBO_SIX_SUCCESS', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_SIX_SUCCESS,
            payload: {
                sectionComboSix:[]
            }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_SECTION_COMBO_SIX_FAILED', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_SECTION_COMBO_SIX_FAILED,
            payload: { error: '' }       
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_ARCHIVED_ARTICLE_DATA', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_ARCHIVED_ARTICLE_DATA,     
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('REQUEST_ARCHIVED_ARTICLE_DATA_SUCCESS', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_ARCHIVED_ARTICLE_DATA_SUCCESS,
            payload: {
                archivedArticleSection: []
            }        
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_ARCHIVED_ARTICLE_DATA_FAILED', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_ARCHIVED_ARTICLE_DATA_FAILED,
            payload: { error: '' }       
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_INFO_GRAPHIC_BLOCK', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_INFO_GRAPHIC_BLOCK,
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('REQUEST_INFO_GRAPHIC_BLOCK_SUCCESS', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_INFO_GRAPHIC_BLOCK_SUCCESS,
            payload:{
                infoGraphicBlockInfo:[]
            }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('REQUEST_INFO_GRAPHIC_BLOCK_FAILED', () => {
        const nextState = latestNewsReducer(initialState, {
            type: REQUEST_INFO_GRAPHIC_BLOCK_FAILED,
            payload: { error: '' }       
        })
        expect(nextState.isLoading).toBe(true)
    })
})