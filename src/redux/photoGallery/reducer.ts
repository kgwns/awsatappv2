import {
  FETCH_ALBUM_LIST,
  FETCH_ALBUM_LIST_SUCCESS,
  FETCH_ALBUM_LIST_ERROR,
  EMPTY_ALL_DATA,
  FETCH_ALBUM_DETAIL,
  FETCH_ALBUM_DETAIL_SUCCESS,
  FETCH_ALBUM_DETAIL_FAILED,
} from './actionTypes';
import {AlbumListActions, AlbumListState} from './types';

const initialState: AlbumListState = {
  albumData: {
    rows: [],
    pager: {current_page: 0, items_per_page: '', total_pages: 0},
  },
  error: '',
  isLoading: false,
  albumDetailData: {
    rows: [],
    pager: {current_page: 0, items_per_page: '', total_pages: 0},
  },
  albumDetailError: '',
  albumDetailLoading: false,
};

export default (state = initialState, action: AlbumListActions) => {
  switch (action.type) {
    case FETCH_ALBUM_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        albumData: action.payload,
        error: '',
      };

    case FETCH_ALBUM_LIST_ERROR:
      return {...state, error: action.payload.error, isLoading: false};
    case FETCH_ALBUM_LIST:
      return {...state, isLoading: true, error: ''};
    case FETCH_ALBUM_DETAIL_SUCCESS:
      return {
        ...state,
        albumDetailLoading: false,
        albumDetailData: action.payload,
        error: '',
      };

    case FETCH_ALBUM_DETAIL_FAILED:
      return {
        ...state,
        albumDetailError: action.payload.error,
        albumDetailLoading: false,
      };
    case FETCH_ALBUM_DETAIL:
      return {...state, albumDetailLoading: true, error: ''};
    case EMPTY_ALL_DATA:
      return {
        ...state,
        albumDetailLoading: false,
        albumDetailData: {
          rows: [],
          pager: {current_page: 0, items_per_page: '', total_pages: 0},
        },
        albumDetailError: '',
      };
    default:
      return {...state};
  }
};
