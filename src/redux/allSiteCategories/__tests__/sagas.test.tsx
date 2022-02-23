import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {FETCH_ALL_SITE_CATEGORIES} from '../actionTypes';
import allSiteCategoriesSaga, {fetchAllSiteCategories} from '../sagas';
import {fetchAllSiteCategoriesSuccess} from '../action';
import {fetchAllSiteCategoriesApi} from 'src/services/allSiteCategoriesService';

import {
  FetchAllSiteCategoriesType,
  FetchAllSiteCategoriesListSuccessPayloadType,
  AllSiteCategoriesBodyGet,
} from '../types';

const mockItems = 10;
const mockString = 'mockString';

const requestObject: AllSiteCategoriesBodyGet = {
  items_per_page: mockItems,
};

const requestAction: FetchAllSiteCategoriesType = {
  type: FETCH_ALL_SITE_CATEGORIES,
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

const sucessResponseObject: FetchAllSiteCategoriesListSuccessPayloadType = {
  allSiteCategoriesListData: reposnseObject,
};

describe('Test allSiteCategories  saga', () => {
  it('fire on allSiteCategoriesSaga', () => {
    testSaga(allSiteCategoriesSaga)
      .next()
      .all([takeLatest(FETCH_ALL_SITE_CATEGORIES, fetchAllSiteCategories)])
      .finish()
      .isDone();
  });
});

describe('Test allSiteCategories success', () => {
  it('fire on FETCH_ALL_SITE_CATEGORIES', () => {
    testSaga(fetchAllSiteCategories, requestAction)
      .next()
      .call(fetchAllSiteCategoriesApi, requestObject)
      .next(reposnseObject)
      .put(fetchAllSiteCategoriesSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });
});

describe('Test allSiteCategories  error', () => {
  it('check fetchAllSiteCategories failed', () => {
    const genObject = fetchAllSiteCategories({
      type: FETCH_ALL_SITE_CATEGORIES,
      payload: {items_per_page: mockItems},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});
