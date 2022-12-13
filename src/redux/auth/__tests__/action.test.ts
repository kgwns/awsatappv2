import {
    FETCH_EMAIL_CHECK,
    FETCH_EMAIL_CHECK_SUCCESS,
    FETCH_EMAIL_CHECK_ERROR,
    EMPTY_EMAIL_CHECK_DATA,
} from 'src/redux/auth/actionTypes';
import { fetchEmailCheck, fetchEmailCheckSuccess, fetchEmailCheckFailed, emptyEmailCheckAction } from 'src/redux/auth/action';
import { FetchEmailCheckPayloadType } from '../types';

describe('Auth Action', () => {
    const payload: FetchEmailCheckPayloadType = {
        email: 'mockEmail',
    }

    test('Check request fetch email data type', () => {
        const request = fetchEmailCheck(payload)
        expect(request).toEqual({
            type: FETCH_EMAIL_CHECK,
            payload
        })
    })

    test('Check request fetch email success type', () => {
        const request = fetchEmailCheckSuccess({
            emailCheckData: []
        })
        expect(request.type).toEqual(FETCH_EMAIL_CHECK_SUCCESS)
    })

    test('Check request fetch email failed type', () => {
        const request = fetchEmailCheckFailed({
            error: ''
        })
        expect(request.type).toEqual(FETCH_EMAIL_CHECK_ERROR)
    })

    test('Check request empty email check action', () => {
        const request = emptyEmailCheckAction()
        expect(request.type).toEqual(EMPTY_EMAIL_CHECK_DATA)
    })
})