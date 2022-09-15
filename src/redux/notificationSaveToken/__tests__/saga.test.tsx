import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {SAVE_TOKEN_REQUEST, SAVE_TOKEN_AFTER_REGISTRATION_REQUEST} from '../actionType';
import SaveTokenSaga, {saveFCMtoken, saveFCMtokenAfterRegistration} from '../sagas';

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

describe('Test SaveTokenSaga  saga', () => {
  it('fire on SaveTokenSaga', () => {
    testSaga(SaveTokenSaga)
      .next()
      .all([
        takeLatest(SAVE_TOKEN_REQUEST, saveFCMtoken),
        takeLatest(SAVE_TOKEN_AFTER_REGISTRATION_REQUEST, saveFCMtokenAfterRegistration)
      ])
      .finish()
      .isDone();
  });
});

describe('Test SaveToken', () => {
  it('check SaveToken success', () => {
    const genObject = saveFCMtoken({
        type: SAVE_TOKEN_REQUEST,
        payload: {
          fcm_token: 'string',
          platform: 'string',
          device_name: 'string'
      }
    });
    genObject.next();
    genObject.next();
  });

  it('check SaveToken failed', () => {
    const genObject = saveFCMtoken({
        type: SAVE_TOKEN_REQUEST,
        payload: {
          fcm_token: 'string',
          platform: 'string',
          device_name: 'string'
      }
    })
    genObject.next()
    genObject.throw(errorResponse)
  })

  it('check SaveToken failed', () => {
    const genObject = saveFCMtoken({
        type: SAVE_TOKEN_REQUEST,
        payload: {
          fcm_token: 'string',
          platform: 'string',
          device_name: 'string'
      }
    })
    genObject.next()
    genObject.throw({})
  })
});

describe('Test save token After Registration', () => {
  it('check saveFCMtokenAfterRegistration success', () => {
    const genObject = saveFCMtokenAfterRegistration({
        type: SAVE_TOKEN_AFTER_REGISTRATION_REQUEST,
        payload: {
          id: 'string',
          uid: 2,
      }
    });
    genObject.next();
    genObject.next();
  });

  it('check saveFCMtokenAfterRegistration failed', () => {
    const genObject = saveFCMtokenAfterRegistration({
        type: SAVE_TOKEN_AFTER_REGISTRATION_REQUEST,
        payload: {
          id: 'string',
          uid: 2,
        }
    })
    genObject.next()
    genObject.throw(errorResponse)
  })

  it('check saveFCMtokenAfterRegistration failed', () => {
    const genObject = saveFCMtokenAfterRegistration({
        type: SAVE_TOKEN_AFTER_REGISTRATION_REQUEST,
        payload: {
          id: 'string',
          uid: 2,
        }
    })
    genObject.next()
    genObject.throw({})
  })
});

