import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {FETCH_MOST_READ} from '../actionTypes';
import mostReadSaga, {fetchMostRead} from '../sagas';
import {fetchMostReadSuccess} from '../action';
import {fetchMostReadApi} from 'src/services/mostReadService';

import {FetchMostReadSuccessPayloadType} from '../types';

const mockString = 'mockString';

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

const sucessResponseObject: FetchMostReadSuccessPayloadType = {
  mostReadData: reposnseObject,
};

describe('Test most Read  saga', () => {
  it('fire on mostReadSaga', () => {
    testSaga(mostReadSaga)
      .next()
      .all([takeLatest(FETCH_MOST_READ, fetchMostRead)])
      .finish()
      .isDone();
  });
});

describe('Test most read success', () => {
  xit('fire on FETCH_MOST_READ', () => {
    testSaga(fetchMostRead)
      .next()
      .call(fetchMostReadApi)
      .next(reposnseObject)
      .put(fetchMostReadSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });
});

describe('Test most read  error', () => {
  it('check fetchMostRead failed', () => {
    const genObject = fetchMostRead();
    genObject.next();
    genObject.throw(errorResponse);
  });
  it('check fetchMostRead failed', () => {
    const genObject = fetchMostRead();
    genObject.next();
    genObject.throw({});
  });
});
