import {
    SAVE_TOKEN_REQUEST,
    SAVE_TOKEN_SUCCESS,
    SAVE_TOKEN_FAILED,
    SAVE_TOKEN_AFTER_REGISTRATION_REQUEST,
    SAVE_TOKEN_AFTER_REGISTRATION_SUCCESS,
    SAVE_TOKEN_AFTER_REGISTRATION_FAILED,
  } from '../actionType';
import { SaveTokenFailed, SaveTokenSuccess, SaveToken, SaveTokenAfterRegistration, SaveTokenAfterRegistrationSuccess, SaveTokenAfterRegistrationFailed } from '../action';

describe('<SaveTokenAction', () => {

    const errorMessage = 'This is sample error'

    it('Save Token', () => {
        const result = SaveToken({fcm_token: 'string',
            platform: 'string',
            device_name: 'string'})
        expect(result.type).toEqual(SAVE_TOKEN_REQUEST)
    })

    it('Save Token success', () => {
        const result = SaveTokenSuccess({  id: 2,
            message: 'string',})
        expect(result.type).toEqual(SAVE_TOKEN_SUCCESS)
        expect(result.payload.id).toEqual(2)
    })

    it('Save Token failed', () => {
        const result = SaveTokenFailed({error: errorMessage})
        expect(result.type).toEqual(SAVE_TOKEN_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Save Token Registration', () => {
        const result = SaveTokenAfterRegistration({id: 'string', uid: 2})
        expect(result.type).toEqual(SAVE_TOKEN_AFTER_REGISTRATION_REQUEST)
    })

    it('Save Token Registration success', () => {
        const result = SaveTokenAfterRegistrationSuccess({message: 'string'})
        expect(result.type).toEqual(SAVE_TOKEN_AFTER_REGISTRATION_SUCCESS)
        expect(result.payload.message).toEqual('string')
    })

    it('Save Token Registration failed', () => {
        const result = SaveTokenAfterRegistrationFailed({error: errorMessage})
        expect(result.type).toEqual(SAVE_TOKEN_AFTER_REGISTRATION_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

})