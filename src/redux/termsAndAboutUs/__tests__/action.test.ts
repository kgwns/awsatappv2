import { requestStaticDetail, requestStaticDetailFailed, requestStaticDetailSuccess } from "../action"
import { REQUEST_STATIC_DETAIL, REQUEST_STATIC_DETAIL_FAILED, REQUEST_STATIC_DETAIL_SUCCESS } from "../actionType"



describe('<TermsAndAboutUs Action', () => {
    const id: number = 56
    const errorMessage = 'This is sample error'

    it('Check requestStaticDetail', () => {
        const result = requestStaticDetail({id})
        expect(result.type).toEqual(REQUEST_STATIC_DETAIL)
        expect(result.payload.id).toEqual(id)
    })

    it('Check request requestStaticDetail success', () => {
        const result = requestStaticDetailSuccess({data: []})
        expect(result.type).toEqual(REQUEST_STATIC_DETAIL_SUCCESS)
        expect(result.payload.data).toEqual([])
    })

    it('Check requestStaticDetail failed', () => {
        const result = requestStaticDetailFailed({error: errorMessage})
        expect(result.type).toEqual(REQUEST_STATIC_DETAIL_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })
})