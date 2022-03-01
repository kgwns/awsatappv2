import {BASE_URL} from 'src/services/apiUrls';
import {getApiRequest} from 'src/services/api';
import {OPINION_ARTICLE_DETAIL} from './apiEndPoints';
import {
  OpinionArticleDetailBodyGet,
  OpinionArticleDetailSuccessPayload,
} from 'src/redux/opinionArticleDetail/types';

export const requestOpinionArticleDetailAPI = async (
  body: OpinionArticleDetailBodyGet,
) => {
  try {
    const response: OpinionArticleDetailSuccessPayload = await getApiRequest(
      `${BASE_URL}${OPINION_ARTICLE_DETAIL}${body.nid}`,
    );
    console.log(`opinionArticleresponse: ${BASE_URL}${OPINION_ARTICLE_DETAIL}${body.nid}`,response);
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};
