import {BASE_URL} from 'src/services/apiUrls';
import {getCacheApiRequest} from 'src/services/api';
import {GET_RELATED_OPINION_ENDPOINT, OPINION_ARTICLE_DETAIL} from './apiEndPoints';
import {
  OpinionArticleDetailBodyGet,
  RelatedOpinionBodyGet,
} from 'src/redux/opinionArticleDetail/types';

export const requestOpinionArticleDetailAPI = async (
  body: OpinionArticleDetailBodyGet,
) => {
  try {    
    return await getCacheApiRequest(
      `${BASE_URL}${OPINION_ARTICLE_DETAIL}${body.nid}`,
    );
  } catch (error) {
    console.log('opinionArticleDetailService - requestOpinionArticleDetailAPI - error', error)
    throw error;
  }
};

export const fetchRelatedOpinionAPI = async (
  body: RelatedOpinionBodyGet,
) => {
  try {   
    return await getCacheApiRequest(
      `${BASE_URL}${GET_RELATED_OPINION_ENDPOINT}?page=${body.page}`,
    );
  } catch (error) {
    console.log('opinionArticleDetailService - fetchRelatedOpinionAPI - error', error)
    throw error;
  }
};
