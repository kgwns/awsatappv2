import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import sectionArticlesSaga, {fetchSectionArticles} from '../sagas';
import {FETCH_SECTION_ARTICLES} from '../actionTypes';

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

describe('test sectionArticlesSaga  saga', () => {
  it('fire on sectionArticlesSaga', () => {
    testSaga(sectionArticlesSaga)
      .next()
      .all([takeLatest(FETCH_SECTION_ARTICLES, fetchSectionArticles)])
      .finish()
      .isDone();
  });
});

describe('Test fetchSectionArticles', () => {
  it('check fetchSectionArticles success', () => {
    const genObject = fetchSectionArticles({
      type: FETCH_SECTION_ARTICLES,
      payload: {
        sectionId: '12',
        page: 1,
      },
    });
    genObject.next();
    genObject.next();
  });

   it('check fetchSectionArticles failed', () => {
    const genObject = fetchSectionArticles({
      type: FETCH_SECTION_ARTICLES,
      payload: {
        sectionId: '12',
        page: 1,
      },
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check fetchSectionArticles failed', () => {
    const genObject = fetchSectionArticles({
      type: FETCH_SECTION_ARTICLES,
      payload: {
        sectionId: '12',
        page: 1,
      },
    });
    genObject.next();
    genObject.throw({});
  });
});

