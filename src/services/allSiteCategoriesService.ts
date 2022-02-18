import { BASE_URL } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import { ALL_SITE_CATEGORIES_ENDPOINT } from './apiEndPoints';
import {
    FetchAllSiteCategoriesListSuccessPayloadType,
    AllSiteCategoriesBodyGet,
} from 'src/redux/allSiteCategories/types';

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