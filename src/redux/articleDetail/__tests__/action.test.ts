import { requestArticleDetail, requestArticleDetailFailed, requestArticleDetailSuccess } from "../action"
import { REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS } from "../actionType"

describe('<ArticleDetailAction', () => {
    const nid: number = 123
    const errorMessage = 'This is sample error'

    it('Check requestArticleDetail', () => {
        const result = requestArticleDetail({nid})
        expect(result.type).toEqual(REQUEST_ARTICLE_DETAIL)
        expect(result.payload.nid).toEqual(nid)
    })

    it('Check requestArticleDetail success', () => {
        const result = requestArticleDetailSuccess({articleDetailData: [],pager: {}})
        expect(result.type).toEqual(REQUEST_ARTICLE_DETAIL_SUCCESS)
        expect(result.payload.articleDetailData).toEqual([])
    })

    it('Check requestArticleDetail', () => {
        const result = requestArticleDetailFailed({error: errorMessage})
        expect(result.type).toEqual(REQUEST_ARTICLE_DETAIL_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })
})