import { LatestArticleBodyGet, RequestSectionComboBodyGet } from '../types'
import { REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_SUCCESS, 
    REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_HERO_AND_TOP_LIST_DATA, 
    REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_HERO_AND_TOP_LIST_FAILED, 
    REQUEST_SECTION_COMBO_ONE, REQUEST_SECTION_COMBO_ONE_FAILED, 
    REQUEST_SECTION_COMBO_ONE_SUCCESS, REQUEST_SECTION_COMBO_FOUR_FAILED, 
    REQUEST_SECTION_COMBO_FOUR, REQUEST_SECTION_COMBO_THREE_FAILED, 
    REQUEST_SECTION_COMBO_THREE_SUCCESS, REQUEST_SECTION_COMBO_THREE, 
    REQUEST_SECTION_COMBO_TWO_FAILED, REQUEST_SECTION_COMBO_TWO_SUCCESS, 
    REQUEST_SECTION_COMBO_TWO, REQUEST_SECTION_COMBO_FOUR_SUCCESS,
    REQUEST_OPINION_DATA_SUCCESS, REQUEST_OPINION_LIST_DATA, REQUEST_OPINION_DATA_LIST_FAILED 
  } from "../actionType"
  import {
    requestHeroListTopListFailed, requestHeroListTopListSuccess, requestHeroListTopList,
    requestSectionComboFourFailed, requestSectionComboFourSuccess, requestSectionComboFour,
    requestSectionComboOneFailed, requestSectionComboOneSuccess, requestSectionComboOne,
    requestSectionComboThreeFailed, requestSectionComboThreeSuccess, requestSectionComboThree,
    requestSectionComboTwoFailed, requestSectionComboTwoSuccess, requestSectionComboTwo,
    requestTickerAndHeroFailed, requestTickerAndHeroSuccess, requestTickerAndHero,
    requestOpinionSuccess, requestOpinionList, requestOpinionFailed
  } from '../action';

describe('LatestNewsTab Action', () => {
    const payload: LatestArticleBodyGet = {
        items_per_page: 10,
        page: 0,
        offset: 0
    }
    const payload2: RequestSectionComboBodyGet = {
        id: 123,
        items_per_page: 0 ,
        page: 0
      }   
      
    test('request Opinion List', () => {
        const request = requestOpinionList(payload)
        expect(request.type).toEqual(REQUEST_OPINION_LIST_DATA)
    })

    test('request Opinion List success', () => {
        const request = requestOpinionSuccess({ opinionList: []})
        expect(request.type).toEqual(REQUEST_OPINION_DATA_SUCCESS)
    })

    test('request Opinion List Failed', () => {
        const request = requestOpinionFailed({error: ''})
        expect(request.type).toEqual(REQUEST_OPINION_DATA_LIST_FAILED)
    })

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

    test('request Section ComboOne', () => {
        const request = requestSectionComboOne(payload2)
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_ONE)
    })

    test('requestSection ComboOne success', () => {
        const request = requestSectionComboOneSuccess({ sectionComboOne: []})
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_ONE_SUCCESS)
    })

    test('request Section ComboOne Failed', () => {
        const request = requestSectionComboOneFailed({error: ''})
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_ONE_FAILED)
    })
    test('request Section ComboTwo', () => {
        const request = requestSectionComboTwo(payload2)
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_TWO)
    })

    test('request Section ComboTwo success', () => {
        const request = requestSectionComboTwoSuccess({ sectionComboTwo: []})
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_TWO_SUCCESS)
    })

    test('request Section ComboTwo Failed', () => {
        const request = requestSectionComboTwoFailed({error: ''})
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_TWO_FAILED)
    })

    test('request Section ComboThree', () => {
        const request = requestSectionComboThree(payload2)
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_THREE)
    })

    test('request Section ComboThree uccess', () => {
        const request = requestSectionComboThreeSuccess({ sectionComboThree: []})
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_THREE_SUCCESS)
    })

    test('request Section ComboThree Failed', () => {
        const request = requestSectionComboThreeFailed({error: ''})
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_THREE_FAILED)
    })

    test('request Section ComboFour', () => {
        const request = requestSectionComboFour(payload2)
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_FOUR)
    })

    test('request Section ComboFour success', () => {
        const request = requestSectionComboFourSuccess({ sectionComboFour: []})
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_FOUR_SUCCESS)
    })

    test('request Section ComboFour Failed', () => {
        const request = requestSectionComboFourFailed({error: ''})
        expect(request.type).toEqual(REQUEST_SECTION_COMBO_FOUR_FAILED)
    })
})