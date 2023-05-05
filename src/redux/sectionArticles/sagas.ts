import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {
  FetchSectionArticlesSuccessPayloadType,
  FetchSectionArticlesType,
} from './types';
import {
  fetchSectionArticlesFailed,
  fetchSectionArticlesSuccess,
} from './action';
import {FETCH_SECTION_ARTICLES} from './actionTypes';
import {fetchSectionArticlesApi} from 'src/services/sectionArticlesService';

export function* fetchSectionArticles(action: FetchSectionArticlesType) {

  try {
    const payload: FetchSectionArticlesSuccessPayloadType = yield call(
      fetchSectionArticlesApi,
      action.payload,
    );
    yield put(fetchSectionArticlesSuccess({sectionArticlesData: payload}));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(fetchSectionArticlesFailed({error: errorMessage.message}));
    }
  }
}

function* sectionArticlesSaga() {
  yield all([takeLatest(FETCH_SECTION_ARTICLES, fetchSectionArticles)]);
}

export default sectionArticlesSaga;
