import {
  FETCH_ALL_WRITERS,
  FETCH_ALL_WRITERS_SUCCESS,
  FETCH_ALL_WRITERS_ERROR,
  SEND_SELECTED_AUTHOR_SUCCESS,
  SEND_SELECTED_AUTHOR,
  SEND_SELECTED_AUTHOR_ERROR,
  GET_SELECTED_AUTHOR,
  GET_SELECTED_AUTHOR_SUCCESS,
  GET_SELECTED_AUTHOR_ERROR,
  EMPTY_SELECTED_AUTHORS_INFO,
} from './actionTypes';
import { AllWritersActions, AllWritersState } from './types';

const initialState: AllWritersState = {
  allWritersData: [],
  error: '',
  isLoading: false,
  sendAuthorInfo: {},
  selectedAuthorsData:{},
};

export default (state = initialState, action: AllWritersActions) => {
  switch (action.type) {
    case FETCH_ALL_WRITERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allWritersData: action.payload.allWritersListData,
        error: '',
      };
    case FETCH_ALL_WRITERS_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_ALL_WRITERS:
      return { ...state, isLoading: true, error: '' };
    case SEND_SELECTED_AUTHOR:
      return { ...state, isLoading: true }
    case SEND_SELECTED_AUTHOR_SUCCESS:
      return { ...state, isLoading: false, sendAuthorInfo: action.payload.saveData }
    case SEND_SELECTED_AUTHOR_ERROR:
      return { ...state, isLoading: false, error: action.payload.error }
    case GET_SELECTED_AUTHOR:
      return { ...state, isLoading: true }
    case GET_SELECTED_AUTHOR_SUCCESS:
      return { ...state, isLoading: false, selectedAuthorsData: action.payload.selectedAuthorsData,  error: '' }
    case GET_SELECTED_AUTHOR_ERROR:
      return { ...state, isLoading: false, error: action.payload.error }
    case EMPTY_SELECTED_AUTHORS_INFO:
      return {...state, isLoading: false, sendAuthorInfo:{},error:'', selectedAuthorsData: {}}
    default:
      return { ...state };
  }
};