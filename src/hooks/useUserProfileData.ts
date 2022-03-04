import {useDispatch, useSelector} from 'react-redux';
import {
  getProfileUserDetails,
  getIsLoading,
  getProfileUserDetailsError,
  getUserData,
} from 'src/redux/profileUserDetail/selectors';
import {fetchUserProfileDetail, sendUserData} from 'src/redux/profileUserDetail/action';
import {ProfileUserDataType, SendUserData} from 'src/redux/profileUserDetail/types';

export interface useUserProfileDetail {
  isLoading: boolean;
  userProfileData: ProfileUserDataType;
  userProfileError: string;
  sentUserProfileData: ProfileUserDataType;
  fetchProfileDataRequest(): void;
  sendUserProfileInfo(payload: SendUserData): void
}

export const useUserProfileData = (): useUserProfileDetail => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const userProfileData = useSelector(getProfileUserDetails);
  const userProfileError = useSelector(getProfileUserDetailsError);
  const sentUserProfileData = useSelector(getUserData);
  const fetchProfileDataRequest = () => {
    dispatch(fetchUserProfileDetail());
  };
  const sendUserProfileInfo = (payload: SendUserData) => {
    dispatch(sendUserData(payload));
  };
  return {
    isLoading,
    userProfileData,
    userProfileError,
    fetchProfileDataRequest,
    sendUserProfileInfo,
    sentUserProfileData,
  };
};

