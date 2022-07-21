import { emptyData, requestArticleDetail, requestArticleDetailFailed, requestArticleDetailSuccess, requestArticleSection, requestRelatedArticle, requestRelatedArticleFailed, requestRelatedArticleSuccess } from "../action"
import { EMPTY_DATA, REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS, REQUEST_ARTICLE_SECTION, REQUEST_RELATED_ARTICLE, REQUEST_RELATED_ARTICLE_FAILED, REQUEST_RELATED_ARTICLE_SUCCESS } from "../actionType"

describe('<ArticleDetailAction', () => {
    const nid: number = 123
    const tid: number = 123
    const errorMessage = 'This is sample error'

    it('Check requestRelatedArticle', () => {
        const result = requestRelatedArticle({tid})
        expect(result.type).toEqual(REQUEST_RELATED_ARTICLE)
        expect(result.payload.tid).toEqual(tid)
    })

    it('Check request ArticleDetail success', () => {
        const result = requestRelatedArticleSuccess({relatedArticleData: []})
        expect(result.type).toEqual(REQUEST_RELATED_ARTICLE_SUCCESS)
        expect(result.payload.relatedArticleData).toEqual([])
    })

    it('Check request Article Detail failed', () => {
        const result = requestRelatedArticleFailed({error: errorMessage})
        expect(result.type).toEqual(REQUEST_RELATED_ARTICLE_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Check request Article Detail', () => {
        const result = requestArticleDetail({nid})
        expect(result.type).toEqual(REQUEST_ARTICLE_DETAIL)
        expect(result.payload.nid).toEqual(nid)
    })

    it('Check request Related Article success', () => {
        const result = requestArticleDetailSuccess({articleDetailData: [],pager: {}})
        expect(result.type).toEqual(REQUEST_ARTICLE_DETAIL_SUCCESS)
        expect(result.payload.articleDetailData).toEqual([])
    })

    it('Check request Related Article Failed', () => {
        const result = requestArticleDetailFailed({error: errorMessage})
        expect(result.type).toEqual(REQUEST_ARTICLE_DETAIL_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Check request emptyData', () => {
        const result = emptyData()
        expect(result.type).toEqual(EMPTY_DATA)
    })

    it('Check request requestArticleSection', () => {
        const result = requestArticleSection({ id: 2,
            page: 1,
            items_per_page: 2,
            current_nid: 1,})
        expect(result.type).toEqual(REQUEST_ARTICLE_SECTION)
    })
})