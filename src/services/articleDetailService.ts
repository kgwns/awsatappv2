import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { ARTICLE_DETAIL_GET, ARTICLE_NEXT_GET, GET_JOURNALIST_DETAIL_END_POINT, RELATED_ARTICLE_GET } from './apiEndPoints';
import { ArticleDetailBodyGet, ArticleSectionBodyGet, JournalistDetailBodyGet, RelatedArticleBodyGet } from 'src/redux/articleDetail/types';

export const requestArticleDetail = async (body: ArticleDetailBodyGet) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${ARTICLE_DETAIL_GET}${body.nid}`,
    );
  } catch (error) {
    console.log('articleDetailService - requestArticleDetail - error', error)
    throw error;
  }
};

export const requestRelatedArticle = async (body: RelatedArticleBodyGet) => {
  try {
    const params = body.tid ? body.tid : body.nid
    const url = `${BASE_URL}${RELATED_ARTICLE_GET}${params}?items_per_page=${50}`
    return await getCacheApiRequest(
      url,
    );
  } catch (error) {
    console.log('articleDetailService - requestRelatedArticle - error', error)
    throw error;
  }
};

export const requestArticleSection = async (body: ArticleSectionBodyGet) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${ARTICLE_NEXT_GET}${body.id}?page=${body.page}&items_per_page=${body.items_per_page}`,
    );
  } catch (error) {
    console.log('articleDetailService - requestArticleSection - error', error)
    throw error;
  }
};

export const requestJournalistDetail = async (body: JournalistDetailBodyGet) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${GET_JOURNALIST_DETAIL_END_POINT}${body.jor_id}`,
    );
  } catch (error) {
    console.log('articleDetailService - requestJournalistDetail - error', error)
    throw error;
  }
};
