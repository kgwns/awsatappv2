import { SendNewPassword } from 'src/redux/changePassword/types';
import {
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_SUCCESS,
    EMPTY_PASSWORD_RESPONSE_INFO
} from 'src/redux/changePassword/actionTypes';
import { changePassword, changePasswordSuccess, changePasswordFailed, emptyPasswordResponse } from 'src/redux/changePassword/action';

describe('Change password Action', () => {
    const payload: SendNewPassword = {
        password: '#AwsatApp01',
    }

    test('Check request change password data type', () => {
        const request = changePassword(payload)
        expect(request).toEqual({
            type: CHANGE_PASSWORD,
            payload
        })
    })

    test('Check request change passwords success type', () => {
        const request = changePasswordSuccess({
            message: []
        })
        expect(request.type).toEqual(CHANGE_PASSWORD_SUCCESS)
    })

    test('Check request change password failed type', () => {
        const request = changePasswordFailed({
            error: ''
        })
        expect(request.type).toEqual(CHANGE_PASSWORD_ERROR)
    })

    test('Check request change password empty response type', () => {
        const request = emptyPasswordResponse()
        expect(request.type).toEqual(EMPTY_PASSWORD_RESPONSE_INFO)
    })

})