import { getApiRequest } from 'src/services/api';
import { RequestVideoUrlPayload } from 'src/redux/videoList/types';
import { GET_JW_MEDIA_PLAYER_URL } from './apiUrls';

export const fetchVideoDetailInfo = async (payload: RequestVideoUrlPayload) => {
    try {
        return await getApiRequest(
            `${GET_JW_MEDIA_PLAYER_URL}${payload.mediaID}`,
        );
    } catch (error) {
        console.log('videoService - fetchVideoDetailInfo - error', error)
        throw error;
    }
};
