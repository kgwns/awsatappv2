import {UMS_BASE_URL} from 'src/services/apiUrls';
import {postApiRequest} from 'src/services/api';
import {USER_PROFILE_DETAIL, SEND_PROFILE_DETAIL, UPDATE_PROFILE_USER_IMAGE} from './apiEndPoints';
import {
  FetchProfileUserDetailsSuccessPayloadType, SendUserData,  UpdateUserImageBodyType,
  UpdateUserImageSuccessPayloadType,
} from 'src/redux/profileUserDetail/types';
import { AxiosError} from 'axios';

export const fetchUserProfileApi = async () => {
   try {
        const response: FetchProfileUserDetailsSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${USER_PROFILE_DETAIL}`
            );
        return response;
    } catch (error) {
        throw error;
    }
};

export const sendUserProfileApi = async (body: SendUserData) => {
    try {
        const response: FetchProfileUserDetailsSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${SEND_PROFILE_DETAIL}${body.email}&first_name=${body.first_name}&occupation=${body.occupation}&birthday=${body.birthday}`,
                body
            );
        return response;
    } catch (error) {
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
      const response: UpdateUserImageSuccessPayloadType = await postApiRequest(
        `${UMS_BASE_URL}${UPDATE_PROFILE_USER_IMAGE}`,
        formData,
      );
      return response;
    } catch (error) {
      const errorResponse = error as AxiosError;
      throw errorResponse;
    }
  };
  