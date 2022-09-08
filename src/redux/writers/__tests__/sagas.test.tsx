import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {FETCH_OPINION_WRITER} from '../actionTypes';
import opinionWriterSaga, {fetchOpinionWriter} from '../sagas';
import {fetchOpinionWriterSuccess} from '../action';
import {fetchOpinionWriterApi} from 'src/services/opinionWriterService';
import {
  FetchOpinionWrtiterType,
  FetchOpinionWriterListSuccessPayloadType,
  WritersBodyGet,
} from '../types';

const mockPage = 10;
const mockString = 'mockString';

const requestObject: WritersBodyGet = {
  items_per_page: mockPage,
};

const requestAction: FetchOpinionWrtiterType = {
  type: FETCH_OPINION_WRITER,
  payload: requestObject,
};

const reposnseObject = {
  rows: [
    {
      title: mockString,
      nid: mockString,
    },
  ],
};
const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

const sucessResponseObject: FetchOpinionWriterListSuccessPayloadType = {
  opinionWriterListData: reposnseObject,
};

describe('Test opinionWriter  saga', () => {
  it('fire on opinionWriterSaga', () => {
    testSaga(opinionWriterSaga)
      .next()
      .all([takeLatest(FETCH_OPINION_WRITER, fetchOpinionWriter)])
      .finish()
      .isDone();
  });
});

describe('Test opinionWriter success', () => {
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

describe('Test opinionWriter  error', () => {
  it('check fetchOpinionWriter failed', () => {
    const genObject = fetchOpinionWriter({
      type: FETCH_OPINION_WRITER,
      payload: {items_per_page: mockPage},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});

describe('Test opinionWriter  error', () => {
  it('check fetchOpinionWriter failed', () => {
    const genObject = fetchOpinionWriter({
      type: FETCH_OPINION_WRITER,
      payload: {items_per_page: mockPage},
    });
    genObject.next();
    genObject.throw({});
  });
});
