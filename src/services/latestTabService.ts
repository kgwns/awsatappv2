import { BASE_URL } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import { LATEST_ARTICLE_GET, SECTION_COMBO } from './apiEndPoints';
import { LatestArticleBodyGet, RequestSectionComboBodyGet } from 'src/redux/latestNews/types';
import { payloadType } from 'src/redux/latestNews/types';

export const requestLatestArticle = async (body: LatestArticleBodyGet) => {
  try {
    const response: payloadType = await getApiRequest(
      `${BASE_URL}${LATEST_ARTICLE_GET}?items_per_page=${body.items_per_page}&page=${body.page}&offset=${body.offset}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const requestSectionCombo = async(body: RequestSectionComboBodyGet) => {
  try {
    const response: payloadType = await getApiRequest(
      `${BASE_URL}${SECTION_COMBO}/${body.id}`
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
}