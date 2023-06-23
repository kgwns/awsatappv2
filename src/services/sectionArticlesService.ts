import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { SECTION_ARTICLES } from './apiEndPoints';
import { SectionArticlesBodyGet } from 'src/redux/sectionArticles/types';

export const fetchSectionArticlesApi = async (body:SectionArticlesBodyGet) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${SECTION_ARTICLES}/${body.sectionId}?page=${body.page}`,
    );
  } catch (error) {
    console.log('sectionArticleService - fetchSectionArticlesApi - error', error)
    throw error;
  }
}
