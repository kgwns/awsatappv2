import { getCacheApiRequest } from 'src/services/api';
import { WritersDetailBodyGet } from 'src/redux/writersDetail/types';
import { GET_WRITER_DETAIL_END_POINT } from './apiEndPoints';
import { BASE_URL } from './apiUrls';

export const fetchWriterDetailInfo = async (payload: WritersDetailBodyGet) => {
    try {
        return await getCacheApiRequest(
            `${BASE_URL}${GET_WRITER_DETAIL_END_POINT}${payload.tid}`,
        );
    } catch (error) {
        console.log('writerDetailService - fetchWriterDetailInfo - error', error)
        throw error;
    }
};
