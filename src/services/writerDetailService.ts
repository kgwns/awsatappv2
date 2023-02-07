import { getCacheApiRequest } from 'src/services/api';
import { WritersDetailBodyGet } from 'src/redux/writersDetail/types';
import { GET_WRITER_DETAIL_END_POINT } from './apiEndPoints';
import { BASE_URL } from './apiUrls';

export const fetchWriterDetailInfo = async (payload: WritersDetailBodyGet) => {
    try {
        const response = await getCacheApiRequest(
            `${BASE_URL}${GET_WRITER_DETAIL_END_POINT}${payload.tid}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};
