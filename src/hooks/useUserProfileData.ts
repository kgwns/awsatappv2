import {useDispatch, useSelector} from 'react-redux';
import {
  getProfileUserDetails,
  getIsLoading,
  getProfileUserDetailsError,
  getUserData,
} from 'src/redux/profileUserDetail/selectors';
import { fetchUserProfileDetail, sendUserData, updateUserImage, emptyUserProfileData } from 'src/redux/profileUserDetail/action';
import {ProfileUserDataType, SendUserData, UpdateUserImageBodyType,
} from 'src/redux/profileUserDetail/types';

export interface UseUserProfileDetail {
  isLoading: boolean;
  userProfileData: ProfileUserDataType;
  userProfileError: string;
  sentUserProfileData: ProfileUserDataType;
  fetchProfileDataRequest(): void;
  sendUserProfileInfo(payload: SendUserData): void
  updateUserImageRequest(payload: UpdateUserImageBodyType): void;
  emptyUserProfileInfoData(): void;
}

export const useUserProfileData = (): UseUserProfileDetail => {
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
  const updateUserImageRequest = (payload: UpdateUserImageBodyType) => {
    dispatch(updateUserImage(payload));
};
  const emptyUserProfileInfoData = () => {
    dispatch(emptyUserProfileData());
  };
  return {
    isLoading,
    userProfileData,
    userProfileError,
    fetchProfileDataRequest,
    sendUserProfileInfo,
    sentUserProfileData,
    updateUserImageRequest,
    emptyUserProfileInfoData
  };
};

