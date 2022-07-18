import {
  SAVE_TOKEN_REQUEST,
  SAVE_TOKEN_SUCCESS,
  SAVE_TOKEN_FAILED,
  SAVE_TOKEN_AFTER_REGISTRATION_REQUEST,
  SAVE_TOKEN_AFTER_REGISTRATION_SUCCESS,
  SAVE_TOKEN_AFTER_REGISTRATION_FAILED,
} from './actionType';
import {SaveTokenAction, SaveTokenState} from './types';

const initialState: SaveTokenState = {
  SaveTokenInfo: null,
  SaveTokenAfterRegistraionInfo: null,
  error: '',
  isLoading: false,
};

export default (state = initialState, action: SaveTokenAction) => {
  switch (action.type) {
    case SAVE_TOKEN_SUCCESS:
      return {...state, isLoading: false, SaveTokenInfo: action.payload};
    case SAVE_TOKEN_FAILED:
      return {...state, error: action.payload.error, isLoading: false};
    case SAVE_TOKEN_REQUEST:
      return {...state, isLoading: true};
    case SAVE_TOKEN_AFTER_REGISTRATION_SUCCESS:
      return {...state, isLoading: false, SaveTokenAfterRegistraionInfo: action.payload};
    case SAVE_TOKEN_AFTER_REGISTRATION_FAILED:
      return {...state, error: action.payload.error, isLoading: false};
    case SAVE_TOKEN_AFTER_REGISTRATION_REQUEST:
      return {...state, isLoading: true};
    default:
      return {...state};
  }
};
