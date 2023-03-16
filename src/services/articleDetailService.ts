import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { ARTICLE_DETAIL_GET, ARTICLE_NEXT_GET, GET_JOURNALIST_DETAIL_END_POINT, RELATED_ARTICLE_GET } from './apiEndPoints';
import { FetchMostReadSuccessPayloadType } from 'src/redux/mostRead/types';
import { ArticleDetailBodyGet, ArticleSectionBodyGet, JournalistDetailBodyGet, JournalistDetailSuccessPayload, RelatedArticleBodyGet } from 'src/redux/articleDetail/types';

export const requestArticleDetail = async (body: ArticleDetailBodyGet) => {
  try {
    const response: FetchMostReadSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${ARTICLE_DETAIL_GET}${body.nid}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestRelatedArticle = async (body: RelatedArticleBodyGet) => {
  try {
    const params = body.tid ? body.tid : body.nid
    const url = `${BASE_URL}${RELATED_ARTICLE_GET}${params}?items_per_page=${50}`
    const response: FetchMostReadSuccessPayloadType = await getCacheApiRequest(
      url,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestArticleSection = async (body: ArticleSectionBodyGet) => {
  try {
    const response: FetchMostReadSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${ARTICLE_NEXT_GET}${body.id}?page=${body.page}&items_per_page=${body.items_per_page}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestJournalistDetail = async (body: JournalistDetailBodyGet) => {
  try {
    const response: JournalistDetailSuccessPayload = await getCacheApiRequest(
      `${BASE_URL}${GET_JOURNALIST_DETAIL_END_POINT}${body.jor_id}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
