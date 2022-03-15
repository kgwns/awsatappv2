import {FETCH_EMAIL_CHECK} from '../actionTypes';
import {fetchEmailCheck} from '../sagas';

const mockString = 'mockString';

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};


describe('Test emailcheck  error', () => {
  it('check fetchEmailCheck failed', () => {
    const genObject = fetchEmailCheck({
      type: FETCH_EMAIL_CHECK,
      payload: {email: mockString},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});
