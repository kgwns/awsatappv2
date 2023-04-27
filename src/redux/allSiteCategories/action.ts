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
  SendSelectedTopicSuccessType,
  GetSelectedTopicsSuccessPayloadType,
  GetSelectedTopicsFailedPayloadtype,
  GetSelectedTopicsSuccessType,
  GetSelectedTopicsFailedType,
} from 'src/redux/allSiteCategories/types';
import {
  FETCH_ALL_SITE_CATEGORIES,
  FETCH_ALL_SITE_CATEGORIES_SUCCESS,
  FETCH_ALL_SITE_CATEGORIES_ERROR,
  SEND_SELECTED_TOPIC,
  SEND_SELECTED_TOPIC_ERROR,
  SEND_SELECTED_TOPIC_SUCCESS,
  GET_SELECTED_TOPICS,
  GET_SELECTED_TOPICS_SUCCESS,
  GET_SELECTED_TOPICS_ERROR,
  EMPTY_SELECTED_TOPICS_INFO,
  EMPTY_SEND_TOPICS_INFO,
  DESELECT_ALL_TOPICS_INFO,
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

export const getSelectedTopics = () => {
  return {
    type: GET_SELECTED_TOPICS,
  };
};

export const getSelectedTopicsSuccess = (
  payload: GetSelectedTopicsSuccessPayloadType,
): GetSelectedTopicsSuccessType => {
  return {
    type: GET_SELECTED_TOPICS_SUCCESS,
    payload,
  };
};

export const getSelectedTopicsFailed = (
  payload: GetSelectedTopicsFailedPayloadtype,
): GetSelectedTopicsFailedType => {
  return {
    type: GET_SELECTED_TOPICS_ERROR,
    payload,
  };
};

export const emptySelectedTopicsInfo = () => {
  return {
    type: EMPTY_SELECTED_TOPICS_INFO,
  };
};

export const emptySendTopicsInfo = () => {
  return {
    type: EMPTY_SEND_TOPICS_INFO
  };
}

export const deselectAllTopicsInfo = (deselectPayload:string[]) => {
  return {
    type: DESELECT_ALL_TOPICS_INFO,
    payload: deselectPayload
  };
}

export const allSiteCategoriesActions = {
  fetchAllSiteCategories,
  fetchAllSiteCategoriesSuccess,
  fetchAllSiteCategoriesFailed,
  sendSelectedTopic,
  sendSelectedTopicSuccess,
  sendSelectedTopicFailed,
  getSelectedTopics,
  getSelectedTopicsSuccess,
  getSelectedTopicsFailed,
  emptySelectedTopicsInfo,
  emptySendTopicsInfo,
  deselectAllTopicsInfo
};
