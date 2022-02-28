import {
  FETCH_ALL_WRITERS,
  FETCH_ALL_WRITERS_SUCCESS,
  FETCH_ALL_WRITERS_ERROR,
  SEND_SELECTED_AUTHOR_SUCCESS,
  SEND_SELECTED_AUTHOR,
  SEND_SELECTED_AUTHOR_ERROR,
} from './actionTypes';
import { AllWritersActions, AllWritersState } from './types';

const initialState: AllWritersState = {
  allWritersData: [],
  error: '',
  isLoading: false,
  sendAuthorInfo: {}
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
    default:
      return { ...state };
  }
};