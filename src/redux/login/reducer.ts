import { 
    FETCH_LOGIN,
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_SUCCESS
} from './actionTypes';
import { LoginActions, LoginState } from './types';
const initialAuthState: LoginState = {
  loginData: null,
  error: '',
  isLoading: false,
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
      };
    case FETCH_LOGIN_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_LOGIN:
      return { ...state, isLoading: true, error: '', loginData: null };
    default:
      return { ...state };
  }
};