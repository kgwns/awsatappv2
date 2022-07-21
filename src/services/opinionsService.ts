import {BASE_URL} from 'src/services/apiUrls';
import {getCacheApiRequest} from 'src/services/api';
import {HOME_OPINION_LIST_VIEW_END_POINT, OPINIONS_ENDPOINT, OPINION_BY_WRITER_END_POINT, OPINION_LIST_ALL_END_POINT, OPINION_LIST_END_POINT} from './apiEndPoints';
import {
  FetchOpinionsSuccessPayloadType,
  OpinionsBodyGet,
  OpinionsListBodyGet,
  WriterOpinionsBodyGet,
} from 'src/redux/opinions/types';
import { isNotEmpty } from 'src/shared/utils';

export const fetchOpinionsApi = async (body: OpinionsBodyGet) => {
  try {
    const response: FetchOpinionsSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${OPINIONS_ENDPOINT}?page=${body.page}`,
    );
    return response;
  } catch (error) {
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
    throw error;
  }
};

export const fetchOpinionsListApi = async (body: OpinionsListBodyGet) => {
  try {
    const relativeUrl = isNotEmpty(body.nid) ? `${OPINION_LIST_END_POINT}${body.nid}?page=${body.page}` : OPINION_LIST_ALL_END_POINT
    const response: FetchOpinionsSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${relativeUrl}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchHomeOpinionsListApi = async () => {
  try {
    const response: FetchOpinionsSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${HOME_OPINION_LIST_VIEW_END_POINT}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
