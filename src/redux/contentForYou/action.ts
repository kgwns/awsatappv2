import {
  FetchFavouriteOpinionsSuccessPayloadType,
  FetchFavouriteOpinionsFailedPayloadtype,
  FetchFavouriteOpinionsSuccessType,
  FetchFavouriteOpinionsFailedType,
  FavouriteOpinionsBodyGet,
  FetchFavouriteArticlesSuccessPayloadType,
  FetchFavouriteArticlesFailedPayloadtype,
  FetchFavouriteArticlesSuccessType,
  FetchFavouriteArticlesFailedType,
  FavouriteArticlesBodyGet,
} from 'src/redux/contentForYou/types';
import {
  FETCH_FAVOURITE_OPINIONS,
  FETCH_FAVOURITE_OPINIONS_ERROR,
  FETCH_FAVOURITE_OPINIONS_SUCCESS,
  FETCH_FAVOURITE_ARTICLES,
  FETCH_FAVOURITE_ARTICLES_SUCCESS ,
  FETCH_FAVOURITE_ARTICLES_ERROR ,
  EMPTY_ALL_DATA,
} from './actionTypes';

export const fetchFavouriteOpinions = (payload: FavouriteOpinionsBodyGet) => {
  return {
    type: FETCH_FAVOURITE_OPINIONS,
    payload,
  };
};

export const fetchFavouriteOpinionsSuccess = (
  payload: FetchFavouriteOpinionsSuccessPayloadType,
): FetchFavouriteOpinionsSuccessType => {
  return {
    type: FETCH_FAVOURITE_OPINIONS_SUCCESS,
    payload,
  };
};

export const fetchFavouriteOpinionsFailed = (
  payload: FetchFavouriteOpinionsFailedPayloadtype,
): FetchFavouriteOpinionsFailedType => {
  return {
    type: FETCH_FAVOURITE_OPINIONS_ERROR,
    payload,
  };
};

export const fetchFavouriteArticles = (payload: FavouriteArticlesBodyGet) => {
  return {
    type: FETCH_FAVOURITE_ARTICLES,
    payload,
  };
};

export const fetchFavouriteArticlesSuccess = (
  payload: FetchFavouriteArticlesSuccessPayloadType,
): FetchFavouriteArticlesSuccessType => {
  return {
    type: FETCH_FAVOURITE_ARTICLES_SUCCESS,
    payload,
  };
};

export const fetchFavouriteArticlesFailed = (
  payload: FetchFavouriteArticlesFailedPayloadtype,
): FetchFavouriteArticlesFailedType => {
  return {
    type: FETCH_FAVOURITE_ARTICLES_ERROR,
    payload,
  };
};

export const emptyData = () => {
  return {
    type: EMPTY_ALL_DATA,
  };
};

export const contentForYouActions = {
  fetchFavouriteOpinions,
  fetchFavouriteOpinionsSuccess,
  fetchFavouriteOpinionsFailed,
  fetchFavouriteArticles,
  fetchFavouriteArticlesSuccess,
  fetchFavouriteArticlesFailed,
  emptyData,
};
