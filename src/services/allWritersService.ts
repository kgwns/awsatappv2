import { BASE_URL, UMS_BASE_URL } from 'src/services/apiUrls';
import { getApiRequest, postApiRequest } from 'src/services/api';
import { ALL_WRITERS_ENDPOINT, SEND_SELECTED_WRITERS_ENDPOINT,GET_SELECTED_AUTHORS_ENDPOINT } from './apiEndPoints';
import {
    FetchAllWritersListSuccessPayloadType,
    AllWritersBodyGet,
    SendSelectedAuthorBody,
    SendSelectedAuthorSuccessPayloadType,
} from 'src/redux/allWriters/types';
import { AxiosRequestHeaders } from 'axios';
import { store } from 'src/redux/store';

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
    const { token } = store.getState().login.loginData
    let header: AxiosRequestHeaders | undefined = undefined
    if (token) {
        const type = `${token.token_type} ` || 'Bearer '
        const accessToken = token.access_token
        header = {
            Authorization: type + accessToken
        }
    }

    try {
        const response: SendSelectedAuthorSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${SEND_SELECTED_WRITERS_ENDPOINT}${body.tid}`,
                body, undefined, header
            );
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};

export const getSelectedAuthorsApi = async () => {
    const { token } = store.getState().login.loginData
    let header: AxiosRequestHeaders | undefined = undefined
    if (token) {
        const type = `${token.token_type} ` || 'Bearer '
        const accessToken = token.access_token
        header = {
            Authorization: type + accessToken
        }
    }
    try {
        const response: SendSelectedAuthorSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${GET_SELECTED_AUTHORS_ENDPOINT}`,
                  undefined,undefined,header
            );
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};