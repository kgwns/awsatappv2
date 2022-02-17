import { BASE_URL } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import { ALL_WRITERS_ENDPOINT } from './apiEndPoints';
import {
    FetchAllWritersListSuccessPayloadType,
    AllWritersBodyGet,
} from 'src/redux/allWriters/types';

export const fetchAllWritersApi = async (body: AllWritersBodyGet) => {
    try {
        const response: FetchAllWritersListSuccessPayloadType =
            await getApiRequest(
                `${BASE_URL}${ALL_WRITERS_ENDPOINT}?items_per_page=${body.items_per_page}`,
            );
        // console.log(`AllWriters url: ${BASE_URL}${ALL_WRITERS_ENDPOINT}?items_per_page=${body.items_per_page} response: ${JSON.stringify(response)}`);
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};