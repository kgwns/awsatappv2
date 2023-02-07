import { FETCH_SEARCH_ERROR, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_REQUEST, UPDATE_SEARCH_HISTORY, CLEAR_SEARCH_HISTORY } from './actionTypes';
import { SearchActions, SearchState } from './types';

const initialState: SearchState = {
  searchData: [],
  error: '',
  isLoading: false,
  searchHistory: []
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
    case UPDATE_SEARCH_HISTORY:
      return {...state, searchHistory: action.payload};
    case CLEAR_SEARCH_HISTORY:
      return {...state, searchHistory: []}
    default:
      return state;
  }
};
