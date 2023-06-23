import { getCacheApiRequest } from 'src/services/api';
import { MOST_READ_ENDPOINT_NEW } from './apiEndPoints';
import { FetchMostReadArticlesSuccessPayloadType } from 'src/redux/mostRead/types';
import { isNonEmptyArray, isNotEmpty } from 'src/shared/utils';
import { requestArticleDetail } from './articleDetailService';

export enum PromiseType {
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

export const fetchMostReadApi = async () => {
  const config = {
    headers: {
      origin: 'https://aawsat.com/',
      referer: 'https://aawsat.com/',
    }
  }
  try {
    const response: FetchMostReadArticlesSuccessPayloadType[] = await getCacheApiRequest(
      `${MOST_READ_ENDPOINT_NEW}?`, config
    );
    const returnResponse: any = [];
    if (response && isNonEmptyArray(response)) {
      await Promise.allSettled(
        response.map(async (item: any) => {
          const nid = item.articleId;
          if (isNotEmpty(nid)) {
            return await requestArticleDetail({ nid });
          }
        })
      ).then((data: any) => {
        data.forEach((item: any) => {
          if (item.status == PromiseType.fulfilled && item.value && isNonEmptyArray(item.value.rows)) {
            returnResponse.push(item.value.rows[0]);
          }
        });
      });
    }
    return returnResponse;
  } catch (error) {
    console.log('mostReadService-fetchMostReadApi - error', error)
    throw error;
  }
};
