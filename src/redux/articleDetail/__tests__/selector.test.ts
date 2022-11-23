import { storeInfo } from "src/constants/Constants"
import { getArticleData, getArticleError, getIsLoading, getRelatedArticleData, getArticleSectionLoaded } from "../selectors"
import { ArticleDetailDataType, RelatedArticleDataType } from "../types"

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

    test('Get related article detail state', () => {
        const relatedArticle: RelatedArticleDataType[] = getRelatedArticleData(storeData)
        expect(relatedArticle).toEqual([])
    })

    test('Get article detail error state', () => {
        const error:  string = getArticleError(storeData)
        expect(error).toEqual('')
    })

    test('Get getArticleSectionLoaded state', () => {
        const articleSectionLoaded: boolean = getArticleSectionLoaded(storeData)
        expect(articleSectionLoaded).toEqual(false)
     })

})
