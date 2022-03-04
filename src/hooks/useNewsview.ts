import {useDispatch, useSelector} from 'react-redux';
import {NewsViewBodyGet, NewsViewListItemType} from 'src/redux/newsView/types';
import {
  getNewsViewError,
  getIsLoading,
  getHeroListData,
  getTopListData,
  getBottomListData,
} from 'src/redux/newsView/selectors';
import {
  fetchBottomList,
  fetchHeroList,
  fetchTopList,
  emptyAllList,
} from 'src/redux/newsView/action';
import { LatestArticleDataType } from 'src/redux/latestNews/types';

export interface UseNewsViewReturn {
  isLoading: boolean;
  heroListData: NewsViewListItemType[];
  topListData: LatestArticleDataType[];
  bottomListData: NewsViewListItemType[];
  newsViewError: string;
  fetchHeroListRequest(payload: NewsViewBodyGet): void;
  fetchTopListRequest(payload: NewsViewBodyGet): void;
  fetchBottomListRequest(payload: NewsViewBodyGet): void;
  emptyAllListData(): void;
}

export const useNewsView = (): UseNewsViewReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const heroListData = useSelector(getHeroListData);
  const topListData = useSelector(getTopListData);
  const bottomListData = useSelector(getBottomListData);
  const newsViewError = useSelector(getNewsViewError);
  const fetchHeroListRequest = (payload: NewsViewBodyGet) => {
    dispatch(fetchHeroList(payload));
  };
  const fetchTopListRequest = (payload: NewsViewBodyGet) => {
    dispatch(fetchTopList(payload));
  };
  const fetchBottomListRequest = (payload: NewsViewBodyGet) => {
    dispatch(fetchBottomList(payload));
  };
  const emptyAllListData = () => {
    dispatch(emptyAllList());
  };

  return {
    isLoading,
    heroListData,
    topListData,
    bottomListData,
    newsViewError,
    fetchHeroListRequest,
    fetchTopListRequest,
    fetchBottomListRequest,
    emptyAllListData,
  };
};
