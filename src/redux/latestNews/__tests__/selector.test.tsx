import { storeInfo } from "src/constants/SampleData"
import { getError, getHeroData, getHeroListData, getIsLoading, getOpinionData, getSectionComboFourData, getSectionComboOneData, getSectionComboThreeData, getSectionComboTwoData, getTickerData, getTopListData } from "../selectors"
import { LatestArticleDataType } from "../types"

describe('LatestNewsTab Selector', () => {
    const storeData = storeInfo[0]
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(storeData)
        expect(isLoading).toEqual(true)
    })

    test('Get hero state', () => {
        const ticker: LatestArticleDataType[] = getTickerData(storeData)
        expect(ticker).toEqual([])
    })

    test('Get hero state', () => {
        const hero: LatestArticleDataType[] = getHeroData(storeData)
        expect(hero).toEqual([])
    })

    test('Get heroList state', () => {
        const heroList: LatestArticleDataType[] = getHeroListData(storeData)
        expect(heroList).toEqual([])
    })

    test('Get heroList state', () => {
        const topList: LatestArticleDataType[] = getTopListData(storeData)
        expect(topList).toEqual([])
    })
    

    test('Get opinion state', () => {
        const opinion = getOpinionData(storeData)
        expect(opinion).toEqual([])
    })

    test('Get sectionComboOne state', () => {
        const comboOne: LatestArticleDataType[] = getSectionComboOneData(storeData)
        expect(comboOne).toEqual([])
    })

    test('Get sectionComboTwo state', () => {
        const comboTwo: LatestArticleDataType[] = getSectionComboTwoData(storeData)
        expect(comboTwo).toEqual([])
    })

    test('Get sectionComboThree state', () => {
        const comboThree: LatestArticleDataType[] = getSectionComboThreeData(storeData)
        expect(comboThree).toEqual([])
    })

    test('Get sectionComboFour state', () => {
        const comboFour: LatestArticleDataType[] = getSectionComboFourData(storeData)
        expect(comboFour).toEqual([])
    })

    test('Get error state', () => {
        const error = getError(storeData)
        expect(error).toEqual('')
    })
})
