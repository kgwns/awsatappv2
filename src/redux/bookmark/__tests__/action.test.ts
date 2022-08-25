import { removeBookmarked, removeBookmarkedFailed, removeBookMarkedSuccess, sendBookMarkId, sendBookMarkIdFailed, sendBookMarkIdSuccess,getBookMarkedSuccess, getBookmarkedFailed, getBookmarkedDetailInfo, getBookMarkedSuccessDetailInfo, getBookmarkedFailedDetailInfo, updateFilteredBookMarkedInfo, updateBookMarkedDetailInfo, getBookmarked } from "../action"
import { GET_BOOK_MARKED, GET_BOOK_MARKED_DETAIL_INFO, GET_BOOK_MARKED_FAILED, GET_BOOK_MARKED_FAILED_DETAIL_INFO, GET_BOOK_MARKED_SUCCESS, GET_BOOK_MARKED_SUCCESS_DETAIL_INFO, REMOVE_BOOK_MARKED, REMOVE_BOOK_MARKED_FAILED, REMOVE_BOOK_MARKED_SUCCESS, SEND_BOOK_MARK_ID, SEND_BOOK_MARK_ID_FAILED, SEND_BOOK_MARK_ID_SUCCESS, UPDATED_FILTERED_DATA_SUCCESS, UPDATE_ADD_REMOVE_BOOK_MARK } from "../actionType"

describe('<BookmarkAction', () => {
    const nid: string = '123'
    const errorMessage = 'This is sample error'

    it('Check send bookmark', () => {
        const result = sendBookMarkId({nid})
        expect(result.type).toEqual(SEND_BOOK_MARK_ID)
        expect(result.payload.nid).toEqual(nid)
    })

    it('Check send bookmark success', () => {
        const result = sendBookMarkIdSuccess({sendBookMarkSuccessInfo: {}})
        expect(result.type).toEqual(SEND_BOOK_MARK_ID_SUCCESS)
        expect(result.payload.sendBookMarkSuccessInfo).toEqual({})
    })

    it('Check send bookmark failed', () => {
        const result = sendBookMarkIdFailed({error: errorMessage})
        expect(result.type).toEqual(SEND_BOOK_MARK_ID_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Check remove bookmark', () => {
        const result = removeBookmarked({nid})
        expect(result.type).toEqual(REMOVE_BOOK_MARKED)
        expect(result.type).toEqual(REMOVE_BOOK_MARKED)
    })

    it('Check remove bookmark success', () => {
        const result = removeBookMarkedSuccess({removeBookmarkInfo: {}})
        expect(result.type).toEqual(REMOVE_BOOK_MARKED_SUCCESS)
        expect(result.payload.removeBookmarkInfo).toEqual({})
    })

    it('Check remove bookmark failed', () => {
        const result = removeBookmarkedFailed({removeBookmarkError: errorMessage})
        expect(result.type).toEqual(REMOVE_BOOK_MARKED_FAILED)
        expect(result.payload.removeBookmarkError).toEqual(errorMessage)
    })

    it('Check get bookmark success', () => {
        const result = getBookMarkedSuccess({ bookmarkedInfo: [] })
        expect(result.type).toEqual(GET_BOOK_MARKED_SUCCESS)
        expect(result.payload.bookmarkedInfo).toEqual([])
    })

    it('Check get bookmark failed', () => {
        const result = getBookmarkedFailed({ error: '' })
        expect(result.type).toEqual(GET_BOOK_MARKED_FAILED)
        expect(result.payload.error).toEqual('')
    })

    it('Check get bookmark detail info', () => {
        const result = getBookmarkedDetailInfo({ nid: '123', page: 2 })
        expect(result.type).toEqual(GET_BOOK_MARKED_DETAIL_INFO)
        expect(result.payload.nid).toEqual('123')
    })

    it('Check get bookmark detail info success', () => {
        const result = getBookMarkedSuccessDetailInfo({ bookmarkedDetailInfo: [] })
        expect(result.type).toEqual(GET_BOOK_MARKED_SUCCESS_DETAIL_INFO)
        expect(result.payload.bookmarkedDetailInfo).toEqual([])
    })

    it('Check get bookmark detail', () => {
        const result = getBookmarked()
        expect(result.type).toEqual(GET_BOOK_MARKED)
    })

    it('Check get bookmark detail info failed', () => {
        const result = getBookmarkedFailedDetailInfo({ getBookmarkDetailError: '' })
        expect(result.type).toEqual(GET_BOOK_MARKED_FAILED_DETAIL_INFO)
        expect(result.payload.getBookmarkDetailError).toEqual('')
    })

    it('Check updateFilteredBookMarkedInfo', () => {
        const result = updateFilteredBookMarkedInfo({ filteredData: [] })
        expect(result.type).toEqual(UPDATED_FILTERED_DATA_SUCCESS)
    })

    it('Check updateBookMarkedDetailInfo', () => {
        const result = updateBookMarkedDetailInfo({ bookmarkedDetailInfo: [] })
        expect(result.type).toEqual(UPDATE_ADD_REMOVE_BOOK_MARK)
    })

})