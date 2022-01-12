import {BASE_URL, USERS} from 'src/services/apiUrls';
import {postApiRequest,getApiRequest} from 'src/services/api';
import {
  HomeBodyType,
  HomeSuccessPayloadType,
} from 'src/redux/home/types';

export const requestHomeApi = async (body: HomeBodyType) => {
  try {
    const response: string = await getApiRequest(
      `${BASE_URL}${USERS}`,
    );
    console.log(
      `homeService url: ${BASE_URL}${USERS} body: ${JSON.stringify(
        body,
      )} response: ${JSON.stringify(response)}`,
    );
    const responseData: HomeSuccessPayloadType = {homeData: response};
    return responseData;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};
