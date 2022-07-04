import {
  REQUEST_STATIC_DETAIL,
  REQUEST_STATIC_DETAIL_SUCCESS,
  REQUEST_STATIC_DETAIL_FAILED
} from './actionType';
import { StaticDetailAction, StaticDetailState } from './types';

const initialData: StaticDetailState = {
  isLoading: true,
  error: '',
  data: [],
};

export default (state = initialData, action: StaticDetailAction) => {
  switch (action.type) {
    case REQUEST_STATIC_DETAIL:
      return {
        ...state,
        isLoading: true,
        data: []
      }
    case REQUEST_STATIC_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data
      }
    case REQUEST_STATIC_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    default:
      return { ...state }
  }
}
