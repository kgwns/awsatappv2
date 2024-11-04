import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {FETCH_OPINIONS, FETCH_WRITER_OPINIONS} from '../actionTypes';
import opinionsSaga, {fetchOpinionsList, fetchWriterOpinions, fetchOpinions} from '../sagas';
import {fetchOpinionsSuccess} from '../action';
import { fetchOpinionsListApi } from 'src/services/opinionsService';

import {
  FetchOpinionsType,
  FetchOpinionsSuccessPayloadType,
  OpinionsBodyGet,
} from '../types';

const mockPage = 1;
const mockString = 'mockString';

const requestObject: OpinionsBodyGet = {
  page: mockPage,
  nid: '1',
};

const requestAction: FetchOpinionsType = {
  type: FETCH_OPINIONS,
  payload: requestObject,
};

const responseObject = {
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

const successResponseObject: FetchOpinionsSuccessPayloadType = {
  opinionListData: responseObject,
};

describe('Test opinions  saga', () => {
  it('fire on opinionssaga', () => {
    testSaga(opinionsSaga)
      .next()
      .all([takeLatest(FETCH_OPINIONS, fetchOpinionsList)])
      .next()
      .all([takeLatest(FETCH_WRITER_OPINIONS, fetchWriterOpinions)])
      .finish()
      .isDone();
  });
});

describe('Test opinions success', () => {
  it('fire on FETCH_OPINIONS', () => {
    testSaga(fetchOpinionsList, requestAction)
      .next()
      .call(fetchOpinionsListApi, requestObject)
      .next(responseObject)
      .put(fetchOpinionsSuccess(successResponseObject))
      .finish()
      .isDone();
  });
});

describe('Test opinions  error', () => {
  it('check fetchOpinions failed', () => {
    const genObject = fetchOpinionsList({
      type: FETCH_OPINIONS,
      payload: {page: mockPage, nid: ''},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
  it('check fetchOpinions failed', () => {
    const genObject = fetchOpinionsList({
      type: FETCH_OPINIONS,
      payload: {page: 0, nid: ''},
    });
    genObject.next();
    genObject.throw({});
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
  it('check fetchWriterOpinions failed', () => {
    const genObject = fetchWriterOpinions({
      type: FETCH_WRITER_OPINIONS,
      payload: {
        tid: '12',
        page: mockPage
      },
    });
    genObject.next();
    genObject.throw({});
  });
});

describe('Test fetchOpinions', () => {
  it('check fetchOpinions success', () => {
    const genObject = fetchOpinions({
      type: FETCH_OPINIONS,
      payload: {
        page: 2,
        nid: '2',
      },
    });
    genObject.next();
    genObject.next();
  });

   it('check fetchOpinions failed', () => {
    const genObject = fetchOpinions({
      type: FETCH_OPINIONS,
      payload: {
        page: 2,
        nid: '2',
      },
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check fetchOpinions failed', () => {
    const genObject = fetchOpinions({
      type: FETCH_OPINIONS,
      payload: {
        page: 2,
        nid: '2',
      },
    });
    genObject.next();
    genObject.throw({});
  });
});
