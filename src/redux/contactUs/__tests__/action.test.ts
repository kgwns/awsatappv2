import {
    sendContactUsInfoDetail,
    sendContactUsInfoDetailSuccess,
    sendContactUsInfoDetailFailed,
    emptyContactUsDetail,
} from "../action"
import {
    SEND_CONTACT_US_INFO,
    SEND_CONTACT_US_INFO_SUCCESS,
    SEND_CONTACT_US_INFO_FAILED,
    EMPTY_CONTACT_US_DETAIL,
} from "../actionType"
import { SendContactUsInfoPayload } from "../types"

describe('<ContactUs Action', () => {
    const data: SendContactUsInfoPayload = {
        name: 'testName',
        email: 'test@test.com',
        msg: 'test message'
    }

    const successResponse = { code: 200, message: 'success' }
    const errorMessage = 'This is sample error'

    it('Check send contact us query', () => {
        const result = sendContactUsInfoDetail(data)
        expect(result.type).toEqual(SEND_CONTACT_US_INFO)
        expect(result.payload).toEqual(data)
    })

    it('Check send contact us info success', () => {
        const result = sendContactUsInfoDetailSuccess(successResponse)
        expect(result.type).toEqual(SEND_CONTACT_US_INFO_SUCCESS)
        expect(result.payload).toEqual(successResponse)
    })

    it('Check send contact us info failed', () => {
        const result = sendContactUsInfoDetailFailed({ error: errorMessage })
        expect(result.type).toEqual(SEND_CONTACT_US_INFO_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Check remove contact us message info', () => {
        const result = emptyContactUsDetail()
        expect(result.type).toEqual(EMPTY_CONTACT_US_DETAIL)
        expect(result.type).toEqual(EMPTY_CONTACT_US_DETAIL)
    })
})