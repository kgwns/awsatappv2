import { BASE_URL, HOME_OPINIONS_GET } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import { LATEST_ARTICLE_GET, SECTION_COMBO, PODCAST_HOME,
  COVERAGE_ARTICLE_END_POINT,
  FEATURED_ARTICLE_ENDPOINT,
  HORIZONTAL_ARTICLE_END_POINT
} from './apiEndPoints';
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
  const query = body.items_per_page ? `/?item per page=${body.items_per_page}&page=${body.page}` : '/'
  try {
    const response: payloadType = await getApiRequest(
      `${BASE_URL}${SECTION_COMBO}/${body.id}${query}`
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
}

export const writerOpinionApi = async (body: LatestArticleBodyGet) => {
  try {
    const response: payloadType = await getApiRequest(
      `${BASE_URL}${HOME_OPINIONS_GET}?items_per_page=${body.items_per_page}&page=${body.page}&offset=${body.offset}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const podcastHomeApi = async () => {
  try {
    const response: payloadType = await getApiRequest(
      `${BASE_URL}${PODCAST_HOME}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const mainCoverageBlockApi = async () => {
  try {
    const response: payloadType = await getApiRequest(
      `${BASE_URL}${COVERAGE_ARTICLE_END_POINT}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const mainFeaturedArticleApi = async () => {
  try {
    const response: payloadType = await getApiRequest(
      `${BASE_URL}${FEATURED_ARTICLE_ENDPOINT}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const mainHorizontalArticleApi = async () => {
  try {
    const response: payloadType = await getApiRequest(
      `${BASE_URL}${HORIZONTAL_ARTICLE_END_POINT}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};