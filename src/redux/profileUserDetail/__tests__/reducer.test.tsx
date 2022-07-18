import { UserProfileDetailActions } from '../action';
import { FETCH_PROFILE_USER_DETAILS, FETCH_PROFILE_USER_DETAILS_SUCCESS, FETCH_PROFILE_USER_DETAILS_ERROR, SEND_USER_DETAILS, SEND_USER_DETAILS_SUCCESS, SEND_USER_DETAILS_ERROR, UPDATE_PROFILE_USER_IMAGE, UPDATE_USER_IMAGE_FAILED, UPDATE_USER_IMAGE_SUCCESS, EMPTY_USER_PROFILE_DATA } from '../actionTypes';
import userDetails from '../reducer';
import { ProfileUserDetailsState } from '../types';

describe('profile user details reducer', () => {
    let initialState: ProfileUserDetailsState;

    beforeEach(() => {
        initialState = {
            userProfileData: {},
            error: '',
            isLoading: false,
            sendUserInfo: {},
            userDetail: null
        };
    });

    test('profile user details Success', () => {
        const testData = [{}];
        initialState.isLoading = true;
        const nextState = userDetails(
            initialState,
            UserProfileDetailActions.fetchUserProfileDetailsSuccess({
                userProfileData: testData,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
    });

    test('fetch user profile details failed', () => {
        const testError = 'some-error';
        initialState.isLoading = true;
        const nextState = userDetails(
            initialState,
            UserProfileDetailActions.fetchUserProfileDetailFailed({
                error: testError,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
        expect(nextState.error).toEqual(testError);
    });

    test('Check loading state when FETCH_PROFILE_USER_DETAILS request API', () => {
        const nextState = userDetails(initialState, {
            type: FETCH_PROFILE_USER_DETAILS
        });
        expect(nextState.isLoading).toBe(true);
    });


    test('Check loading state when FETCH_PROFILE_USER_DETAILS_SUCCESS request API', () => {
        const nextState = userDetails(initialState, {
            type: FETCH_PROFILE_USER_DETAILS_SUCCESS,
            payload: { userProfileData: '' }
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when FETCH_PROFILE_USER_DETAILS_ERROR request API', () => {
        const nextState = userDetails(initialState, {
            type: FETCH_PROFILE_USER_DETAILS_ERROR,
            payload: { error: 'sample error' },
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when SEND_USER_DETAILS request API', () => {
        const nextState = userDetails(initialState, {
            type: SEND_USER_DETAILS,
            payload: {
                first_name: 'string',
                birthday: 'string',
                occupation: 'string',
                email: 'string'
            }
        });
        expect(nextState.isLoading).toBe(true);
    });


    test('Check loading state when SEND_USER_DETAILS_SUCCESS request API', () => {
        const nextState = userDetails(initialState, {
            type: SEND_USER_DETAILS_SUCCESS,
            payload: { saveData: '' }
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when SEND_USER_DETAILS_ERROR request API', () => {
        const nextState = userDetails(initialState, {
            type: SEND_USER_DETAILS_ERROR,
            payload: { error: 'sample error' },
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when UPDATE_PROFILE_USER_IMAGE request API', () => {
        const nextState = userDetails(initialState, {
            type: UPDATE_PROFILE_USER_IMAGE,
            payload: {
                image: 'image'
            }
        });
        expect(nextState.isLoading).toBe(true);
    });


    test('Check loading state when UPDATE_USER_IMAGE_SUCCESS request API', () => {
        const nextState = userDetails(initialState, {
            type: UPDATE_USER_IMAGE_SUCCESS,
            payload: { user: null, message: { code: 200, message: '' } }
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when UPDATE_USER_IMAGE_FAILED request API', () => {
        const nextState = userDetails(initialState, {
            type: UPDATE_USER_IMAGE_FAILED,
            payload: { error: 'sample error' },
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when EMPTY_USER_PROFILE_DATA request API', () => {
        const nextState = userDetails(initialState, {
            type: EMPTY_USER_PROFILE_DATA,
        });
        expect(nextState.isLoading).toBe(false);
    });
});
