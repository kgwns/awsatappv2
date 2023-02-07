import { getCacheApiRequest } from 'src/services/api';
import { RequestDocumentaryVideoPayload } from 'src/redux/documentaryVideo/types';
import { BASE_URL } from 'src/services/apiUrls';
import { DOCUMENTARY_VIDEO_ENDPOINT } from './apiEndPoints';

export const fetchDocumentaryVideo = async (payload: RequestDocumentaryVideoPayload) => {
    try {
        const response: any = await getCacheApiRequest(
            `${BASE_URL}${DOCUMENTARY_VIDEO_ENDPOINT}`,
            {
              params: {
                page : payload.page,
                items_per_page: payload.items_per_page,
              },
            },
          );
        return response;
    } catch (error) {
        throw error;
    }
};
