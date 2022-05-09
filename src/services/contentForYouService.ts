import {BASE_URL} from 'src/services/apiUrls';
import {getApiRequest} from 'src/services/api';
import {FAVOURITE_OPINIONS_ENDPOINT,SECTION_ARTICLES} from './apiEndPoints';
import {
  FetchFavouriteOpinionsSuccessPayloadType,
  FavouriteOpinionsBodyGet,
  FavouriteArticlesBodyGet,
  FetchFavouriteArticlesSuccessPayloadType,
} from 'src/redux/contentForYou/types';
import { joinArray } from 'src/shared/utils/';

const getFavouriteOpinionUrl = (body:FavouriteOpinionsBodyGet) => {
  let url = `${BASE_URL}${FAVOURITE_OPINIONS_ENDPOINT}`
  if(body.authorsList){
    url += '/'+ joinArray(body.authorsList, '+');
  }
  return url
}

const getFavouriteArticleUrl = (body:FavouriteArticlesBodyGet) => {
  let url = `${BASE_URL}${SECTION_ARTICLES}`
  if(body.topicsList){
    url += '/'+ joinArray(body.topicsList, '+');
  }
  return url
}

export const fetchFavouriteOpinionsApi = async (body: FavouriteOpinionsBodyGet) => {
  try {
    const response: FetchFavouriteOpinionsSuccessPayloadType = await getApiRequest(
      getFavouriteOpinionUrl(body),
      {
        params: {
          page : body.page,
          items_per_page: body.items_per_page,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const fetchFavouriteArticleApi = async (body: FavouriteArticlesBodyGet) => {
  try {
    const response: FetchFavouriteArticlesSuccessPayloadType = await getApiRequest(
      getFavouriteArticleUrl(body),
      {
        params: {
          page : body.page,
          items_per_page: body.items_per_page,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};
