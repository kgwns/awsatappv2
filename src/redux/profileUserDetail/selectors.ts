import { AppState, Selector } from 'src/redux/rootReducer';
import { ProfileUserDataType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.userDetails.isLoading;

export const getProfileUserDetails: Selector<ProfileUserDataType> = (
  state: AppState,
) => state.userDetails.userProfileData

export const getUserData: Selector<ProfileUserDataType> = (
  state: AppState,
) => state.userDetails.sendUserInfo

export const getProfileUserDetailsError: Selector<string> = (state: AppState) =>
  state.userDetails.error;
