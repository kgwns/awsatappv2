import { FETCH_LOGIN } from '../actionTypes';
import { fetchLogin, fetchLogout } from '../sagas';

const mockString = 'mockString';

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' },
};

describe('Test fetch login  error', () => {
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
});

describe('Test fetch logout  error', () => {
    it('check fetchlogout error', () => {
        const genObject = fetchLogout();
        genObject.next();
        genObject.throw(errorResponse);
    });
});
