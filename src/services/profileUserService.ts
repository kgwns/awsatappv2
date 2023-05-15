import {UMS_BASE_URL} from 'src/services/apiUrls';
import {postApiRequest} from 'src/services/api';
import {USER_PROFILE_DETAIL, SEND_PROFILE_DETAIL, UPDATE_PROFILE_USER_IMAGE} from './apiEndPoints';
import {
  SendUserData, UpdateUserImageBodyType,
} from 'src/redux/profileUserDetail/types';
import { AxiosError} from 'axios';

export const fetchUserProfileApi = async () => {
   try {
     return await postApiRequest(
       `${UMS_BASE_URL}${USER_PROFILE_DETAIL}`
     );
    } catch (error) {
        console.log('profileUserService - fetchUserProfileApi - error', error)
        throw error;
    }
};

export const sendUserProfileApi = async (body: SendUserData) => {
    try {
        return await postApiRequest(
          `${UMS_BASE_URL}${SEND_PROFILE_DETAIL}${body.email}&first_name=${body.first_name}&occupation=${body.occupation}&birthday=${body.birthday}`,
          body
      );
    } catch (error) {
        console.log('profileUserService - sendUserProfileApi - error', error)
        throw error;
    }
}

export const updateProfileUserImage = async (body: UpdateUserImageBodyType) => {
    const photo = {
      uri: body.image,
      type: 'image/jpeg',
      name: 'photo.jpg',
  };
    const formData = new FormData();
    formData.append("image", photo);
    try {
      return await postApiRequest(
        `${UMS_BASE_URL}${UPDATE_PROFILE_USER_IMAGE}`,
        formData,
      );
    } catch (error) {
      console.log('profileUserService - updateProfileUserImage - error', error)
      throw error as AxiosError;
    }
  };
