import { BASE_URL, UMS_BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { DMA_INTRODUCTION_ENDPOINT, DMA_LIST_ENDPOINT } from './apiEndPoints';
import { FetchDMAIntroductionSuccessPayloadType, FetchDMAOptionsListSuccessPayloadType } from 'src/redux/deleteMyAccount/types';

export const fetchDMAIntroductionApi = async () => {
    try {
        const response: FetchDMAIntroductionSuccessPayloadType = await getCacheApiRequest(
            `${BASE_URL}${DMA_INTRODUCTION_ENDPOINT}`,
        );
        return response;
    } catch (error) {
        console.log('deleteMyAccountService-fetchDMAIntroductionApi - error', error)
        throw error;
    }
};

export const fetchDMAOptionsListApi = async () => {
    try {
        const response: FetchDMAOptionsListSuccessPayloadType = await getCacheApiRequest(
            `${UMS_BASE_URL}${DMA_LIST_ENDPOINT}`,
        );
        return response;
    } catch (error) {
        console.log('deleteMyAccountService-fetchDMAOptionsListApi - error', error)
        throw error;
    }
};
