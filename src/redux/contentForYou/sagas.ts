import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {
  FetchFavouriteOpinionsSuccessPayloadType,
  FetchFavouriteOpinionsType,
  FetchFavouriteArticlesSuccessPayloadType,
  FetchFavouriteArticlesType,
} from './types';
import {
  fetchFavouriteOpinionsFailed,
  fetchFavouriteOpinionsSuccess,
  fetchFavouriteArticlesSuccess,
  fetchFavouriteArticlesFailed,
} from './action';
import {FETCH_FAVOURITE_OPINIONS, FETCH_FAVOURITE_ARTICLES} from './actionTypes';
import {fetchFavouriteOpinionsApi,fetchFavouriteArticleApi} from 'src/services/contentForYouService';

export function* fetchFavouriteOpinions(action: FetchFavouriteOpinionsType) {

  try {
    const payload: FetchFavouriteOpinionsSuccessPayloadType = yield call(
      fetchFavouriteOpinionsApi,
      action.payload,
    );
    yield put(fetchFavouriteOpinionsSuccess({opinionListData: payload}));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(fetchFavouriteOpinionsFailed({error: errorMessage.message}));
    }
  }
}

export function* fetchFavouriteArticles(action: FetchFavouriteArticlesType) {

  try {
    const payload: FetchFavouriteArticlesSuccessPayloadType = yield call(
      fetchFavouriteArticleApi,
      action.payload,
    );
    yield put(fetchFavouriteArticlesSuccess({favouriteArticlesData: payload}));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(fetchFavouriteArticlesFailed({articleError: errorMessage.message}));
    }
  }
}


function* contentForYouSaga() {
  yield all([takeLatest(FETCH_FAVOURITE_OPINIONS, fetchFavouriteOpinions)]);
  yield all([takeLatest(FETCH_FAVOURITE_ARTICLES, fetchFavouriteArticles)]);
}

export default contentForYouSaga;
