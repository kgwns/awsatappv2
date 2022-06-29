import {testSaga} from 'redux-saga-test-plan';
import {FETCH_ALL_SITE_CATEGORIES, GET_SELECTED_TOPICS, SEND_SELECTED_TOPIC} from '../actionTypes';
import {fetchAllSiteCategories,getSelectedtTopics,postSelectedTopics} from '../sagas';
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
    // await waitFor(() => signupAsUser());
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check postSelectedTopics failed', () => {
    const genObject = postSelectedTopics({
      type: SEND_SELECTED_TOPIC,
      payload: {tid: '123'},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check getSelectedtTopics failed', () => {
    const genObject = getSelectedtTopics({
      type: GET_SELECTED_TOPICS,
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

});
