import { getApiRequest } from 'src/services/api';
import { WritersDetailBodyGet } from 'src/redux/writersDetail/types';
import { ALL_WRITERS_ENDPOINT } from './apiEndPoints';
import { BASE_URL } from './apiUrls';

export const fetchWriterDetailInfo = async (payload: WritersDetailBodyGet) => {
    try {
        const response = await getApiRequest(
            `${BASE_URL}${ALL_WRITERS_ENDPOINT}/${payload.tid}`,
        );
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};