import { FETCH_USER_LOGOUT } from 'src/redux/login/actionTypes';
import { emailCheckAction } from '../action';
import { EMPTY_EMAIL_CHECK_DATA, FETCH_EMAIL_CHECK, FETCH_EMAIL_CHECK_ERROR, FETCH_EMAIL_CHECK_SUCCESS } from '../actionTypes';
import auth from '../reducer';
import { EmailCheckState } from '../types';

describe('auth reducer', () => {
    let initialState: EmailCheckState;

    beforeEach(() => {
        initialState = {
            emailCheckData: null,
            error: '',
            isLoading: false,
            actionType: '',
        };
    });

    test('fetchEmailCheckSuccess', () => {
        const testData = [{}];
        initialState.isLoading = true;
        const nextState = auth(
            initialState,
            emailCheckAction.fetchEmailCheckSuccess({
                emailCheckData: testData,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
    });

    test('fetchEmailCheckFailed', () => {
        const testError = 'some-error';
        initialState.isLoading = true;
        const nextState = auth(
            initialState,
            emailCheckAction.fetchEmailCheckFailed({
                error: testError,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
        expect(nextState.error).toEqual(testError);
    });

    test('Check loading state when email check request API', () => {
        const nextState = auth(initialState, {
            type: FETCH_EMAIL_CHECK,
            payload: { email: 'email' },
        });
        expect(nextState.isLoading).toBe(true);
    });

    test('Check loading state when email check success request API', () => {
        const nextState = auth(initialState, {
            type: FETCH_EMAIL_CHECK_SUCCESS,
            payload: { emailCheckData: {} },
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when email check error request API', () => {
        const nextState = auth(initialState, {
            type: FETCH_EMAIL_CHECK_ERROR,
            payload: { error: 'sample error' },
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when fetch user logout request API', () => {
        const nextState = auth(initialState, {
            type: FETCH_USER_LOGOUT,
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state EMPTY_EMAIL_CHECK_DATA', () => {
        const nextState = auth(initialState, {
            type: EMPTY_EMAIL_CHECK_DATA,
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Default State', () => {
        const nextState = auth(
          initialState, { type:'EMPTY_EMAIL_CHECK_DATA' }
        )
        expect(nextState.isLoading).toBe(false)
      })
});
