import {testSaga} from 'redux-saga-test-plan';
import {CHANGE_PASSWORD} from '../actionTypes';
import newPasswordSaga, {postNewPassword} from '../sagas';
import {changePasswordSuccess} from '../action';
import {changePasswordApi} from 'src/services/changePasswordService';
import {
  SendNewPassword,
  SendChangePasswordType,
  SendNewPasswordSuccessPayloadType
} from '../types';
import { takeLatest } from 'redux-saga/effects';

const mockPassword = '#AwsatApp01';

const requestObject: SendNewPassword = {
  password: mockPassword,
  old_password: ''
};

const requestAction: SendChangePasswordType = {
  type: CHANGE_PASSWORD,
  payload: requestObject,
};

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

const sucessResponseObject: SendNewPasswordSuccessPayloadType = {
  message: {},
};

describe('<Change Password Saga>', () => {
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    })
  });
  
  describe('Test newPasswordSaga  saga', () => {
    it('fire on newPasswordSaga', () => {
      testSaga(newPasswordSaga)
        .next()
        .all([takeLatest(CHANGE_PASSWORD, postNewPassword)])
        .finish()
        .isDone();
    });
  });

  describe('Test changePassword success', () => {
    it('fire on CHANGE_PASSWORD', () => {
      testSaga(postNewPassword, requestAction)
        .next()
        .call(changePasswordApi, requestObject)
        .next({})
        .put(changePasswordSuccess(sucessResponseObject))
        .finish()
        .isDone();
    });
  });

  describe('Test change password error', () => {
    it('check post new password failed', () => {
      const genObject = postNewPassword({
        type: CHANGE_PASSWORD,
        payload: {password: mockPassword,
          old_password: mockPassword},
      });
      genObject.next();
      genObject.throw(errorResponse);
    });
    it('check post new password failed', () => {
      const genObject = postNewPassword({
        type: CHANGE_PASSWORD,
        payload: {password: mockPassword,
          old_password: mockPassword},
      });
      genObject.next();
      genObject.throw({});
    });
  });

});

