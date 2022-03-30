import { isNonEmptyArray } from 'src/shared/utils';
import {
  EMPTY_WRITER_OPINION_DATA,
  FETCH_OPINIONS,
  FETCH_OPINIONS_ERROR,
  FETCH_OPINIONS_SUCCESS,
  FETCH_WRITER_OPINIONS,
  FETCH_WRITER_OPINIONS_SUCCESS,
} from './actionTypes';
import { OpinionsActions, OpinionsListState } from './types';

const initialState: OpinionsListState = {
  opinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
  error: '',
  isLoading: false,
  writerOpinionLoading: true,
  writerOpinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
  writerOpinionError: ''
};

export default (state = initialState, action: OpinionsActions) => {
  const concatWriterOpinionData = (data: any) => {
  console.log("🚀 ~ file: reducer.ts ~ line 23 ~ concatWriterOpinionData ~ data", data)
    const temp = { ...state }
    temp.writerOpinionData.rows = temp.writerOpinionData.rows.concat(data.rows);
    temp.writerOpinionData.pager.current_page = data.pager.current_page;
    temp.writerOpinionData.pager.items_per_page = data.pager.items_per_page;
    return temp.writerOpinionData;
  };

  const concatData = (data: any) => {
    const temp = { ...state }
    temp.opinionData.rows = temp.opinionData.rows.concat(data.rows);
    temp.opinionData.pager.current_page = data.pager?.current_page;
    temp.opinionData.pager.items_per_page = data.pager?.items_per_page;
    return temp.opinionData;
  };

  switch (action.type) {
    case FETCH_OPINIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        opinionData: isNonEmptyArray(state.opinionData.rows) ?
          concatData(action.payload.opinionListData) : action.payload.opinionListData,
      };
    case FETCH_OPINIONS_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      };
    case FETCH_OPINIONS:
      return { ...state, isLoading: true, error: '' };
    case FETCH_WRITER_OPINIONS:
      return {
        ...state,
        writerOpinionLoading: true,
        writerOpinionError: ''
      }
    case FETCH_WRITER_OPINIONS_SUCCESS:
      return {
        ...state,
        writerOpinionLoading: false,
        writerOpinionData: isNonEmptyArray(state.writerOpinionData.rows) ?
          concatWriterOpinionData(action.payload.writerOpinionListData) : action.payload.writerOpinionListData,
        writerOpinionError: '',
      }
    case EMPTY_WRITER_OPINION_DATA:
      return {
        ...state,
        writerOpinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
        writerOpinionError: '',
      }
    default:
      return { ...state };
  }
};
