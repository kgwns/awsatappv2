import {
  FETCH_PROFILE_USER_DETAILS,
  FETCH_PROFILE_USER_DETAILS_ERROR,
  FETCH_PROFILE_USER_DETAILS_SUCCESS,
  SEND_USER_DETAILS,
  SEND_USER_DETAILS_ERROR,
  SEND_USER_DETAILS_SUCCESS,
  UPDATE_USER_IMAGE_FAILED, UPDATE_USER_IMAGE_SUCCESS, UPDATE_PROFILE_USER_IMAGE,EMPTY_USER_PROFILE_DATA
} from './actionTypes';
import { UserProfileActions, ProfileUserDetailsState } from './types';

const initialState: ProfileUserDetailsState = {
  userProfileData: {},
  error: '',
  isLoading: false,
  sendUserInfo: {},
  userDetail: null
};

export default (state = initialState, action: UserProfileActions) => {
  switch (action.type) {
    case FETCH_PROFILE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfileData: action.payload.userProfileData,
        error: '',
      };
    case FETCH_PROFILE_USER_DETAILS_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_PROFILE_USER_DETAILS:
      return { ...state, isLoading: true, error: '' };
    case SEND_USER_DETAILS:
      return { ...state, isLoading: true };
    case SEND_USER_DETAILS_SUCCESS:
      return { ...state, isLoading: false, sendUserInfo: action.payload.saveData };
    case SEND_USER_DETAILS_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    case UPDATE_USER_IMAGE_SUCCESS:
      return { ...state, isLoading: false, userDetail: action.payload };
    case UPDATE_USER_IMAGE_FAILED:
      return { ...state, error: action.payload.error, isLoading: false };
    case UPDATE_PROFILE_USER_IMAGE:
      return { ...state, isLoading: true, userDetail: null };
    case EMPTY_USER_PROFILE_DATA:
      return { ...state, userProfileData: {} };
    default:
      return { ...state };
  }
};
