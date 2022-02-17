import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import opinionWriterSaga, {fetchOpinionWriter} from '../sagas';
import {fetchOpinionWriterSuccess} from '../action';
import {FETCH_OPINION_WRITER} from '../actionTypes';
import {fetchOpinionWriterApi} from 'src/services/opinionWriterService';
import {
  FetchOpinionWrtiterType,
  FetchOpinionWriterListSuccessPayloadType,
  WritersBodyGet,
} from '../types';
import {any} from 'prop-types';

const mockNumber = 10;

const requestObject: WritersBodyGet = {
  items_per_page: mockNumber,
};

const requestAction: FetchOpinionWrtiterType = {
  type: FETCH_OPINION_WRITER,
  payload: requestObject,
};

const reposnseObject = {
  opinionWriterListData: any,
};

const sucessResponseObject: FetchOpinionWriterListSuccessPayloadType = {
  opinionWriterListData: reposnseObject,
};

describe('test opinionWriter  saga', () => {
  it('fire on searchSaga', () => {
    testSaga(opinionWriterSaga)
      .next()
      .all([takeLatest(FETCH_OPINION_WRITER, fetchOpinionWriter)])
      .finish()
      .isDone();
  });
});

describe('Test fetchOpinionWriter success', () => {
  it('fire on FETCH_OPINION_WRITER', () => {
    testSaga(fetchOpinionWriter, requestAction)
      .next()
      .call(fetchOpinionWriterApi, requestObject)
      .next(reposnseObject)
      .put(fetchOpinionWriterSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });
});
