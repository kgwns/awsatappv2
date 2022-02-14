import { storeInfo } from "src/constants/SampleData"
import { getArticleData, getArticleError, getIsLoading } from "../selectors"
import { ArticleDetailDataType } from "../types"

describe('LatestNewsTab Selector', () => {
    const storeData = storeInfo[0]
    test('Get loading state', () => {
       const isLoading: boolean = getIsLoading(storeData)
       expect(isLoading).toEqual(true)
    })

    test('Get article detail state', () => {
        const article: ArticleDetailDataType[] = getArticleData(storeData)
        expect(article).toEqual([])
    })

    test('Get article detail error state', () => {
        const error:  string = getArticleError(storeData)
        expect(error).toEqual('')
    })
})
