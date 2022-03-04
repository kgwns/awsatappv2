import {
  FETCH_PROFILE_USER_DETAILS,
  FETCH_PROFILE_USER_DETAILS_ERROR,
  FETCH_PROFILE_USER_DETAILS_SUCCESS,
  SEND_USER_DETAILS,
  SEND_USER_DETAILS_ERROR,
  SEND_USER_DETAILS_SUCCESS
} from './actionTypes';
import { UserProfileActions, ProfileUserDetailsState } from './types';

const initialState: ProfileUserDetailsState = {
  userProfileData: {},
  error: '',
  isLoading: false,
  sendUserInfo: {}
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
    default:
      return { ...state };
  }
};
