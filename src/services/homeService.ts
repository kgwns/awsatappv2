import { BASE_URL, TODOS } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import {
  HomeBodyType,
  HomeSuccessPayloadType,
} from 'src/redux/home/types';

export const requestHomeApi = async (body: HomeBodyType) => {
  try {
    const response: string = await getApiRequest(
      `${BASE_URL}${TODOS}`,
    );
    console.log(
      `homeService url: ${BASE_URL}${TODOS} body: ${JSON.stringify(
        body,
      )} response: ${JSON.stringify(response)}`,
    );
    const responseData: HomeSuccessPayloadType = { homeData: response };
    return responseData;
  } catch (error) {
    throw error;
  }
};
