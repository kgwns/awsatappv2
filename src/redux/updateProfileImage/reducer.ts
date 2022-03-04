import { UPDATE_USER_IMAGE_FAILED, UPDATE_USER_IMAGE_SUCCESS, UPDATE_PROFILE_USER_IMAGE } from './actionTypes';
import { UpdateUserImageAction, UserState } from './types';
const initialState: UserState = {
  userDetail: null,
  error: '',
  isLoading: false,
};

export default (state = initialState, action: UpdateUserImageAction) => {
  switch (action.type) {
    case UPDATE_USER_IMAGE_SUCCESS:
      return { ...state, isLoading: false, userDetail: action.payload };
    case UPDATE_USER_IMAGE_FAILED:
      return { ...state, error: action.payload.error, isLoading: false };
    case UPDATE_PROFILE_USER_IMAGE:
      return { ...state, isLoading: true, userDetail: null };
    default:
      return { ...state };
  }
};
