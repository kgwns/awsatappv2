import { getApiRequest } from 'src/services/api';
import { RequestVideoUrlPayload } from 'src/redux/videoList/types';
import { GET_VIDEO_SOURCE_END_POINT } from './apiEndPoints';

export const fetchVideoDetailInfo = async (payload: RequestVideoUrlPayload) => {
    try {
        const response = await getApiRequest(
            `${GET_VIDEO_SOURCE_END_POINT}${payload.mediaID}`,
        );
        return response;
    } catch (error) {
        console.log(`error: ${error}`);
        throw error;
    }
};