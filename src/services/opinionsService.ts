import {BASE_URL} from 'src/services/apiUrls';
import {getCacheApiRequest} from 'src/services/api';
import {HOME_OPINION_LIST_VIEW_END_POINT, OPINIONS_ENDPOINT, OPINION_BY_WRITER_END_POINT, OPINION_LIST_END_POINT} from './apiEndPoints';
import {
  OpinionsBodyGet,
  WriterOpinionsBodyGet,
} from 'src/redux/opinions/types';

export const fetchOpinionsApi = async (body: OpinionsBodyGet) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${OPINIONS_ENDPOINT}?page=${body.page}`,
    );
  } catch (error) {
    console.log('opinionService - fetchOpinionsApi - error', error)
    throw error;
  }
};

export const fetchWriterOpinionsApi = async (body: WriterOpinionsBodyGet) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${OPINION_BY_WRITER_END_POINT}${body.tid}?items_per_page=10&page=${body.page}`,
    );
  } catch (error) {
    console.log('opinionService - fetchWriterOpinionsApi - error', error)
    throw error;
  }
};

export const fetchOpinionsListApi = async (body: OpinionsBodyGet) => {
  const itemsPerPage = body.itemsPerPage ? body.itemsPerPage : 10;
  const page = body.page ? body.page : 0;
  const id = body.nid ? body.nid : 'all';
  try {
    const relativeUrl = body.byIdOpinions ? OPINIONS_ENDPOINT : OPINION_LIST_END_POINT
    const pagingQueryString = `?items_per_page=${itemsPerPage}&page=${page}`;
    const url = `${BASE_URL}${relativeUrl}${id}${pagingQueryString}`
    return await getCacheApiRequest(url);
  } catch (error) {
    console.log('opinionService - fetchOpinionsListApi - error', error)
    throw error;
  }
};

export const fetchHomeOpinionsListApi = async () => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${HOME_OPINION_LIST_VIEW_END_POINT}`,
    );
  } catch (error) {
    console.log('opinionService - fetchHomeOpinionsListApi - error', error)
    throw error;
  }
};
