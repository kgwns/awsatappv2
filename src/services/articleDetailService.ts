import { BASE_URL } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import { ARTICLE_DETAIL_GET } from './apiEndPoints';
import { FetchMostReadSuccessPayloadType } from 'src/redux/mostRead/types';
import { ArticleDetailBodyGet } from 'src/redux/articleDetail/types';

export const requestArticleDetail = async (body: ArticleDetailBodyGet) => {
  try {
    const response: FetchMostReadSuccessPayloadType = await getApiRequest(
      `${BASE_URL}${ARTICLE_DETAIL_GET}${body.nid}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};