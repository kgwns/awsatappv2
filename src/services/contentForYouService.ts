import {BASE_URL} from 'src/services/apiUrls';
import {getApiRequest} from 'src/services/api';
import {FAVOURITE_OPINIONS_ENDPOINT,CONTENT_FOR_YOU_ARTICLE_ENDPOINT} from './apiEndPoints';
import {
  FavouriteOpinionsBodyGet,
  FavouriteArticlesBodyGet,
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
  let url = `${BASE_URL}${CONTENT_FOR_YOU_ARTICLE_ENDPOINT}`
  if(body.topicsList){
    url += '/'+ joinArray(body.topicsList, '+');
  }
  return url
}

export const fetchFavouriteOpinionsApi = async (body: FavouriteOpinionsBodyGet) => {
  try {
    return await getApiRequest(
      getFavouriteOpinionUrl(body),
      {
        params: {
          page : body.page,
          items_per_page: body.items_per_page,
        },
      },
    );
  } catch (error) {
    console.log('contentForYouService - fetchFavouriteOpinionsApi - error', error)
    throw error;
  }
};

export const fetchFavouriteArticleApi = async (body: FavouriteArticlesBodyGet) => {
  try {
    return await getApiRequest(
      getFavouriteArticleUrl(body),
      {
        params: {
          page : body.page,
          items_per_page: body.items_per_page,
        },
      },
    );
  } catch (error) {
    console.log('contentForYouService - fetchFavouriteArticleApi - error', error)
    throw error;
  }
};
