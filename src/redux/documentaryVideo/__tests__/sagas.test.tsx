import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {FETCH_DOCUMENTARY_VIDEO} from '../actionTypes';
import documentaryVideoSaga, {fetchVideoDocumentary} from '../sagas';
import {fetchDocumentaryVideoSuccess} from '../action';
import {fetchDocumentaryVideo} from 'src/services/videoDocumentaryService';

import {
  FetchDocumentaryVideoType,
  FetchDocumentaryVideoSuccessPayloadType,
  RequestDocumentaryVideoPayload,
} from '../types';

const mockPage = 1;
const mockString = 'mockString';

const requestObject: RequestDocumentaryVideoPayload = {
  page: mockPage,
  items_per_page: mockPage,
};

const requestAction: FetchDocumentaryVideoType = {
  type: FETCH_DOCUMENTARY_VIDEO,
  payload: requestObject,
};

const reposnseObject = {
  rows: [],
};

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

const sucessResponseObject: FetchDocumentaryVideoSuccessPayloadType = {
  videoDocumentaryData: reposnseObject.rows,
};

describe('Test documentaryVideo  saga', () => {
  it('fire on documentaryVideoSaga', () => {
    testSaga(documentaryVideoSaga)
      .next()
      .all([takeLatest(FETCH_DOCUMENTARY_VIDEO, fetchVideoDocumentary)])
      .finish()
      .isDone();
  });
});

describe('Test documentaryVideo success', () => {
  it('fire on FETCH_DOCUMENTARY_VIDEO', () => {
    testSaga(fetchVideoDocumentary, requestAction)
      .next()
      .call(fetchDocumentaryVideo, requestObject)
      .next(reposnseObject)
      .put(fetchDocumentaryVideoSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });
  it('check SaveToken success', () => {
    const genObject = fetchVideoDocumentary({
      type: FETCH_DOCUMENTARY_VIDEO,
      payload: requestObject,
    });
    genObject.next();
    genObject.next();
  });
  it('check SaveToken success', () => {
    const genObject = fetchVideoDocumentary({
      type: FETCH_DOCUMENTARY_VIDEO,
      payload: requestObject,
    });
    genObject.next({rows: [
      {
        title: 'mockString',
        nid: 'mockString',
      },
    ],});
    genObject.next({rows: [
      {
        title: 'mockString',
        nid: 'mockString',
      },
    ],});
  });
});

describe('Test documentaryVideo  error', () => {
  it('check fetchOpinions failed', () => {
    const genObject = fetchVideoDocumentary({
      type: FETCH_DOCUMENTARY_VIDEO,
      payload: {page: mockPage, items_per_page: mockPage},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});
