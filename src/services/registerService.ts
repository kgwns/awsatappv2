import { UMS_BASE_URL } from 'src/services/apiUrls';
import {postApiRequest} from './api';
import { REGISTER_ENDPOINT } from './apiEndPoints';
import {
  RegisterBodyType,
  RegisterSuccessPayloadType,
} from 'src/redux/register/types';
import {AxiosError} from 'axios';

export const registerUser = async (body: RegisterBodyType) => {
  try {
    const response: RegisterSuccessPayloadType = await postApiRequest(
      `${UMS_BASE_URL}${REGISTER_ENDPOINT}`,
      body,
    );
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};
