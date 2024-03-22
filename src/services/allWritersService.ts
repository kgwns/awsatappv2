import { BASE_URL, UMS_BASE_URL } from 'src/services/apiUrls';
import { getApiRequest, postApiRequest,getApiRequestWithoutAuth } from 'src/services/api';
import { ALL_WRITERS_ENDPOINT, SEND_SELECTED_WRITERS_ENDPOINT,GET_SELECTED_AUTHORS_ENDPOINT, REMOVE_WRITERS_ENDPOINT, ALL_SELECTED_WRITERS_ENDPOINT } from './apiEndPoints';
import {
    AllWritersBodyGet,
    SendSelectedAuthorBody,
    RemoveAuthorBody,
    AllSelectedWritersDetailsBodyGet,
} from 'src/redux/allWriters/types';

export const fetchAllWritersApi = async (body: AllWritersBodyGet) => {
    try {
        return await getApiRequest(
            `${BASE_URL}${ALL_WRITERS_ENDPOINT}?items_per_page=${body.items_per_page}`,
        );
    } catch (error) {
        console.log('allWritersService - fetchAllWritersApi - error', error)
        throw error;
    }
};


export const sendSelectedWritersApi = async (body: SendSelectedAuthorBody) => {

    try {            
        return await postApiRequest(
            `${UMS_BASE_URL}${SEND_SELECTED_WRITERS_ENDPOINT}${body.tid}`,
            body
        );
    } catch (error) {
        console.log('allWritersService - sendSelectedWritersApi - error', error)
        throw error;
    }
};

export const getSelectedAuthorsApi = async () => {
    try {           
        return await postApiRequest(
            `${UMS_BASE_URL}${GET_SELECTED_AUTHORS_ENDPOINT}`,
        );
    } catch (error) {
        console.log('allWritersService - getSelectedAuthorsApi - error', error)
        throw error;
    }
};

export const removeWritersApi = async (body: RemoveAuthorBody) => {

    try {            
        return await postApiRequest(
            `${UMS_BASE_URL}${REMOVE_WRITERS_ENDPOINT}${body.tid}`,
            body
        );
    } catch (error) {
        console.log('allWritersService - removeWritersApi - error', error)
        throw error;
    }
};

export const fetchAllSelectedWritersDataApi = async (body: AllSelectedWritersDetailsBodyGet) => {
    try {
        return await getApiRequestWithoutAuth(
            `${BASE_URL}${ALL_SELECTED_WRITERS_ENDPOINT}/${body.tid}?items_per_page=${body.items_per_page}`,
        );
    } catch (error) {
        console.log('allWritersService - fetchAllSelectedWritersDataApi - error', error)
        throw error;
    }
};
