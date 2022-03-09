import {
  REQUEST_HERO_LIST_SUCCESS,
  REQUEST_HERO_LIST_FAILED,
  REQUEST_HERO_LIST_DATA,
  REQUEST_BOTTOM_LIST_DATA,
  REQUEST_BOTTOM_LIST_FAILED,
  REQUEST_BOTTOM_LIST_SUCCESS,
  REQUEST_TOP_LIST_DATA,
  REQUEST_TOP_LIST_SUCCESS,
  REQUEST_TOP_LIST_FAILED,
  EMPTY_ALL_LIST,
} from './actionTypes';

import {NewsViewActions, NewsViewtState} from './types';

const initialState: NewsViewtState = {
  heroListData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
  topListData: [],
  bottomListData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
  error: '',
  isLoading: false,
};

export default (state = initialState, action: NewsViewActions) => {
  const concatData = (data: any) => {
    state.bottomListData.rows = state.bottomListData.rows.concat(data.rows);
    state.bottomListData.pager.current_page = data.pager.current_page;
    state.bottomListData.pager.items_per_page = data.pager.items_per_page;
    return state.bottomListData;
  };

  switch (action.type) {
    case REQUEST_HERO_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        heroListData: action.payload.heroListData,
        error: '',
      };
    case REQUEST_HERO_LIST_FAILED:
      return {...state, error: action.payload.error, isLoading: false};
    case REQUEST_HERO_LIST_DATA:
      return {...state, isLoading: true, error: ''};
    case REQUEST_TOP_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        topListData: action.payload.topListData,
        error: '',
      };
    case REQUEST_TOP_LIST_FAILED:
      return {...state, error: action.payload.error, isLoading: false};
    case REQUEST_TOP_LIST_DATA:
      return {...state, isLoading: true, error: ''};
    case REQUEST_BOTTOM_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bottomListData: concatData(action.payload.bottomListData),
        error: '',
      };
    case REQUEST_BOTTOM_LIST_FAILED:
      return {...state, error: action.payload.error, isLoading: false};
    case REQUEST_BOTTOM_LIST_DATA:
      return {...state, isLoading: true, error: ''};
    case EMPTY_ALL_LIST:
      return {
        ...state,
        isLoading: false,
        bottomListData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
        heroListData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
        topListData: [],
        error: '',
      };
    default:
      return {...state};
  }
};
