import { BASE_URL, TODOS } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import {
  HomeBodyType,
} from 'src/redux/home/types';

export const requestHomeApi = async (body: HomeBodyType) => {
  try {
    const response: string = await getApiRequest(
      `${BASE_URL}${TODOS}`,
    );
    return { homeData: response };
  } catch (error) {
    console.log('homeService - requestHomeApi - error', error)
    throw error;
  }
};
