import { emptyContactUsDetail, sendContactUsInfoDetail, sendContactUsInfoDetailFailed, sendContactUsInfoDetailSuccess } from "../action"
import { EMPTY_CONTACT_US_DETAIL, SEND_CONTACT_US_INFO, SEND_CONTACT_US_INFO_FAILED, SEND_CONTACT_US_INFO_SUCCESS } from "../actionType"

describe('Contact Us Action', () => {

    test('Check sendContactUsInfoDetail', () => {
        const request = sendContactUsInfoDetail({ name: 'abc', email: 'abc@gmail.com', msg: 'example' })
        expect(request.type).toEqual(SEND_CONTACT_US_INFO)
    })

    test('Check sendContactUsInfoDetailSuccess', () => {
        const request = sendContactUsInfoDetailSuccess({code: 12, message: 'example'})
        expect(request.type).toEqual(SEND_CONTACT_US_INFO_SUCCESS)
    })

    test('Check sendContactUsInfoDetailFailed', () => {
        const request = sendContactUsInfoDetailFailed({
            error: ''
        })
        expect(request.type).toEqual(SEND_CONTACT_US_INFO_FAILED)
    })

    test('Check emptyContactUsDetail', () => {
        const request = emptyContactUsDetail()
        expect(request.type).toEqual(EMPTY_CONTACT_US_DETAIL)
    })

})