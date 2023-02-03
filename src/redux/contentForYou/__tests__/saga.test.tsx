import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {FETCH_FAVOURITE_OPINIONS, FETCH_FAVOURITE_ARTICLES, EMPTY_ALL_DATA} from '../actionTypes';
import contentForYouSaga, {fetchFavouriteOpinions, fetchFavouriteArticles} from '../sagas';
import {fetchFavouriteOpinionsSuccess, fetchFavouriteArticlesSuccess} from '../action';
import {fetchFavouriteOpinionsApi, fetchFavouriteArticleApi} from 'src/services/contentForYouService';

import {
  FetchFavouriteOpinionsType,
  FetchFavouriteOpinionsSuccessPayloadType,
  FavouriteOpinionsBodyGet,
  FetchFavouriteArticlesType,
  FetchFavouriteArticlesSuccessPayloadType,
} from '../types';

const mockPage = 0;
const mockString = 'mockString';

const requestObject: FavouriteOpinionsBodyGet = {
  page: mockPage,
};

const requestAction: FetchFavouriteOpinionsType = {
  type: FETCH_FAVOURITE_OPINIONS,
  payload: requestObject,
};

const requestArticleAction: FetchFavouriteArticlesType = {
  type: FETCH_FAVOURITE_ARTICLES,
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

const sucessResponseObject: FetchFavouriteOpinionsSuccessPayloadType = {
  opinionListData: reposnseObject,
};

const sucessArticlesObject: FetchFavouriteArticlesSuccessPayloadType = {
  favouriteArticlesData: reposnseObject,
};

describe('Test contentForYou  saga', () => {
  it('fire on contentForYouSaga', () => {
    testSaga(contentForYouSaga)
      .next()
      .all([takeLatest(FETCH_FAVOURITE_OPINIONS, fetchFavouriteOpinions)])
      .next()
      .all([takeLatest(FETCH_FAVOURITE_ARTICLES, fetchFavouriteArticles)])
      .finish()
      .isDone();
  });
});

describe('Test opinions success', () => {
  it('fire on FETCH_OPINIONS', () => {
    testSaga(fetchFavouriteOpinions, requestAction)
      .next()
      .call(fetchFavouriteOpinionsApi, requestObject)
      .next(reposnseObject)
      .put(fetchFavouriteOpinionsSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });
});

describe('Test opinions  error', () => {
  it('check fetchOpinions failed', () => {
    const genObject = fetchFavouriteOpinions({
      type: FETCH_FAVOURITE_OPINIONS,
      payload: {page: mockPage},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
  it('check fetchOpinions failed', () => {
    const genObject = fetchFavouriteOpinions({
      type: FETCH_FAVOURITE_OPINIONS,
      payload: {page: mockPage},
    });
    genObject.next();
    genObject.throw({});
  });
});

describe('Test Articles success', () => {
  it('fire on FETCH_ARTICLES', () => {
    testSaga(fetchFavouriteArticles, requestArticleAction)
      .next()
      .call(fetchFavouriteArticleApi, requestObject)
      .next(reposnseObject)
      .put(fetchFavouriteArticlesSuccess(sucessArticlesObject))
      .finish()
      .isDone();
  });
});

describe('Test Articles  error', () => {
  it('check fetchArticles failed', () => {
    const genObject = fetchFavouriteArticles({
      type: FETCH_FAVOURITE_ARTICLES,
      payload: {page: mockPage},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
  it('check fetchArticles failed', () => {
    const genObject = fetchFavouriteArticles({
      type: FETCH_FAVOURITE_ARTICLES,
      payload: {page: mockPage},
    });
    genObject.next();
    genObject.throw({});
  });
});
