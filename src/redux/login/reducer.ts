import { getUpdatedObject } from 'src/shared/utils/utilities';
import { 
  EMPTY_FORGOT_PASSWORD_RESPONSE,
    EMPTY_LOGIN_DATA,
    FETCH_LOGIN,
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_SUCCESS,
    FETCH_USER_LOGOUT,
    FETCH_USER_LOGOUT_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_SKIPPED,
    ONBOARDING_SUCCESS
} from './actionTypes';
import { LoginActions, LoginState } from './types';
const initialAuthState: LoginState = {
  loginData: null,
  error: '',
  isLoading: false,
  isSkipped: false,
  forgotPasswordResponse:{}
};

export default (state = initialAuthState, action: LoginActions) => {
  switch (action.type) {
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loginData: action.payload.loginData,
        error: '',
        isSkipped: false
      };
    case FETCH_LOGIN_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_LOGIN:
      return { ...state, isLoading: true, error: '', loginData: null };
    case FETCH_USER_LOGOUT:
      return {...state, loginData: null};
    case FETCH_USER_LOGOUT_SUCCESS:
      return {...state, loginData: null};
    case LOGIN_SKIPPED:
      return {...state, isSkipped: true};
    case ONBOARDING_SUCCESS:
      return {...state, loginData:  getUpdatedObject(state.loginData, 'newUser', 1, 0 )};
    case FORGOT_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: '', forgotPasswordResponse: {} }
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, error: '', forgotPasswordResponse: action.payload.response }
    case FORGOT_PASSWORD_FAILED:
      return { ...state, isLoading: false, error: action.payload.error }
    case EMPTY_FORGOT_PASSWORD_RESPONSE:
      return { ...state,isLoading: false, error: '',forgotPasswordResponse:{}}
    case EMPTY_LOGIN_DATA:
      return { ...state, isLoading: false, error: '', loginData:null }
    default:
      return state;
  }
};
