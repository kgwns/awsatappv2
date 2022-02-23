import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import registerSaga, {createUser} from '../sagas';
import {
  registerSuccess,
  registerFailed,
} from '../action';
import {REGISTER_USER} from '../actionTypes';
import {registerUser} from 'src/services/registerService';
import {
  RegisterBodyType,
  RegisterSuccessPayloadType,
  UserRegisterType,
} from '../types';

const mockString = 'mockString';

const requestObject: RegisterBodyType = {
  email: mockString,
  name: '',
  password: ''
};

const requestAction: UserRegisterType = {
  type: REGISTER_USER,
  payload: requestObject,
};

const reposnseObject = {
  userInfo:{
    user:{
      id: mockString,
      email: mockString
    },
    token:{},
    message:{}
  }
};

const sucessResponseObject: RegisterSuccessPayloadType = {
  userInfo: reposnseObject
}

describe('test registerSaga  saga', () => {
  it('fire on registerSaga', () => {
    testSaga(registerSaga)
      .next()
      .all([takeLatest(REGISTER_USER, createUser)])
      .finish()
      .isDone();
  });
});


describe('Test createUser success', () => {
  it('fire on REGISTER_USER', () => {
    testSaga(createUser, requestAction)
      .next()
      .call(registerUser, requestObject)
      .next(reposnseObject)
      .put(registerSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });
});

describe('test createUser  error', () => {
  const error = new Error('error');
  it('fire on REGISTER_USER', () => {
    testSaga(createUser, requestAction)
      .next()
      .call(registerUser, requestObject)
      .throw(error)
      .put(registerFailed({error: error.message}))
      .finish()
      .isDone();
  });
});
