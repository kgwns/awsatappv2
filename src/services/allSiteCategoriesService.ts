import { BASE_URL, UMS_BASE_URL } from 'src/services/apiUrls';
import { getApiRequest, postApiRequest } from 'src/services/api';
import { ALL_SITE_CATEGORIES_ENDPOINT, ADD_YOUR_TOPICS_ENDPOINT,GET_SELECTED_TOPICS_ENDPOINT } from './apiEndPoints';
import {
    AllSiteCategoriesBodyGet,
    SendSelectedTopicBody,
} from 'src/redux/allSiteCategories/types';

export const fetchAllSiteCategoriesApi = async (body: AllSiteCategoriesBodyGet) => {
    try {            
        return await getApiRequest(
            `${BASE_URL}${ALL_SITE_CATEGORIES_ENDPOINT}`, // removed items_per_page due to different data response
        );
    } catch (error) {
        console.log('allSiteCategoriesService - fetchAllSiteCategoriesApi - error', error)
        throw error;
    }
};
export const sendSelectedTopicsApi = async (body: SendSelectedTopicBody) => {
    try {            
        return await postApiRequest(
            `${UMS_BASE_URL}${ADD_YOUR_TOPICS_ENDPOINT}${body.tid}`,
            body
        );
    } catch (error) {
        console.log('allSiteCategoriesService - sendSelectedTopicsApi - error', error)
        throw error;
    }
};

export const getSelectedTopicsApi = async () => {
    try {           
        return await postApiRequest(
            `${UMS_BASE_URL}${GET_SELECTED_TOPICS_ENDPOINT}`,
        );
    } catch (error) {
        console.log('allSiteCategoriesService - getSelectedTopicsApi - error', error)
        throw error;
    }
};
