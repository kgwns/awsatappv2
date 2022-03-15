import { ChangePasswordActions } from '../action';
import { CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_SUCCESS,EMPTY_PASSWORD_RESPONSE_INFO } from '../actionTypes';
import changePassword from '../reducer';
import { ChangePasswordState } from '../types';

describe('change password reducer', () => {
    let initialState: ChangePasswordState;

    beforeEach(() => {
        initialState = {
            isLoading: false,
            error: '',
            response: {}
        };
    });

    test('Change Password Success', () => {
        const testData = [{}];
        initialState.isLoading = true;
        const nextState = changePassword(
            initialState,
            ChangePasswordActions.changePasswordSuccess({
                message: testData,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
    });

    test('fetchAllWritersFailure', () => {
        const testError = 'some-error';
        initialState.isLoading = true;
        const nextState = changePassword(
            initialState,
            ChangePasswordActions.changePasswordFailed({
                error: testError,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
        expect(nextState.error).toEqual(testError);
    });

    test('Check loading state when CHANGE_PASSWORD request API', () => {
        const nextState = changePassword(initialState, {
            type: CHANGE_PASSWORD,
            payload: { password: "10" },
        });
        expect(nextState.isLoading).toBe(true);
    });


    test('Check loading state when CHANGE_PASSWORD_SUCCESS request API', () => {
        const nextState = changePassword(initialState, {
            type: CHANGE_PASSWORD_SUCCESS,
            payload: { message: '' }
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when CHANGE_PASSWORD_ERROR request API', () => {
        const nextState = changePassword(initialState, {
            type: CHANGE_PASSWORD_ERROR,
            payload: { error: 'sample error' },
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when EMPTY_PASSWORD_RESPONSE_INFO request ', () => {
        const nextState = changePassword(initialState, {
            type: EMPTY_PASSWORD_RESPONSE_INFO,
        });
        expect(nextState.isLoading).toBe(false);
    });
});
