import { FetchLoginPayloadType } from 'src/redux/login/types';
import {
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR,
    FETCH_USER_LOGOUT,
    FETCH_USER_LOGOUT_SUCCESS,
    LOGIN_SKIPPED,
    ONBOARDING_SUCCESS,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    EMPTY_FORGOT_PASSWORD_RESPONSE,
    FORGOT_PASSWORD_REQUEST,
    EMPTY_LOGIN_DATA
} from 'src/redux/login/actionTypes';
import { fetchLogin, fetchLoginSuccess, fetchLoginFailed, userLogout, userLogoutSuccess, userLoginSkipped, onBoardingSuccess,forgotPasswordSuccess,forgotPasswordFailed,emptyForgotPasswordResponse, requestForgotPassword, emptyLoginData } from 'src/redux/login/action';

describe('Login Action', () => {
    const payload: FetchLoginPayloadType = {
        email: 'email',
        password: 'password',
        device_name: 'device_name',
    }

    test('Check request login data type', () => {
        const request = fetchLogin(payload)
        expect(request).toEqual({
            type: FETCH_LOGIN,
            payload
        })
    })

    test('Check request login success type', () => {
        const request = fetchLoginSuccess({
            loginData: []
        })
        expect(request.type).toEqual(FETCH_LOGIN_SUCCESS)
    })

    test('Check request login failed type', () => {
        const request = fetchLoginFailed({
            error: ''
        })
        expect(request.type).toEqual(FETCH_LOGIN_ERROR)
    })

    test('Check request user logout type', () => {
        const request = userLogout()
        expect(request.type).toEqual(FETCH_USER_LOGOUT)
    })

    test('Check request user logout success type', () => {
        const request = userLogoutSuccess()
        expect(request.type).toEqual(FETCH_USER_LOGOUT_SUCCESS)
    })

    test('Check request user login skipped type', () => {
        const request = userLoginSkipped()
        expect(request.type).toEqual(LOGIN_SKIPPED)
    })

    test('Check request onboard success type', () => {
        const request = onBoardingSuccess()
        expect(request.type).toEqual(ONBOARDING_SUCCESS)
    })

    test('Check request forgot password success type', () => {
        const request = forgotPasswordSuccess({
            response: {}
        })
        expect(request.type).toEqual(FORGOT_PASSWORD_SUCCESS)
    })

    test('Check request forgot password failed type', () => {
        const request = forgotPasswordFailed({
            error: ''
        })
        expect(request.type).toEqual(FORGOT_PASSWORD_FAILED)
    })

    test('Check empty forgot password type', () => {
        const request = emptyForgotPasswordResponse()
        expect(request.type).toEqual(EMPTY_FORGOT_PASSWORD_RESPONSE)
    })

    test('Check requestForgotPassword', () => {
        const request = requestForgotPassword({email: 'abc@gmail.com'})
        expect(request.type).toEqual(FORGOT_PASSWORD_REQUEST)
    })

    test('Check emptyLoginData', () => {
        const request = emptyLoginData()
        expect(request.type).toEqual(EMPTY_LOGIN_DATA)
    })
})