import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { OPINION_TAB_WRITER_ENDPOINT } from './apiEndPoints';
import {
  FetchOpinionWriterListSuccessPayloadType,
  WritersBodyGet,
} from 'src/redux/writers/types';

export const fetchOpinionWriterApi = async (body: WritersBodyGet) => {
  try {
    const response: FetchOpinionWriterListSuccessPayloadType =
      await getCacheApiRequest(
        `${BASE_URL}${OPINION_TAB_WRITER_ENDPOINT}`,
      );
    return response;
  } catch (error) {
    console.log('opinionWriterService - fetchOpinionWriterApi - error', error)
    throw error;
  }
};
