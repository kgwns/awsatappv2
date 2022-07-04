import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { INFO } from './apiEndPoints';
import { payloadType } from 'src/redux/latestNews/types';
import { StaticDetailBodyGet } from 'src/redux/termsAndAboutUs/types';

export const requestStaticDetail = async (body: StaticDetailBodyGet) => {
  try {
    const response: payloadType = await getCacheApiRequest(
      `${BASE_URL}${INFO}${body.id}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};