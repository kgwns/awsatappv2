import { storeInfo } from "src/constants/SampleData"
import { getHeroData, getHeroListData, getIsLoading, getTopListData } from "../selectors"
import { LatestArticleDataType } from "../types"

describe('LatestNewsTab Selector', () => {
    const storeData = storeInfo[0]
    test('Get loading state', () => {
       const isLoading: boolean = getIsLoading(storeData)
       expect(isLoading).toEqual(true)
    })

    test('Get hero state', () => {
        const hero: LatestArticleDataType[] = getHeroData(storeData)
        expect(hero).toEqual([])
    })

    test('Get heroList state', () => {
        const heroList:  LatestArticleDataType[] = getHeroListData(storeData)
        expect(heroList).toEqual([])
    })

    test('Get topList state', () => {
        const topList: LatestArticleDataType[] = getTopListData(storeData)
        expect(topList).toEqual([])
    })
})
