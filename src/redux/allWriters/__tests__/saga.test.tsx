import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import { FETCH_ALL_SELECTED_WRITERS_DETAILS, FETCH_ALL_WRITERS, GET_SELECTED_AUTHOR, REMOVE_AUTHOR, SEND_SELECTED_AUTHOR} from '../actionTypes';
import allWritersSaga, { fetchAllSelectedWritersDetailsData, fetchAllWriters, getSelectedtAuthors, postSelectedWriters, removeSelectedWriters} from '../sagas';
import {fetchAllWritersSuccess} from '../action';
import {fetchAllWritersApi} from 'src/services/allWritersService';

import {
  FetchAllWritersType,
  FetchAllWritersListSuccessPayloadType,
  AllWritersBodyGet,
  RemoveAuthorBody,
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

const requestRemoveObject: RemoveAuthorBody = {
  tid: '12'
};

describe('Test allWritersSaga  saga', () => {
  it('fire on allWritersSaga', () => {
    testSaga(allWritersSaga)
      .next()
      .all([takeLatest(FETCH_ALL_WRITERS, fetchAllWriters)])
      .next()
      .all([takeLatest(SEND_SELECTED_AUTHOR, postSelectedWriters)])
      .next()
      .all([takeLatest(GET_SELECTED_AUTHOR, getSelectedtAuthors)])
      .next()
      .all([takeLatest(REMOVE_AUTHOR, removeSelectedWriters)])
      .next()
      .all([takeLatest(FETCH_ALL_SELECTED_WRITERS_DETAILS, fetchAllSelectedWritersDetailsData)])
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

describe('Test allWriter', () => {
  it('check fetchAllWriters failed', () => {
    const genObject = fetchAllWriters({
      type: FETCH_ALL_WRITERS,
      payload: {items_per_page: mockItems},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check fetchAllWriters failed', () => {
    const genObject = fetchAllWriters({
      type: FETCH_ALL_WRITERS,
      payload: {items_per_page: mockItems},
    });
    genObject.next();
    genObject.throw({});
  });

  it('check postSelectedWriters failed', () => {
    const genObject = postSelectedWriters({
      type: SEND_SELECTED_AUTHOR,
      payload: {tid: '123',
      isList: true},
    });
    genObject.next({message: ''});
    genObject.next({message: ''});
  });

  it('check postSelectedWriters failed', () => {
    const genObject = postSelectedWriters({
      type: SEND_SELECTED_AUTHOR,
      payload: {tid: '123',
      isList: true},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check postSelectedWriters failed', () => {
    const genObject = postSelectedWriters({
      type: SEND_SELECTED_AUTHOR,
      payload: {tid: '123',
      isList: true},
    });
    genObject.next();
    genObject.throw({});
  });

  it('check getSelectedtAuthors failed', () => {
    const genObject = getSelectedtAuthors({
      type: GET_SELECTED_AUTHOR,
    });
    genObject.next({selectedAuthorsData: []});
    genObject.next({selectedAuthorsData: []});
  });

  it('check getSelectedtAuthors failed', () => {
    const genObject = getSelectedtAuthors({
      type: GET_SELECTED_AUTHOR,
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check getSelectedtAuthors failed', () => {
    const genObject = getSelectedtAuthors({
      type: GET_SELECTED_AUTHOR,
    });
    genObject.next();
    genObject.throw({});
  });
  
  describe('Test removeSelectedWriters', () => {
    it('check removeSelectedWriters failed', () => {
      const genObject = removeSelectedWriters({
        type: REMOVE_AUTHOR,
        payload: requestRemoveObject,
      });
      genObject.next({message: ''});
      genObject.next({message: ''});
    });

    it('check removeSelectedWriters failed', () => {
      const genObject = removeSelectedWriters({
        type: REMOVE_AUTHOR,
        payload: requestRemoveObject,
      });
      genObject.next();
      genObject.throw(errorResponse);
    });

    it('check removeSelectedWriters failed', () => {
      const genObject = removeSelectedWriters({
        type: REMOVE_AUTHOR,
        payload: requestRemoveObject,
      });
      genObject.next();
      genObject.throw({});
    });
  });

  describe('Test fetchAllSelectedWritersDetailsData', () => {

    it('check fetchAllSelectedWritersDetailsData success', () => {
      const genObject = fetchAllSelectedWritersDetailsData({
          type: FETCH_ALL_SELECTED_WRITERS_DETAILS,
          payload: {
              tid: '12',
              items_per_page:10,
          }
      })
      genObject.next({allSelectedWritersDetails: {}})
      genObject.next({allSelectedWritersDetails: {}})
  })

    it('check fetchAllSelectedWritersDetailsData failed', () => {
      const genObject = fetchAllSelectedWritersDetailsData({
        type: FETCH_ALL_SELECTED_WRITERS_DETAILS,
        payload: {
          tid: '2',
          items_per_page: 2,
        },
      });
      genObject.next();
      genObject.throw(errorResponse);
    });

    it('check fetchAllSelectedWritersDetailsData failed', () => {
      const genObject = fetchAllSelectedWritersDetailsData({
        type: FETCH_ALL_SELECTED_WRITERS_DETAILS,
        payload: {
          tid: '2',
          items_per_page: 2,
        },
      });
      genObject.next();
      genObject.throw({});
    });

  });
});
