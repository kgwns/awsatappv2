import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { MOST_READ_ENDPOINT_NEW } from './apiEndPoints';
import { FetchMostReadArticlesSuccessPayloadType } from 'src/redux/mostRead/types';
import moment from "moment";
import { isNonEmptyArray, isNotEmpty } from 'src/shared/utils';
import { requestArticleDetail } from './articleDetailService';

export enum PromiseType {
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

export const fetchMostReadApi = async () => {
  const today = moment(new Date()).locale('en').format('YYYYMMDD');
  try {
    const response: FetchMostReadArticlesSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${MOST_READ_ENDPOINT_NEW}?${today}`,
    );
    const returnResponse:any = [];
    if(response.articles && isNonEmptyArray(response.articles.list)){
      await Promise.allSettled(
        response.articles.list.map(async (item: any) => {
            const nid = item.url.split('/')[2];
            if(isNotEmpty(nid)){
              const detailResponse = await requestArticleDetail({nid});
              return detailResponse;
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
