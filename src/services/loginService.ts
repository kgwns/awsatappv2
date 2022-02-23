import {  BASE_URL_UMS } from 'src/services/apiUrls';
import { postApiRequest } from 'src/services/api';
import { LOGIN_ENDPOINT } from './apiEndPoints';
import { FetchLoginSuccessPayloadType } from 'src/redux/login/types';

export const fetchLoginApi = async () => {
  try {
    const response: FetchLoginSuccessPayloadType = await postApiRequest(
      `${BASE_URL_UMS}${LOGIN_ENDPOINT}`,
    );
    //console.log( `MostReadService url: ${BASE_URL}${MOST_READ_ENDPOINT} response: ${JSON.stringify(response)}`, );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};