import { removeBookmarked, removeBookmarkedFailed, removeBookMarkedSuccess, sendBookMarkId, sendBookMarkIdFailed, sendBookMarkIdSuccess } from "../action"
import { REMOVE_BOOK_MARKED, REMOVE_BOOK_MARKED_FAILED, REMOVE_BOOK_MARKED_SUCCESS, SEND_BOOK_MARK_ID, SEND_BOOK_MARK_ID_FAILED, SEND_BOOK_MARK_ID_SUCCESS } from "../actionType"

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
})