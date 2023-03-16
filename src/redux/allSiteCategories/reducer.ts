import { isNonEmptyArray } from 'src/shared/utils';
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
} from './actionTypes';
import { AllSiteCategoriesActions, AllSiteCategoriesState } from './types';

const initialState: AllSiteCategoriesState = {
  allSiteCategoriesData: [],
  error: '',
  isLoading: false,
  sendTopicInfo: {},
  selectedTopicsData: {},
};

export default (state = initialState, action: AllSiteCategoriesActions) => {
  const deselectAllSelectedData = (data: any, selectedData: string[]) => {
    if (isNonEmptyArray(data.rows)) {
      for (let i = 0; i < data.rows.length; i++) {
        data.rows[i].isSelected = selectedData.includes(data.rows[i].tid);
      }
    }
    return data;
  };
  switch (action.type) {
    case FETCH_ALL_SITE_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allSiteCategoriesData: action.payload.allSiteCategoriesListData,
        error: '',
      };
    case FETCH_ALL_SITE_CATEGORIES_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_ALL_SITE_CATEGORIES:
      return { ...state, isLoading: true, error: '' };
    case SEND_SELECTED_TOPIC:
      return { ...state, isLoading: true };
    case SEND_SELECTED_TOPIC_SUCCESS:
      return { ...state, isLoading: false, sendTopicInfo: action.payload.saveData };
    case SEND_SELECTED_TOPIC_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    case GET_SELECTED_TOPICS:
      return { ...state, isLoading: true }
    case GET_SELECTED_TOPICS_SUCCESS:
      return { ...state, isLoading: false, selectedTopicsData: action.payload.selectedTopicsData,  error: '', }
    case GET_SELECTED_TOPICS_ERROR:
      return { ...state, isLoading: false, error: action.payload.error }
    case EMPTY_SELECTED_TOPICS_INFO:
      return {...state, isLoading: false, sendTopicInfo:{},error:'',selectedTopicsData: {}}
    case EMPTY_SEND_TOPICS_INFO:
      return {...state, sendTopicInfo:{} }
    case DESELECT_ALL_TOPICS_INFO:
      return {...state, allSiteCategoriesData: deselectAllSelectedData(state.allSiteCategoriesData, action.payload)}
    default:
      return { ...state };
  }
};
