import {REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_USER} from './actionTypes';
import {RegisterAction, RegisterState} from './types';
const initialState: RegisterState = {
  userInfo: null,
  error: '',
  isLoading: false,
};

export default (state = initialState, action: RegisterAction) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, isLoading: false, userInfo: action.payload};
    case REGISTER_FAILED:
      return {...state, error: action.payload.error, isLoading: false};
    case REGISTER_USER:
      return {...state, isLoading: true, userInfo: null};
    default:
      return {...state};
  }
};
