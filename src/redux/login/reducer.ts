import { getUpdatedObject } from 'src/shared/utils/utilities';
import { 
    FETCH_LOGIN,
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_SUCCESS,
    FETCH_USER_LOGOUT,
    FETCH_USER_LOGOUT_SUCCESS,
    LOGIN_SKIPPED,
    ONBOARDING_SUCCESS
} from './actionTypes';
import { LoginActions, LoginState } from './types';
const initialAuthState: LoginState = {
  loginData: null,
  error: '',
  isLoading: false,
  isSkipped: false,
};

export default (state = initialAuthState, action: LoginActions) => {
 // console.log('loginData login reducer', action.payload.loginData);
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
    default:
      return state;
  }
};