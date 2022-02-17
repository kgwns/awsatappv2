import {
  FETCH_ALL_WRITERS,
  FETCH_ALL_WRITERS_SUCCESS,
  FETCH_ALL_WRITERS_ERROR,
} from './actionTypes';
import { AllWritersActions, AllWritersState } from './types';

const initialState: AllWritersState = {
  allWritersData: [],
  error: '',
  isLoading: false,
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
    default:
      return { ...state };
  }
};