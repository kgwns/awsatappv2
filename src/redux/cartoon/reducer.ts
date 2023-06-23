import { isNonEmptyArray } from 'src/shared/utils';
import {
  FETCH_CARTOON_LIST,
  FETCH_CARTOON_LIST_SUCCESS,
  FETCH_CARTOON_LIST_FAILED,
} from './actionTypes';
import { CartoonState, CartoonListActions, FetchCartoonListSuccessPayloadType } from './types';

const initialState: CartoonState = {
  cartoonList: [],
  isLoading: true,
  error: '',
  hasNextPage: true,
};

export default (state = initialState, action: CartoonListActions) => {
  const parseCartoonSuccess = (payload: FetchCartoonListSuccessPayloadType) => {
    return {
      ...state,
      cartoonList: payload.data,
      isLoading: false,
      hasNextPage: payload.hasNextPage,
    }
  };

  switch (action.type) {
    case FETCH_CARTOON_LIST:
      return {
        ...state,
        isLoading: true,
        albumData: action.payload,
        error: '',
      };

    case FETCH_CARTOON_LIST_SUCCESS:
      return parseCartoonSuccess(action.payload);
    case FETCH_CARTOON_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return { ...state };
  }
};
