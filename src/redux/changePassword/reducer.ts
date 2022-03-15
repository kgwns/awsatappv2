import {
CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR, EMPTY_PASSWORD_RESPONSE_INFO
} from './actionTypes';
import { ChangePasswordActions, ChangePasswordState } from './types';

const initialState: ChangePasswordState = {
  error: '',
  isLoading: false,
  response: {}
};

export default (state = initialState, action: ChangePasswordActions) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return { ...state, isLoading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, response: action.payload.message };
    case CHANGE_PASSWORD_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    case EMPTY_PASSWORD_RESPONSE_INFO:
      return { ...state, isLoading: false, response:{} };
    default:
      return { ...state };
  }
};
