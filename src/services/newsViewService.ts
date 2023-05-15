import {BASE_URL} from 'src/services/apiUrls';
import {getApiRequest} from 'src/services/api';
import { NEWS_VIEW_ENDPOINT, ARTICLE_SUB_SECTION_ENDPOINT } from './apiEndPoints';
import {
  NewsViewBodyGet,
} from 'src/redux/newsView/types';

export const fetchNewsViewApi = async (body: NewsViewBodyGet) => {
  try {
    return await getApiRequest(
      `${BASE_URL}${NEWS_VIEW_ENDPOINT}/${body.sectionId}?items_per_page=${body.items_per_page}&page=${body.page}&offset=${body.offset}`,
    );
  } catch (error) {
    console.log('newsViewService - fetchNewsViewApi - error', error)
    throw error;
  }
};

export const fetchSubArticleSectionApi = async (body: NewsViewBodyGet) => {
  try {
    return await getApiRequest(
      `${BASE_URL}${ARTICLE_SUB_SECTION_ENDPOINT}/${body.sectionId}?items_per_page=${body.items_per_page}&page=${body.page}&offset=${body.offset}`,
    );
  } catch (error) {
    console.log('newsViewService - fetchSubArticleSectionApi - error', error)
    throw error;
  }
};
