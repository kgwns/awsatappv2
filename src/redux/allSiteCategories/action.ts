import {
  FetchAllSiteCategoriesListSuccessPayloadType,
  FetchAllSiteCategoriesListFailedPayloadtype,
  FetchAllSiteCategoriesSuccessType,
  FetchAllSiteCategoriesFailedType,
  AllSiteCategoriesBodyGet,
  SendSelectedTopicBody,
  SendSelectedTopicSuccessPayloadType,
  SendSelectedTopicFailedPayloadtype,
  SendSelectedTopicFailedType,
  SendSelectedTopicSuccessType
} from 'src/redux/allSiteCategories/types';
import {
  FETCH_ALL_SITE_CATEGORIES,
  FETCH_ALL_SITE_CATEGORIES_SUCCESS,
  FETCH_ALL_SITE_CATEGORIES_ERROR,
  SEND_SELECTED_TOPIC,
  SEND_SELECTED_TOPIC_ERROR,
  SEND_SELECTED_TOPIC_SUCCESS
} from 'src/redux/allSiteCategories/actionTypes';

export const fetchAllSiteCategories = (payload: AllSiteCategoriesBodyGet) => {
  return {
    type: FETCH_ALL_SITE_CATEGORIES,
    payload,
  };
};

export const fetchAllSiteCategoriesSuccess = (
  payload: FetchAllSiteCategoriesListSuccessPayloadType,
): FetchAllSiteCategoriesSuccessType => {
  return {
    type: FETCH_ALL_SITE_CATEGORIES_SUCCESS,
    payload,
  };
};

export const fetchAllSiteCategoriesFailed = (
  payload: FetchAllSiteCategoriesListFailedPayloadtype,
): FetchAllSiteCategoriesFailedType => {
  return {
    type: FETCH_ALL_SITE_CATEGORIES_ERROR,
    payload,
  };
};

export const sendSelectedTopic = (payload: SendSelectedTopicBody) => {
  return {
    type: SEND_SELECTED_TOPIC,
    payload,
  };
};

export const sendSelectedTopicSuccess = (
  payload: SendSelectedTopicSuccessPayloadType,
): SendSelectedTopicSuccessType => {
  return {
    type: SEND_SELECTED_TOPIC_SUCCESS,
    payload,
  };
};

export const sendSelectedTopicFailed = (
  payload: SendSelectedTopicFailedPayloadtype,
): SendSelectedTopicFailedType => {
  return {
    type: SEND_SELECTED_TOPIC_ERROR,
    payload,
  };
};

export const allSiteCategoriesActions = {
  fetchAllSiteCategories,
  fetchAllSiteCategoriesSuccess,
  fetchAllSiteCategoriesFailed,
  sendSelectedTopic,
  sendSelectedTopicSuccess,
  sendSelectedTopicFailed
};