import { FETCH_USER_LOGOUT } from '../login/actionTypes';
import {EMPTY_USER_INFO, REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_USER, SOCIAL_LOGIN_END, SOCIAL_LOGIN_START} from './actionTypes';
import {RegisterAction, RegisterState} from './types';
const initialState: RegisterState = {
  userInfo: null,
  error: '',
  isLoading: false,
  socialLoginInProgress: false,
};

export default (state = initialState, action: RegisterAction) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, isLoading: false, userInfo: action.payload};
    case REGISTER_FAILED:
      return {...state, error: action.payload.error, isLoading: false};
    case REGISTER_USER:
      return {...state, isLoading: true, userInfo: null};
    case FETCH_USER_LOGOUT: 
      return {...state, userInfo: null}
      case SOCIAL_LOGIN_START:
        return {...state, socialLoginInProgress: true};
      case SOCIAL_LOGIN_END:
        return {...state, socialLoginInProgress: false};
    case EMPTY_USER_INFO:
      return { ...state, isLoading: false, userInfo: null, error: '' };
    default:
      return {...state};
  }
};
