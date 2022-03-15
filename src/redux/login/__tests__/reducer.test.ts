import { loginAction } from '../action';
import { FETCH_LOGIN, FETCH_LOGIN_ERROR, FETCH_LOGIN_SUCCESS, FETCH_USER_LOGOUT, FETCH_USER_LOGOUT_SUCCESS, LOGIN_SKIPPED, ONBOARDING_SUCCESS } from '../actionTypes';
import loginReducer from '../reducer';
import { LoginState } from '../types';

describe('login reducer', () => {
    let initialState: LoginState;

    beforeEach(() => {
        initialState = {
            loginData: null,
            error: '',
            isLoading: false,
            isSkipped: false,
        };
    });

    test('fetchLoginSuccess', () => {
        const testData = [{}];
        initialState.isLoading = true;
        const nextState = loginReducer(
            initialState,
            loginAction.fetchLoginSuccess({
                loginData: testData,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
    });

    test('fetchAllWritersFailure', () => {
        const testError = 'some-error';
        initialState.isLoading = true;
        const nextState = loginReducer(
            initialState,
            loginAction.fetchLoginFailed({
                error: testError,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
        expect(nextState.error).toEqual(testError);
    });

    test('Check loading state when FETCH_LOGIN request API', () => {
        const nextState = loginReducer(initialState, {
            type: FETCH_LOGIN,
            payload: { email: 'email', password: 'password', device_name: 'device_name' },
        });
        expect(nextState.isLoading).toBe(true);
    });

    test('Check loading state when FETCH_LOGIN_SUCCESS request API', () => {
        const nextState = loginReducer(initialState, {
            type: FETCH_LOGIN_SUCCESS,
            payload: { loginData: {} },
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when FETCH_LOGIN_ERROR request API', () => {
        const nextState = loginReducer(initialState, {
            type: FETCH_LOGIN_ERROR,
            payload: { error: 'sample error' },
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when FETCH_USER_LOGOUT request API', () => {
        const nextState = loginReducer(initialState, {
            type: FETCH_USER_LOGOUT,
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when FETCH_USER_LOGOUT_SUCCESS request API', () => {
        const nextState = loginReducer(initialState, {
            type: FETCH_USER_LOGOUT_SUCCESS,
        });
        expect(nextState.isLoading).toBe(false);
    });


    test('Check loading state when LOGIN_SKIPPED request API', () => {
        const nextState = loginReducer(initialState, {
            type: LOGIN_SKIPPED,
        });
        expect(nextState.isLoading).toBe(false);
    });


    test('Check loading state when ONBOARDING_SUCCESS request API', () => {
        const nextState = loginReducer(initialState, {
            type: ONBOARDING_SUCCESS,
        });
        expect(nextState.isLoading).toBe(false);
    });

});
