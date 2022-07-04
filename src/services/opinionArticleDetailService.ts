import {BASE_URL} from 'src/services/apiUrls';
import {getCacheApiRequest} from 'src/services/api';
import {GET_RELATED_OPINION_ENDPOINT, OPINION_ARTICLE_DETAIL} from './apiEndPoints';
import {
  OpinionArticleDetailBodyGet,
  OpinionArticleDetailSuccessPayload,
  RelatedOpinionBodyGet,
  FetchRelatedOpinionSuccessPayloadType
} from 'src/redux/opinionArticleDetail/types';

export const requestOpinionArticleDetailAPI = async (
  body: OpinionArticleDetailBodyGet,
) => {
  try {
    const response: OpinionArticleDetailSuccessPayload = await getCacheApiRequest(
      `${BASE_URL}${OPINION_ARTICLE_DETAIL}${body.nid}`,
    );
    // console.log(`opinionArticleresponse: ${BASE_URL}${OPINION_ARTICLE_DETAIL}${body.nid}`,response);
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const fetchRelatedOpinionAPI = async (
  body: RelatedOpinionBodyGet,
) => {
  try {
    const response:FetchRelatedOpinionSuccessPayloadType  = await getCacheApiRequest(
      `${BASE_URL}${GET_RELATED_OPINION_ENDPOINT}?page=${body.page}`,
    );
    // console.log(`requestRelatedOpinionResponse: ${BASE_URL}${OPINION_ARTICLE_DETAIL}?page=${body.page}`,response);
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};
