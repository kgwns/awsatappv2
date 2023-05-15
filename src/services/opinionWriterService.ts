import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { OPINION_TAB_WRITER_ENDPOINT } from './apiEndPoints';
import {
  WritersBodyGet,
} from 'src/redux/writers/types';

export const fetchOpinionWriterApi = async (body: WritersBodyGet) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${OPINION_TAB_WRITER_ENDPOINT}`,
    );
  } catch (error) {
    console.log('opinionWriterService - fetchOpinionWriterApi - error', error)
    throw error;
  }
};
