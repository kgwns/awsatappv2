import {
    EMPTY_USER_PROFILE_DATA,
    FETCH_PROFILE_USER_DETAILS,
    FETCH_PROFILE_USER_DETAILS_ERROR,
    FETCH_PROFILE_USER_DETAILS_SUCCESS,
    SEND_USER_DETAILS,
    SEND_USER_DETAILS_ERROR,
    SEND_USER_DETAILS_SUCCESS,
    UPDATE_PROFILE_USER_IMAGE,
    UPDATE_USER_IMAGE_FAILED,
    UPDATE_USER_IMAGE_SUCCESS
} from 'src/redux/profileUserDetail/actionTypes';
import { sendUserData, sendUserDataSuccess, sendUserDataFailed, fetchUserProfileDetail, fetchUserProfileDetailFailed, fetchUserProfileDetailsSuccess, updateUserImageFailed, updateUserImageSuccess, updateUserImage, emptyUserProfileData } from 'src/redux/profileUserDetail/action';
import { SendUserData } from 'src/redux/profileUserDetail/types';

describe('send user data Action', () => {
    const payload: SendUserData = {
        first_name: 'awsat',
        birthday: '01/01/1111',
        occupation: 'mockString',
        email: 'awsat@awsat.com'
    }

    test('Check request send user data type', () => {
        const request = sendUserData(payload)
        expect(request).toEqual({
            type: SEND_USER_DETAILS,
            payload
        })
    })

    test('Check request send user data success type', () => {
        const request = sendUserDataSuccess({
            saveData: {}
        })
        expect(request.type).toEqual(SEND_USER_DETAILS_SUCCESS)
    })

    test('Check request send user data failed type', () => {
        const request = sendUserDataFailed({
            error: ''
        })
        expect(request.type).toEqual(SEND_USER_DETAILS_ERROR)
    })

    test('Check request fetch user data type', () => {
        const request = fetchUserProfileDetail()
        expect(request).toEqual({
            type: FETCH_PROFILE_USER_DETAILS,
        })
    })

    test('Check request send user data success type', () => {
        const request = fetchUserProfileDetailsSuccess({
            userProfileData: {}
        })
        expect(request.type).toEqual(FETCH_PROFILE_USER_DETAILS_SUCCESS)
    })

    test('Check request send user data failed type', () => {
        const request = fetchUserProfileDetailFailed({
            error: ''
        })
        expect(request.type).toEqual(FETCH_PROFILE_USER_DETAILS_ERROR)
    })

    test('Check request update user image data success type', () => {
        const request = updateUserImageSuccess({
            user: null,
            message: { code: 200, message: '' },
        })
        expect(request.type).toEqual(UPDATE_USER_IMAGE_SUCCESS)
    })

    test('Check request update user image failed type', () => {
        const request = updateUserImageFailed({
            error: ''
        })
        expect(request.type).toEqual(UPDATE_USER_IMAGE_FAILED)
    })

    test('updateUserImage', () => {
        const request = updateUserImage({ image: '' })
        expect(request.type).toEqual(UPDATE_PROFILE_USER_IMAGE)
    })

    test('emptyUserProfileData', () => {
        const request = emptyUserProfileData()
        expect(request.type).toEqual(EMPTY_USER_PROFILE_DATA)
    })
})


