import {
  FetchSectionArticlesSuccessPayloadType,
  FetchSectionArticlesFailedPayloadtype,
  FetchSectionArticlesSuccessType,
  FetchSectionArticlesFailedType,
  SectionArticlesBodyGet,
} from './types';
import {
  FETCH_SECTION_ARTICLES,
  FETCH_SECTION_ARTICLES_SUCCESS,
  FETCH_SECTION_ARTICLES_ERROR,
  EMPTY_SECTION_ARTICLES,
} from './actionTypes';

export const fetchSectionArticles = (payload: SectionArticlesBodyGet) => {
  return {
    type: FETCH_SECTION_ARTICLES,
    payload,
  };
};

export const fetchSectionArticlesSuccess = (
  payload: FetchSectionArticlesSuccessPayloadType,
): FetchSectionArticlesSuccessType => {
  return {
    type: FETCH_SECTION_ARTICLES_SUCCESS,
    payload,
  };
};

export const fetchSectionArticlesFailed = (
  payload: FetchSectionArticlesFailedPayloadtype,
): FetchSectionArticlesFailedType => {
  return {
    type: FETCH_SECTION_ARTICLES_ERROR,
    payload,
  };
};

export const emptySectionArticlesData = () => {
  return {
    type: EMPTY_SECTION_ARTICLES,
  };
};

export const sectionArticlesAction = {
  fetchSectionArticles,
  fetchSectionArticlesSuccess,
  fetchSectionArticlesFailed,
  emptySectionArticlesData
};
