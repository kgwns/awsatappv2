import { all, takeLatest } from 'redux-saga/effects';
import { FETCH_LOGIN, FORGOT_PASSWORD_REQUEST, FETCH_USER_LOGOUT } from '../actionTypes';
import loginSaga, { fetchLogin, fetchLogout,requestForgotPassword } from '../sagas';

const mockString = 'mockString';

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' },
};

const errorResponse1 = {
    request: { data: 'Error', status: 500, statusText: 'Error' },
    message: 'Error'
};

const errorResponse2 = {
    message: 'Error'
};

describe('Check loginSaga sage method', () => {
    const genObject = loginSaga();

    it('should test all loginSaga', () => {
        const generator = genObject.next();
        expect(generator.value).toEqual(
            all([
                takeLatest(FETCH_LOGIN, fetchLogin),
                takeLatest(FETCH_USER_LOGOUT, fetchLogout),
                takeLatest(FORGOT_PASSWORD_REQUEST,requestForgotPassword),
            ])
        );
    });

    it('should be done on next iteration', () => {
        expect(genObject.next().done).toBeTruthy();
    });
})

describe('Test fetch login', () => {
    it('check fetchlogin success', () => {
        const genObject = fetchLogin({
            type: FETCH_LOGIN,
            payload: {
                email: mockString,
                password: mockString,
                device_name: mockString
            },
        });
        genObject.next();
        genObject.next();
    });

    it('check fetchlogin failed', () => {
        const genObject = fetchLogin({
            type: FETCH_LOGIN,
            payload: {
                email: mockString,
                password: mockString,
                device_name: mockString
            },
        });
        genObject.next();
        genObject.throw(errorResponse);
    });

    it('check fetchlogin failed', () => {
        const genObject = fetchLogin({
            type: FETCH_LOGIN,
            payload: {
                email: mockString,
                password: mockString,
                device_name: mockString
            },
        });
        genObject.next();
        genObject.throw(errorResponse1);
    });

    it('check fetchlogin failed', () => {
        const genObject = fetchLogin({
            type: FETCH_LOGIN,
            payload: {
                email: mockString,
                password: mockString,
                device_name: mockString
            },
        });
        genObject.next();
        genObject.throw(errorResponse2);
    });
});

describe('Test fetch logout', () => {
    it('check fetchlogout success', () => {
        const genObject = fetchLogout();
        genObject.next();
        genObject.next();
    });

    it('check fetchlogout error', () => {
        const genObject = fetchLogout();
        genObject.next();
        genObject.throw(errorResponse);
    });

    it('check fetchlogout error', () => {
        const genObject = fetchLogout();
        genObject.next();
        genObject.throw({});
    });
});

describe('Test requestForgotPassword', () => {
    it('check requestForgotPassword success', () => {
        const genObject = requestForgotPassword({
            type:FORGOT_PASSWORD_REQUEST,
            payload:{
                email:'email@email.com'
            }
        });
        genObject.next();
        genObject.next();
    });
    it('check requestForgotPassword error', () => {
        const genObject = requestForgotPassword({
            type:FORGOT_PASSWORD_REQUEST,
            payload:{
                email:'email@email.com'
            }
        });
        genObject.next();
        genObject.throw(errorResponse);
    });

    it('check requestForgotPassword error', () => {
        const genObject = requestForgotPassword({
            type:FORGOT_PASSWORD_REQUEST,
            payload:{
                email:'email@email.com'
            }
        });
        genObject.next();
        genObject.throw({});
    });
});
