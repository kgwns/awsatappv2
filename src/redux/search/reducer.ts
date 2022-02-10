import { FETCH_SEARCH_ERROR, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_REQUEST } from './actionTypes';
import { SearchActions, SearchState } from './types';

const initialState: SearchState = {
  searchData: [],
  error: '',
  isLoading: false,
};

export default (state = initialState, action: SearchActions) => {
  switch (action.type) {
    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        searchData: action.payload.searchData,
        error: '',
      };
    case FETCH_SEARCH_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_SEARCH_REQUEST:
      return { ...state, isLoading: true, error: '' };
    default:
      return { ...state };
  }
};