import {BASE_URL} from 'src/services/apiUrls';
import {getApiRequest} from 'src/services/api';
import {OPINIONS_ENDPOINT} from './apiEndPoints';
import {
  FetchOpinionsSuccessPayloadType,
  OpinionsBodyGet,
} from 'src/redux/opinions/types';

export const fetchOpinionsApi = async (body: OpinionsBodyGet) => {
  try {
    const response: FetchOpinionsSuccessPayloadType = await getApiRequest(
      `${BASE_URL}${OPINIONS_ENDPOINT}?page=${body.page}`,
    );
    // console.log(
    //   `Opinions url: ${BASE_URL}${OPINIONS_ENDPOINT}?page=${body.page} response: ${JSON.stringify(
    //     response,
    //   )}`,
    // );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};
