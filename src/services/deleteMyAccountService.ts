import { BASE_URL, UMS_BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest, postApiRequest } from 'src/services/api';
import { DMA_INTRODUCTION_ENDPOINT, DMA_LIST_ENDPOINT, DMA_FEEDBACK_ENDPOINT, DMA_DELETE_CONFIRMATION_ENDPOINT } from './apiEndPoints';
import { DeleteRequestBodyPayload } from 'src/redux/deleteMyAccount/types';

export const fetchDMAIntroductionApi = async () => {
    try {
        return await getCacheApiRequest(
            `${BASE_URL}${DMA_INTRODUCTION_ENDPOINT}`,
        );
    } catch (error) {
        console.log('deleteMyAccountService-fetchDMAIntroductionApi - error', error)
        throw error;
    }
};

export const fetchDMAOptionsListApi = async () => {
    try {
        return await getCacheApiRequest(
            `${UMS_BASE_URL}${DMA_LIST_ENDPOINT}`,
        );
    } catch (error) {
        console.log('deleteMyAccountService-fetchDMAOptionsListApi - error', error)
    }
}

export const fetchDMAConfirmInfo = async () => {
    try {
        return await getCacheApiRequest(
            `${BASE_URL}${DMA_FEEDBACK_ENDPOINT}`,
        );
    } catch (error) {
        console.log('deleteMyAccountService-fetchDMAConfirmInfo - error', error)
        throw error;
    }
};

export const makeConfirmDeleteRequest = async (body: DeleteRequestBodyPayload) => {
    try {
        return await postApiRequest(
            `${UMS_BASE_URL}${DMA_DELETE_CONFIRMATION_ENDPOINT}`, body
        );
    } catch (error) {
        console.log('deleteMyAccountService-makeConfirmDeleteRequest - error', error)
        throw error;
    }
};
