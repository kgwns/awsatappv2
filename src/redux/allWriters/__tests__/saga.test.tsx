import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {FETCH_ALL_WRITERS} from '../actionTypes';
import allWritersSaga, {fetchAllWriters} from '../sagas';
import {fetchAllWritersSuccess} from '../action';
import {fetchAllWritersApi} from 'src/services/allWritersService';

import {
  FetchAllWritersType,
  FetchAllWritersListSuccessPayloadType,
  AllWritersBodyGet,
} from '../types';

const mockItems = 10;
const mockString = 'mockString';

const requestObject: AllWritersBodyGet = {
  items_per_page: mockItems,
};

const requestAction: FetchAllWritersType = {
  type: FETCH_ALL_WRITERS,
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

const sucessResponseObject: FetchAllWritersListSuccessPayloadType = {
  allWritersListData: reposnseObject,
};

describe('Test allWritersSaga  saga', () => {
  it('fire on allWritersSaga', async() => {
    testSaga(allWritersSaga)
      .next()
      .all([takeLatest(FETCH_ALL_WRITERS, fetchAllWriters)])
      .finish()
      .isDone();
  });
});

describe('Test allWriter success', () => {
  it('fire on FETCH_ALL_WRITERS', () => {
    testSaga(fetchAllWriters, requestAction)
      .next()
      .call(fetchAllWritersApi, requestObject)
      .next(reposnseObject)
      .put(fetchAllWritersSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });
});

describe('Test allWriter  error', () => {
  it('check fetchAllWriters failed', () => {
    const genObject = fetchAllWriters({
      type: FETCH_ALL_WRITERS,
      payload: {items_per_page: mockItems},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});
