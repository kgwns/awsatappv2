import { BASE_URL, UMS_BASE_URL } from 'src/services/apiUrls';
import { getApiRequest, postApiRequest } from 'src/services/api';
import { ALL_SITE_CATEGORIES_ENDPOINT, ADD_YOUR_TOPICS_ENDPOINT,GET_SELECTED_TOPICS_ENDPOINT } from './apiEndPoints';
import {
    FetchAllSiteCategoriesListSuccessPayloadType,
    AllSiteCategoriesBodyGet,
    SendSelectedTopicBody,
    SendSelectedTopicSuccessPayloadType,
    GetSelectedTopicsSuccessPayloadType
} from 'src/redux/allSiteCategories/types';

export const fetchAllSiteCategoriesApi = async (body: AllSiteCategoriesBodyGet) => {
    try {
        const response: FetchAllSiteCategoriesListSuccessPayloadType =
            await getApiRequest(
                `${BASE_URL}${ALL_SITE_CATEGORIES_ENDPOINT}`, // removed items_per_page due to different data response
            );
        return response;
    } catch (error) {
        console.log('allSiteCategoriesService - fetchAllSiteCategoriesApi - error', error)
        throw error;
    }
};
export const sendSelectedTopicsApi = async (body: SendSelectedTopicBody) => {
    try {
        const response: SendSelectedTopicSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${ADD_YOUR_TOPICS_ENDPOINT}${body.tid}`,
                body
            );
        return response;
    } catch (error) {
        console.log('allSiteCategoriesService - sendSelectedTopicsApi - error', error)
        throw error;
    }
};

export const getSelectedTopicsApi = async () => {
    try {
        const response: GetSelectedTopicsSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${GET_SELECTED_TOPICS_ENDPOINT}`,
            );
        return response;
    } catch (error) {
        console.log('allSiteCategoriesService - getSelectedTopicsApi - error', error)
        throw error;
    }
};