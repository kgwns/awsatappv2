import {
  REQUEST_HOME,
  REQUEST_HOME_ERROR,
  REQUEST_HOME_SUCCESS,
} from 'src/redux/home/actionType';
import {HomeActions, HomeState} from './types';

export const initialAuthState: HomeState = {
  homeData: '',
  error: '',
  isLoading: false,
};

export default (state = initialAuthState, action: HomeActions) => {
  switch (action.type) {
    case REQUEST_HOME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        homeData: action.payload.homeData,
        error: '',
      };
    case REQUEST_HOME_ERROR:
      return {...state, error: action.payload.error, isLoading: false};
    case REQUEST_HOME:
      return {...state, isLoading: true, error: ''};
    default:
      return {...state};
  }
};
