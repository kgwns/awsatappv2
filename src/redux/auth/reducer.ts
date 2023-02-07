import { FETCH_USER_LOGOUT } from '../login/actionTypes';
import {
  EMPTY_EMAIL_CHECK_DATA,
  FETCH_EMAIL_CHECK,
  FETCH_EMAIL_CHECK_ERROR,
  FETCH_EMAIL_CHECK_SUCCESS,
} from './actionTypes';
import {EmailCheckActions, EmailCheckState} from './types';
const initialAuthState: EmailCheckState = {
  emailCheckData: null,
  error: '',
  isLoading: false,
  actionType: '',
};

export default (state = initialAuthState, action: EmailCheckActions) => {
  switch (action.type) {
    case FETCH_EMAIL_CHECK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        emailCheckData: action.payload.emailCheckData,
        error: '',
        actionType: action.type,
      };
    case FETCH_EMAIL_CHECK_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        actionType: action.type,
      };
    case FETCH_EMAIL_CHECK:
      return {...state, isLoading: true, error: '', actionType: action.type, emailCheckData: null};
    case FETCH_USER_LOGOUT:
        return {...state, emailCheckData: null};
    case EMPTY_EMAIL_CHECK_DATA:
      return {
        ...state,
        emailCheckData: null
      };
    default:
      return {...state};
  }
};
