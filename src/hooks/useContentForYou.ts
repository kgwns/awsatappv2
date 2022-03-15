import {useDispatch, useSelector} from 'react-redux';
import {
  getFavouriteOpinionsData,
  getIsLoading,
  getFavouriteOpinionsError,
  getFavouriteArticlesData,
  getArticleLoading,
  getFavouriteArticlesError,
} from 'src/redux/contentForYou/selectors';
import {fetchFavouriteOpinions,fetchFavouriteArticles,emptyData} from 'src/redux/contentForYou/action';
import {
  FavouriteOpinionsBodyGet,
  OpinionsListItemType,
  FavouriteArticlesBodyGet,
  ArticlesListItemType,
} from 'src/redux/contentForYou/types';

export interface UseContentForYouReturn {
  isLoading: boolean;
  favouriteOpinionsData: OpinionsListItemType[];
  favouriteOpinionsError: string;
  fetchFavouriteOpinionsRequest(payload: FavouriteOpinionsBodyGet): void;
  isArticalLoading: boolean;
  favouriteArticlesData: ArticlesListItemType[];
  favouriteArticlesError: string;
  fetchFavouriteArticlesRequest(payload: FavouriteArticlesBodyGet): void;
  emptyAllData(): void;
}

export const useContentForYou = (): UseContentForYouReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const favouriteOpinionsData = useSelector(getFavouriteOpinionsData);
  const favouriteOpinionsError = useSelector(getFavouriteOpinionsError);
  const fetchFavouriteOpinionsRequest = (payload: FavouriteOpinionsBodyGet) => {
    dispatch(fetchFavouriteOpinions(payload));
  };
  const isArticalLoading = useSelector(getArticleLoading);
  const favouriteArticlesData = useSelector(getFavouriteArticlesData);
  const favouriteArticlesError = useSelector(getFavouriteArticlesError);
  const fetchFavouriteArticlesRequest = (payload: FavouriteArticlesBodyGet) => {
    dispatch(fetchFavouriteArticles(payload));
  };
  const emptyAllData = () => {
    dispatch(emptyData());
  };
  return {
    isLoading,
    favouriteOpinionsData,
    favouriteOpinionsError,
    fetchFavouriteOpinionsRequest,
    isArticalLoading,
    favouriteArticlesData,
    favouriteArticlesError,
    fetchFavouriteArticlesRequest,
    emptyAllData,
  };
};
