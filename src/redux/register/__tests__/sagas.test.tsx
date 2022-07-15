import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import registerSaga, {createUser, emptyUserInfo} from '../sagas';
import {REGISTER_USER, EMPTY_USER_INFO} from '../actionTypes';

const mockString = 'mockString';

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

describe('test registerSaga  saga', () => {
  it('fire on registerSaga', () => {
    testSaga(registerSaga)
      .next()
      .all([takeLatest(REGISTER_USER, createUser)])
      .next()
      .all([takeLatest(EMPTY_USER_INFO, emptyUserInfo)])
      .finish()
      .isDone();
  });
});

describe('Test createUser', () => {
  it('check createUser success', () => {
    const genObject = createUser({
      type: REGISTER_USER,
      payload: {
        device_name: mockString,
        email: mockString,
        name: '',
        password: ''
      },
    });
    genObject.next();
    genObject.next();
  });

   it('check createUser failed', () => {
    const genObject = createUser({
      type: REGISTER_USER,
      payload: {
        device_name: mockString,
        email: mockString,
        name: '',
        password: ''
      },
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});

describe('Test emptyUserInfo', () => {
  it('check emptyUserInfo success', () => {
    const genObject = emptyUserInfo();
    genObject.next();
    genObject.next();
  });
});