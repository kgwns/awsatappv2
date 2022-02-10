import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import searchSaga, {fetchSearch} from '../sagas';
import {
  fetchSearchFailed,
  fetchSearchSuccess,
} from '../action';
import {FETCH_SEARCH_REQUEST} from '../actionTypes';
import {fetchSearchApi} from 'src/services/searchService';
import {
  FetchSearchRequestType,
  FetchSearchRequestPayloadType,
  FetchSearchSuccessPayloadType,
} from '../types';

const mockString = 'mockString';

const requestObject: FetchSearchRequestPayloadType = {
  searchText: mockString,
};

const requestAction: FetchSearchRequestType = {
  type: FETCH_SEARCH_REQUEST,
  payload: requestObject,
};

const reposnseObject = {
  rows: [
    {
      nid: mockString,
      title: mockString,
    },
  ],
};

const sucessResponseObject: FetchSearchSuccessPayloadType = {
  searchData: reposnseObject
}

describe('test searchSaga  saga', () => {
  it('fire on searchSaga', () => {
    testSaga(searchSaga)
      .next()
      .all([takeLatest(FETCH_SEARCH_REQUEST, fetchSearch)])
      .finish()
      .isDone();
  });
});


describe('Test fetchSearch success', () => {
  it('fire on FETCH_SEARCH_REQUEST', () => {
    testSaga(fetchSearch, requestAction)
      .next()
      .call(fetchSearchApi, requestObject)
      .next(reposnseObject)
      .put(fetchSearchSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });
});

describe('test fetchSearch  error', () => {
  const error = new Error('error');
  it('fire on FETCH_SEARCH_REQUEST', () => {
    testSaga(fetchSearch, requestAction)
      .next()
      .call(fetchSearchApi, requestObject)
      .throw(error)
      .put(fetchSearchFailed({error: error.message}))
      .finish()
      .isDone();
  });
});
