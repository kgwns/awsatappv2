import { isNonEmptyArray } from 'src/shared/utils';
import {
  EMPTY_OPINION_DATA,
  EMPTY_WRITER_OPINION_DATA,
  FETCH_OPINIONS,
  FETCH_OPINIONS_ERROR,
  FETCH_OPINIONS_SUCCESS,
  FETCH_WRITER_OPINIONS,
  FETCH_WRITER_OPINIONS_SUCCESS,
  STORE_HOME_OPINION_NID,
} from './actionTypes';
import { FetchOpinionsSuccessType, OpinionsActions, OpinionsListState } from './types';

const initialState: OpinionsListState = {
  opinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
  opinionByIdData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
  error: '',
  isLoading: false,
  writerOpinionLoading: true,
  writerOpinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
  writerOpinionError: '',
  homeOpinionNid: '',
};

export default (state = initialState, action: OpinionsActions) => {
  const concatWriterOpinionData = (data: any) => {
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

  const concatByIdData = (data: any) => {
    const temp = { ...state }
    temp.opinionByIdData.rows = temp.opinionByIdData.rows.concat(data.rows);
    temp.opinionByIdData.pager.current_page = data.pager?.current_page;
    temp.opinionByIdData.pager.items_per_page = data.pager?.items_per_page;
    return temp.opinionByIdData;
  };

  const editState = (action: any) => {
    if (action.byIdOpinions) {
      return {
        ...state, isLoading: false, error: '',
        opinionByIdData: action.payload.opinionListData
      }
    } else {
      return {
        ...state, isLoading: false, error: '',
        opinionData: isNonEmptyArray(state.opinionData.rows) ?
        concatData(action.payload.opinionListData) : action.payload.opinionListData
      }
    }
  }

  switch (action.type) {
    case FETCH_OPINIONS_SUCCESS:
      return editState(action);
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
    case EMPTY_OPINION_DATA:
        return {
        ...state,
        opinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } }
      }
    case STORE_HOME_OPINION_NID:
      return {
        ...state,
        homeOpinionNid: action.payload.nid,
      }
    default:
      return { ...state };
  }
};

