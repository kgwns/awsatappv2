import { GET_JW_MEDIA_PLAYER_URL } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import { NarratedOpinionBodyGet } from 'src/redux/opinionArticleDetail/types';

export const fetchNarratedOpinionArticleApi = async (body: NarratedOpinionBodyGet) => {
  try {
    const response: any = await getApiRequest(
      `${GET_JW_MEDIA_PLAYER_URL}${body.jwPlayerID}`
    );
    // console.log( `opinion jw audio url: ${GET_JW_MEDIA_PLAYER_URL}${mediaId} response: ${JSON.stringify(response)}`);
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};