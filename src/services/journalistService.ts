import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { JOURNALIST_ARTICLE_ENDPOINT } from './apiEndPoints';
import { GetJournalistInfoPayload } from 'src/redux/journalist/types';

export const getJournalistArticleService = async (body: GetJournalistInfoPayload) => {
    try {
        return await getCacheApiRequest(
            `${BASE_URL}${JOURNALIST_ARTICLE_ENDPOINT}${body.nid}?items_per_page=10&page=${body.page}`,
        );
    } catch (error) {
        console.log('journalistService - getJournalistArticleService - error', error)
        throw error;
    }
};
