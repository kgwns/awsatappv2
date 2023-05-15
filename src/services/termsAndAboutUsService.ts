import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { INFO } from './apiEndPoints';
import { StaticDetailBodyGet } from 'src/redux/termsAndAboutUs/types';

export const requestStaticDetail = async (body: StaticDetailBodyGet) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${INFO}${body.id}`,
    );
  } catch (error) {
    console.log('termsAndAboutUsService - requestStaticDetail - error', error)
    throw error;
  }
};
