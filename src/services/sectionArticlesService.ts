import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { SECTION_ARTICLES } from './apiEndPoints';
import { FetchSectionArticlesSuccessPayloadType, SectionArticlesBodyGet } from 'src/redux/sectionArticles/types';

export const fetchSectionArticlesApi = async (body:SectionArticlesBodyGet) => {
  try {
    const response: FetchSectionArticlesSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${SECTION_ARTICLES}/${body.sectionId}?page=${body.page}`,
    );
    console.log( `SectionArticlesApi url: ${BASE_URL}${SECTION_ARTICLES}/${body.sectionId}?page=${body.page} response: ${JSON.stringify(response)}`, );
    return response;
  } catch (error) {
    throw error;
  }
};