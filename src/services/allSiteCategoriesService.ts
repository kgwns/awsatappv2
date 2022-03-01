import { BASE_URL, UMS_BASE_URL } from 'src/services/apiUrls';
import { getApiRequest, postApiRequest } from 'src/services/api';
import { ALL_SITE_CATEGORIES_ENDPOINT, ADD_YOUR_TOPICS_ENDPOINT } from './apiEndPoints';
import {
    FetchAllSiteCategoriesListSuccessPayloadType,
    AllSiteCategoriesBodyGet,
    SendSelectedTopicBody,
    SendSelectedTopicSuccessPayloadType
} from 'src/redux/allSiteCategories/types';
import { AxiosRequestHeaders } from 'axios';
import { store } from 'src/redux/store';

export const fetchAllSiteCategoriesApi = async (body: AllSiteCategoriesBodyGet) => {
    try {
        const response: FetchAllSiteCategoriesListSuccessPayloadType =
            await getApiRequest(
                `${BASE_URL}${ALL_SITE_CATEGORIES_ENDPOINT}?items_per_page=${body.items_per_page}`,
            );
        // console.log(`AllSiteCategories url: ${BASE_URL}${ALL_SITE_CATEGORIES_ENDPOINT}?items_per_page=${body.items_per_page} response: ${JSON.stringify(response)}`);
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};
export const sendSelectedTopicsApi = async (body: SendSelectedTopicBody) => {
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
        const response: SendSelectedTopicSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${ADD_YOUR_TOPICS_ENDPOINT}${body.tid}`,
                body, undefined, header
            );
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};