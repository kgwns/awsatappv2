import { getCacheApiRequest } from 'src/services/api';
import { JournalistDetailBodyGet } from 'src/redux/journalist/types';
import { GET_JOURNALIST_DETAIL_END_POINT } from './apiEndPoints';
import { BASE_URL } from './apiUrls';

export const fetchJournalistDetailInfo = async (payload: JournalistDetailBodyGet) => {
    try {
        return await getCacheApiRequest(
            `${BASE_URL}${GET_JOURNALIST_DETAIL_END_POINT}${payload.tid}`,
        );
    } catch (error) {
        console.log('journalistDetailService - fetchJournalistDetailInfo - error', error)
        throw error;
    }
};
