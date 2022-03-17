import { GET_JW_MEDIA_PLAYER_URL } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';

export const fetchNarratedOpinionArticleApi = async (mediaId: string) => {
  try {
    const response: any = await getApiRequest(
      `${GET_JW_MEDIA_PLAYER_URL}${mediaId}`
    );
    // console.log( `opinion jw audio url: ${GET_JW_MEDIA_PLAYER_URL}${mediaId} response: ${JSON.stringify(response)}`);
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};