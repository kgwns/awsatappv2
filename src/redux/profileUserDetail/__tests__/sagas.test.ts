import { testSaga } from 'redux-saga-test-plan';
import { FETCH_PROFILE_USER_DETAILS, SEND_USER_DETAILS, UPDATE_PROFILE_USER_IMAGE } from '../actionTypes';
import { fetchUserProfileDetail, postUserData, UpdateUserImage } from '../sagas';
import { sendUserDataSuccess, fetchUserProfileDetailsSuccess } from '../action';
import { sendUserProfileApi, fetchUserProfileApi } from 'src/services/profileUserService';
import {
    SendUserData,
    SendUserDataSuccessPayloadType
} from '../types';

const requestObject: SendUserData = {
    first_name: 'string',
    birthday: 'string',
    occupation: 'string',
    email: 'string'
};

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' },
};

const sucessUserProfileResponseObject: SendUserDataSuccessPayloadType = {
    saveData: {},
};

describe('Test userProfileData success', () => {
    it('fire on SEND_USER_DETAILS', () => {
        testSaga(postUserData, {
            type: SEND_USER_DETAILS,
            payload: requestObject,
        })
            .next()
            .call(sendUserProfileApi, requestObject)
            .next({})
            .put(sendUserDataSuccess(sucessUserProfileResponseObject))
            .finish()
            .isDone();
    });
});

describe('Test userProfile error', () => {
    it('check post user profile failed', () => {
        const genObject = postUserData({
            type: SEND_USER_DETAILS,
            payload: {
                first_name: 'string',
                birthday: 'string',
                occupation: 'string',
                email: 'string'
            },
        });
        genObject.next();
        genObject.throw(errorResponse);
    });
});

describe('Test update image error', () => {
    it('check update image failed', () => {
        const genObject = UpdateUserImage({
            type: UPDATE_PROFILE_USER_IMAGE,
            payload: {
                image: ' '
            },
        });
        genObject.next();
        genObject.throw(errorResponse);
    });
});

describe('Test userProfile success', () => {
    it('fire on FETCH_PROFILE_USER_DETAILS', () => {
        testSaga(fetchUserProfileDetail, { type: FETCH_PROFILE_USER_DETAILS })
            .next()
            .call(fetchUserProfileApi)
            .next({})
            .put(fetchUserProfileDetailsSuccess({ userProfileData: {} }))
            .finish()
            .isDone();
    });
});

describe('Test userProfile  error', () => {
    it('check fetchUserProfileDetail failed', () => {
        const genObject = fetchUserProfileDetail({
            type: FETCH_PROFILE_USER_DETAILS
        });
        genObject.next();
        genObject.throw(errorResponse);
    });
});




