import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { JOURNALIST_ARTICLE_ENDPOINT } from './apiEndPoints';
import { GetJournalistInfoPayload } from 'src/redux/journalist/types';

export const getJournalistArticleService = async (body: GetJournalistInfoPayload) => {
    try {
        const response: { message: any } = await getCacheApiRequest(
            `${BASE_URL}${JOURNALIST_ARTICLE_ENDPOINT}${body.nid}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};