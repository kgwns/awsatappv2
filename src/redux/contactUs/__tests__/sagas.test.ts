
import contactUsSaga, {
  sendContactUsInfo,
} from '../sagas';
import {
  SEND_CONTACT_US_INFO,
} from '../actionType';
import {
  SendContactUsInfoPayload,
  ContactUsInfoSuccessPayload,
} from '../types';
import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

const errorResponse = {
  response: { data: 'Error', status: 500, statusText: 'Error' },
};

const payload: SendContactUsInfoPayload = {
  name: 'testName',
  email: 'test@test.com',
  msg: 'test message'
}

const successResponse: ContactUsInfoSuccessPayload = {
  code: 200,
  message: 'success',
}

describe('Test sendContactUsInfo  saga', () => {
  it('fire on sendContactUsInfoSaga', () => {
    testSaga(contactUsSaga)
      .next()
      .all([
        takeLatest(SEND_CONTACT_US_INFO, sendContactUsInfo),
      ])
      .finish()
      .isDone();
  });
});

describe('Test contact us response  error', () => {

  it('check sendContactUsInfo success', () => {
    const genObject = sendContactUsInfo({
      type: SEND_CONTACT_US_INFO,
      payload: payload,
    })
    genObject.next({ message: successResponse })
    genObject.next({ message: successResponse })
  })


  it('check sendContactUsInfo success', () => {
    const genObject = sendContactUsInfo({
      type: SEND_CONTACT_US_INFO,
      payload: payload,
    })
    genObject.next({})
    genObject.next({})
  })

  it('check sendBookMarkId failed', () => {
    const genObject = sendContactUsInfo({
      type: SEND_CONTACT_US_INFO,
      payload: payload,
    });
    genObject.next({ message: successResponse });
    genObject.throw(errorResponse);
  });

  it('check sendBookMarkId failed', () => {
    const genObject = sendContactUsInfo({
      type: SEND_CONTACT_US_INFO,
      payload: payload,
    });
    genObject.next({ message: successResponse });
    genObject.throw({});
  });
});
