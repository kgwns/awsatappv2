import {testSaga} from 'redux-saga-test-plan';
import {CHANGE_PASSWORD} from '../actionTypes';
import {postNewPassword} from '../sagas';
import {changePasswordSuccess} from '../action';
import {changePasswordApi} from 'src/services/changePasswordService';
import {
  SendNewPassword,
  SendChangePasswordType,
  SendNewPasswordSuccessPayloadType
} from '../types';

const mockPassword = '#AwsatApp01';

const requestObject: SendNewPassword = {
  password: mockPassword,
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
      payload: {password: mockPassword},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});

