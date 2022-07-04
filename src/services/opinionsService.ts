import {BASE_URL} from 'src/services/apiUrls';
import {getCacheApiRequest} from 'src/services/api';
import {OPINIONS_ENDPOINT, OPINION_BY_WRITER_END_POINT} from './apiEndPoints';
import {
  FetchOpinionsSuccessPayloadType,
  OpinionsBodyGet,
  WriterOpinionsBodyGet,
} from 'src/redux/opinions/types';

export const fetchOpinionsApi = async (body: OpinionsBodyGet) => {
  try {
    const response: FetchOpinionsSuccessPayloadType = await getCacheApiRequest(
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

export const fetchWriterOpinionsApi = async (body: WriterOpinionsBodyGet) => {
  try {
    const response: FetchOpinionsSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${OPINION_BY_WRITER_END_POINT}${body.tid}?items_per_page=10&page=${body.page}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};
