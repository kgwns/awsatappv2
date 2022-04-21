import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { ARTICLE_DETAIL_GET, RELATED_ARTICLE_GET } from './apiEndPoints';
import { FetchMostReadSuccessPayloadType } from 'src/redux/mostRead/types';
import { ArticleDetailBodyGet, RelatedArticleBodyGet } from 'src/redux/articleDetail/types';

export const requestArticleDetail = async (body: ArticleDetailBodyGet) => {
  try {
    const response: FetchMostReadSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${ARTICLE_DETAIL_GET}${body.nid}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const requestRelatedArticle = async (body: RelatedArticleBodyGet) => {
  try {
    const response: FetchMostReadSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${RELATED_ARTICLE_GET}${body.tid}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};