import {
  FETCH_WRITER_DETAIL,
  FETCH_WRITER_DETAIL_SUCCESS,
  FETCH_WRITER_DETAIL_ERROR,
  EMPTY_WRITER_DETAIL,
} from './actionTypes';
import { WriterDetailState, WriterDetailActions } from './types';

const initialState: WriterDetailState = {
  writersDetail: [],
  error: '',
  isLoading: true,
};

export default (state = initialState, action: WriterDetailActions) => {
  switch (action.type) {
    case FETCH_WRITER_DETAIL:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case FETCH_WRITER_DETAIL_SUCCESS:
      return {
        ...state,
        writersDetail: action.payload.writersDetail,
        isLoading: false
      };
    case FETCH_WRITER_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    case EMPTY_WRITER_DETAIL:
      return {
        ...initialState
      }
    default:
      return { ...state };
  }
};
