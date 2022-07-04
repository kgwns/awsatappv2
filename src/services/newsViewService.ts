import {BASE_URL} from 'src/services/apiUrls';
import {getApiRequest} from 'src/services/api';
import {NEWS_VIEW_ENDPOINT} from './apiEndPoints';
import {
  NewsViewBodyGet,
} from 'src/redux/newsView/types';

export const fetchNewsViewApi = async (body: NewsViewBodyGet) => {
  try {
    const response: any = await getApiRequest(
      `${BASE_URL}${NEWS_VIEW_ENDPOINT}/${body.sectionId}?items_per_page=${body.items_per_page}&page=${body.page}&offset=${body.offset}`,
    );
    // console.log(
    //   `NewsView url: ${BASE_URL}${NEWS_VIEW_ENDPOINT}?items_per_page=${body.items_per_page}&page=${body.page}&offset=${body.offset} response: ${JSON.stringify(
    //     response,
    //   )}`,
    // );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};
