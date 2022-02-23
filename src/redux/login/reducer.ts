import { 
    FETCH_LOGIN,
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_SUCCESS
} from './actionTypes';
import { LoginActions, LoginState } from './types';
const initialAuthState: LoginState = {
  loginData: {},
  error: '',
  isLoading: false,
};

export default (state = initialAuthState, action: LoginActions) => {
  console.log('loginData', action.payload);
  switch (action.type) {
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loginData: action.payload,
        error: '',
      };
    case FETCH_LOGIN_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_LOGIN:
      return { ...state, isLoading: true, error: '' };
    default:
      return { ...state };
  }
};