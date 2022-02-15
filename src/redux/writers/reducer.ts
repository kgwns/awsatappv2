import {
  FETCH_OPINION_WRITER,
  FETCH_OPINION_WRITER_ERROR,
  FETCH_OPINION_WRITER_SUCCESS,
} from './actionTypes';
import {OpinionWriterActions, OpinionWriterListState} from './types';

const initialState: OpinionWriterListState = {
  opinionWriterData: [],
  error: '',
  isLoading: false,
};

export default (state = initialState, action: OpinionWriterActions) => {
  switch (action.type) {
    case FETCH_OPINION_WRITER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        opinionWriterData: action.payload.opinionWriterListData,
        error: '',
      };
    case FETCH_OPINION_WRITER_ERROR:
      return {...state, error: action.payload.error, isLoading: false};
    case FETCH_OPINION_WRITER:
      return {...state, isLoading: true, error: ''};
    default:
      return {...state};
  }
};
