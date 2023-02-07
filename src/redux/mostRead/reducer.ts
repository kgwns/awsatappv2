import { FETCH_MOST_READ, FETCH_MOST_READ_ERROR, FETCH_MOST_READ_SUCCESS } from './actionTypes';
import { MostReadActions, MostReadState } from './types';
const initialAuthState: MostReadState = {
  mostReadData: [],
  error: '',
  isLoading: false,
};

export default (state = initialAuthState, action: MostReadActions) => {
  switch (action.type) {
    case FETCH_MOST_READ_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mostReadData: action.payload.mostReadData,
        error: '',
      };
    case FETCH_MOST_READ_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_MOST_READ:
      return { ...state, isLoading: true, error: '' };
    default:
      return { ...state };
  }
};
