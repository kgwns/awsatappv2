import { BASE_URL, UMS_BASE_URL } from 'src/services/apiUrls';
import { getApiRequest, postApiRequest } from 'src/services/api';
import { ALL_WRITERS_ENDPOINT, SEND_SELECTED_WRITERS_ENDPOINT,GET_SELECTED_AUTHORS_ENDPOINT } from './apiEndPoints';
import {
    FetchAllWritersListSuccessPayloadType,
    AllWritersBodyGet,
    SendSelectedAuthorBody,
    SendSelectedAuthorSuccessPayloadType,
    GetSelectedAuthorSuccessPayloadType,
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


export const sendSelectedWritersApi = async (body: SendSelectedAuthorBody) => {

    try {
        const response: SendSelectedAuthorSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${SEND_SELECTED_WRITERS_ENDPOINT}${body.tid}`,
                body
            );
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};

export const getSelectedAuthorsApi = async () => {
    try {
        const response: GetSelectedAuthorSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${GET_SELECTED_AUTHORS_ENDPOINT}`,
            );
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};