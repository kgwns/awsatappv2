import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest, getApiRequest } from 'src/services/api';
import { SEND_SELECTED_NEWS_LETTERS_ENDPOINT, GET_SELECTED_NEWS_LETTERS_ENDPOINT, GET_MY_NEWS_LETTERS_ENDPOINT } from './apiEndPoints';
import { GetSelectedNewsLettersSuccessPayloadType, SendSelectedNewsLettersBody, SendSelectedNewsLettesrsSuccessPayloadType } from 'src/redux/newsLetter/types';

export const sendSelectedNewsLettersApi = async (body: SendSelectedNewsLettersBody) => {

    try {
        const response: SendSelectedNewsLettesrsSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${SEND_SELECTED_NEWS_LETTERS_ENDPOINT}${body.tid}`,
                body
            );
        console.log(`${UMS_BASE_URL}${SEND_SELECTED_NEWS_LETTERS_ENDPOINT}${body.tid}`,body);
        
        return response;
    } catch (error) {
        throw error;
    }
};

export const getSelectedNewsLettersApi = async () => {
    try {
        const response: GetSelectedNewsLettersSuccessPayloadType =
            await getApiRequest(
                `${UMS_BASE_URL}${GET_SELECTED_NEWS_LETTERS_ENDPOINT}`,
            );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getMyNewsLettersApi = async () => {
    try {
        const response: GetSelectedNewsLettersSuccessPayloadType =
            await postApiRequest(
                `${UMS_BASE_URL}${GET_MY_NEWS_LETTERS_ENDPOINT}`,
            );
        return response;
    } catch (error) {
        throw error;
    }
};
