import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import sectionArticlesSaga, {fetchSectionArticles} from '../sagas';
import {
  fetchSectionArticlesFailed,
  fetchSectionArticlesSuccess,
} from '../action';
import {FETCH_SECTION_ARTICLES} from '../actionTypes';
import {fetchSectionArticlesApi} from 'src/services/sectionArticlesService';
import {
  FetchSectionArticlesSuccessPayloadType,
  FetchSectionArticlesFailedPayloadtype,
} from '../types';

const mockString = 'mockString';

const reposnseObject = {
  rows: [
    {
      title: mockString,
      uuid_export: mockString,
      parent_export: mockString,
      link__options: mockString,
      title_export: mockString,
      field_sectionid_export: 11,
      field_app_key_name_export: mockString,
    },
  ],
};

const sucessResponseObject: FetchSectionArticlesSuccessPayloadType = {
    sectionArticlesData: reposnseObject,
};
const error = new Error('error');
const faildResponseObject: FetchSectionArticlesFailedPayloadtype = {
    error: error.message
}

describe('test Saga  saga', () => {
  it('fire on searchSaga', () => {
    testSaga(sectionArticlesSaga)
      .next()
      .all([takeLatest(FETCH_SECTION_ARTICLES, fetchSectionArticles)])
      .finish()
      .isDone();
  });

  xit('fire on FETCH_SECTION_ARTICLES_REQUEST', () => {
    testSaga(sectionArticlesSaga)
      .next()
      .call(fetchSectionArticlesApi)
      .next(reposnseObject)
      .put(fetchSectionArticlesSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });

  xit('test fetchSectionArticles  error', () => {
    const error = new Error('error');
    testSaga(sectionArticlesSaga)
      .next()
      .call(fetchSectionArticlesApi)
      .throw(error)
      .finish()
      .isDone();
  });

});