import { takeLatest } from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import contactUsSaga, { sendContactUsInfo } from '../sagas';
import { SEND_CONTACT_US_INFO } from '../actionType';

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' },
};

describe('Test contactUsSaga  saga', () => {
    it('fire on contactUsSaga', () => {
      testSaga(contactUsSaga)
        .next()
        .all([takeLatest(SEND_CONTACT_US_INFO, sendContactUsInfo)])
        .finish()
        .isDone();
    });
});

describe('Test contactUs  error', () => {
    it('check sendContactUsInfo', () => {
        const genObject = sendContactUsInfo({
            type: SEND_CONTACT_US_INFO,
            payload: { name: 'abc', email: 'abc@gmail.com', msg: 'example' },
        });
        genObject.next();
        genObject.next();
    });

    it('check sendContactUsInfo failed', () => {
        const genObject = sendContactUsInfo({
            type: SEND_CONTACT_US_INFO,
            payload: { name: 'abc', email: 'abc@gmail.com', msg: 'example' },
        });
        genObject.next();
        genObject.throw(errorResponse);
    });
});