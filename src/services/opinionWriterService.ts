import {BASE_URL} from 'src/services/apiUrls';
import {getCacheApiRequest} from 'src/services/api';
import {OPINION_TAB_WRITER_ENDPOINT} from './apiEndPoints';
import {
  FetchOpinionWriterListSuccessPayloadType,
  WritersBodyGet,
} from 'src/redux/writers/types';

export const fetchOpinionWriterApi = async (body: WritersBodyGet) => {
  try {
    const response: FetchOpinionWriterListSuccessPayloadType =
      await getCacheApiRequest(
        `${BASE_URL}${OPINION_TAB_WRITER_ENDPOINT}?items_per_page=${body.items_per_page}`,
      );
    // // console.log(
    // //   `OpinionWriter url: ${BASE_URL}${OPINION_TAB_WRITER_ENDPOINT}?items_per_page=${body.items_per_page} response: ${JSON.stringify(
    // //     response,
    // //   )}`,
    // // );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};
