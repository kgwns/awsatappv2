import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {FETCH_OPINIONS, FETCH_WRITER_OPINIONS} from '../actionTypes';
import opinionsSaga, {fetchOpinions, fetchWriterOpinions} from '../sagas';
import {fetchOpinionsSuccess} from '../action';
import {fetchOpinionsApi} from 'src/services/opinionsService';

import {
  FetchOpinionsType,
  FetchOpinionsSuccessPayloadType,
  OpinionsBodyGet,
} from '../types';

const mockPage = 0;
const mockString = 'mockString';

const requestObject: OpinionsBodyGet = {
  page: mockPage,
};

const requestAction: FetchOpinionsType = {
  type: FETCH_OPINIONS,
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

const sucessResponseObject: FetchOpinionsSuccessPayloadType = {
  opinionListData: reposnseObject,
};

describe('Test opinions  saga', () => {
  it('fire on opinionssaga', () => {
    testSaga(opinionsSaga)
      .next()
      .all([takeLatest(FETCH_OPINIONS, fetchOpinions)])
      .next()
      .all([takeLatest(FETCH_WRITER_OPINIONS, fetchWriterOpinions)])
      .finish()
      .isDone();
  });
});

describe('Test opinions success', () => {
  it('fire on FETCH_OPINIONS', () => {
    testSaga(fetchOpinions, requestAction)
      .next()
      .call(fetchOpinionsApi, requestObject)
      .next(reposnseObject)
      .put(fetchOpinionsSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });
});

describe('Test opinions  error', () => {
  it('check fetchOpinions failed', () => {
    const genObject = fetchOpinions({
      type: FETCH_OPINIONS,
      payload: {page: mockPage},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});

describe('Test opinions', () => {
  it('check fetchWriterOpinions success', () => {
    const genObject = fetchWriterOpinions({
      type: FETCH_WRITER_OPINIONS,
      payload: {
        tid: '12',
        page: mockPage
      },
    });
    genObject.next();
    genObject.next();
  });

   it('check fetchWriterOpinions failed', () => {
    const genObject = fetchWriterOpinions({
      type: FETCH_WRITER_OPINIONS,
      payload: {
        tid: '12',
        page: mockPage
      },
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});
