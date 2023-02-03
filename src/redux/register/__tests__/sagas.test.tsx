import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import registerSaga, {createUser} from '../sagas';
import {REGISTER_USER} from '../actionTypes';

const mockString = 'mockString';

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

const errorResponse1 = {
    request: { data: 'Error', status: 500, statusText: 'Error' },
    message: 'Error'
};

const errorResponse2 = {
    message: 'Error'
};;

describe('test registerSaga  saga', () => {
  it('fire on registerSaga', () => {
    testSaga(registerSaga)
      .next()
      .all([takeLatest(REGISTER_USER, createUser)])
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
    genObject.throw(errorResponse1);
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
    genObject.throw(errorResponse2);
  });
});
