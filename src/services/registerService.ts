import { UMS_BASE_URL } from 'src/services/apiUrls';
import {postApiRequest} from './api';
import { REGISTER_ENDPOINT } from './apiEndPoints';
import {
  RegisterBodyType,
} from 'src/redux/register/types';
import {AxiosError} from 'axios';

export const registerUser = async (body: RegisterBodyType) => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${REGISTER_ENDPOINT}`,
      body,
    );
  } catch (error) {
    throw error as AxiosError;
  }
};
