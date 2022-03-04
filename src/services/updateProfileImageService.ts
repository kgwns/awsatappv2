import { UMS_BASE_URL } from 'src/services/apiUrls';
import {postApiRequest} from './api';
import { UPDATE_PROFILE_USER_IMAGE } from './apiEndPoints';
import {
  UpdateUserImageBodyType,
  UpdateUserImageSuccessPayloadType,
} from 'src/redux/updateProfileImage/types';
import { AxiosError} from 'axios';

export const updateProfileUserImage = async (body: UpdateUserImageBodyType) => {
  var photo = {
    uri: body.image,
    type: 'image/jpeg',
    name: 'photo.jpg',
};
  var formData = new FormData();
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