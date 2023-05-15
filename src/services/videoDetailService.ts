import { AxiosError } from 'axios';
import { getCacheApiRequest } from 'src/services/api';
import { BASE_URL } from 'src/services/apiUrls';
import { VideoItemType } from 'src/redux/videoList/types';
import { VIDEO_DETAIL_ENDPOINT } from './apiEndPoints';
import { isNonEmptyArray } from 'src/shared/utils';

export interface FetchVideoDetailPayload {
    nid: string;
}

const handleAxiosError = (error: any) => {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
        const errorMessage: { message: string } = errorResponse.response.data;
        console.log("🚀 handleAxiosError ~ errorMessage", errorMessage)
    }
}

const parseVideoDetailData = (response: any) => {
    let responseData: VideoItemType[] = [];

    if (response && isNonEmptyArray(response.rows)) {
        responseData = response.rows;
    }
    return responseData
}

export const fetchVideoDetail = async (payload: FetchVideoDetailPayload) => {
    try {
        return await getCacheApiRequest(
            `${BASE_URL}${VIDEO_DETAIL_ENDPOINT}${payload.nid}`
        );
    } catch (error) {
        console.log('videoDetailService - fetchVideoDetail - error', error)
        throw error;
    }
};

export const getVideoDetail = async (payload: FetchVideoDetailPayload) => {
    try {
        const response = await fetchVideoDetail(payload)
        return parseVideoDetailData(response)
    } catch (error) {
        handleAxiosError(error)
        return []
    }
}
