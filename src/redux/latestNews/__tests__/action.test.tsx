import { LatestArticleBodyGet } from '../types'
import { REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_FAILED, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_TICKER_HERO_DATA_SUCCESS } from '../actionType'
import { requestHeroListTopList, requestHeroListTopListFailed, requestHeroListTopListSuccess, requestTickerAndHero, requestTickerAndHeroFailed, requestTickerAndHeroSuccess } from '../action'

describe('LatestNewsTab Action', () => {
    const payload: LatestArticleBodyGet = {
        items_per_page: 10,
        page: 0,
        offset: 0
    }

    test('Check request ticker and hero data type', () => {
        const request = requestTickerAndHero(payload)
        expect(request).toEqual({
            type: REQUEST_TICKER_HERO_DATA,
            payload
        })
    })

    test('Check request ticker and hero data success type', () => {
        const request = requestTickerAndHeroSuccess({
            ticker: [], hero: []
        })
        expect(request.type).toEqual(REQUEST_TICKER_HERO_DATA_SUCCESS)
    })

    test('Check request ticker and hero data failed type', () => {
        const request = requestTickerAndHeroFailed({
            error: ''
        })
        expect(request.type).toEqual(REQUEST_TICKER_HERO_DATA_FAILED)
    })

    test('Check hero list and top list request API', () => {
        const request = requestHeroListTopList(payload)
        expect(request.type).toEqual(REQUEST_HERO_AND_TOP_LIST_DATA)
    })

    test('Check hero list and top list request API success', () => {
        const request = requestHeroListTopListSuccess({heroList: [],topList: []})
        expect(request.type).toEqual(REQUEST_HERO_AND_TOP_LIST_SUCCESS)
    })

    test('Check hero list and top list request API failed', () => {
        const request = requestHeroListTopListFailed({error: ''})
        expect(request.type).toEqual(REQUEST_HERO_AND_TOP_LIST_FAILED)
    })
})