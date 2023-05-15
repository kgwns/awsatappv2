import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest, getApiRequest } from 'src/services/api';
import { SEND_SELECTED_NEWS_LETTERS_ENDPOINT, GET_SELECTED_NEWS_LETTERS_ENDPOINT, GET_MY_NEWS_LETTERS_ENDPOINT } from './apiEndPoints';
import { SendSelectedNewsLettersBody } from 'src/redux/newsLetter/types';

export const sendSelectedNewsLettersApi = async (body: SendSelectedNewsLettersBody) => {

    try {
        return await postApiRequest(
            `${UMS_BASE_URL}${SEND_SELECTED_NEWS_LETTERS_ENDPOINT}${body.tid}`,
            body
        );
    } catch (error) {
        console.log('newsLettersService - sendSelectedNewsLettersApi - error', error)
        throw error;
    }
};

export const getSelectedNewsLettersApi = async () => {
    try {            
        return await getApiRequest(
            `${UMS_BASE_URL}${GET_SELECTED_NEWS_LETTERS_ENDPOINT}`,
        );
    } catch (error) {
        console.log('newsLettersService - getSelectedNewsLettersApi - error', error)
        throw error;
    }
};

export const getMyNewsLettersApi = async () => {
    try {            
        return await postApiRequest(
            `${UMS_BASE_URL}${GET_MY_NEWS_LETTERS_ENDPOINT}`,
        );
    } catch (error) {
        console.log('newsLettersService - getMyNewsLettersApi - error', error)
        throw error;
    }
};
