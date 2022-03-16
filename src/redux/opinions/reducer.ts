import {
  FETCH_OPINIONS,
  FETCH_OPINIONS_ERROR,
  FETCH_OPINIONS_SUCCESS,
} from './actionTypes';
import {OpinionsActions, OpinionsListState} from './types';

const initialState: OpinionsListState = {
  opinionData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
  error: '',
  isLoading: false,
};

export default (state = initialState, action: OpinionsActions) => {
  const concatData = (data: any) => {
    const temp = {...state}
    temp.opinionData.rows = temp.opinionData.rows.concat(data.rows);
    temp.opinionData.pager.current_page = data.pager.current_page;
    temp.opinionData.pager.items_per_page = data.pager.items_per_page;
    return temp.opinionData;
  };
  switch (action.type) {
    case FETCH_OPINIONS_SUCCESS:
      return state.opinionData.rows.length == 0
        ? {
            ...state,
            isLoading: false,
            opinionData: action.payload.opinionListData,
            error: '',
          }
        : {
            ...state,
            isLoading: false,
            opinionData: concatData(action.payload.opinionListData),
            error: '',
          };
    case FETCH_OPINIONS_ERROR:
      return {...state, error: action.payload.error, isLoading: false};
    case FETCH_OPINIONS:
      return {...state, isLoading: true, error: ''};
    default:
      return {...state};
  }
};
