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
} from 'src/redux/newsView/action';

export interface UseNewsViewReturn {
  isLoading: boolean;
  heroListData: NewsViewListItemType[];
  topListData: NewsViewListItemType[];
  bottomListData: NewsViewListItemType[];
  newsViewError: string;
  fetchHeroListRequest(payload: NewsViewBodyGet): void;
  fetchTopListRequest(payload: NewsViewBodyGet): void;
  fetchBottomListRequest(payload: NewsViewBodyGet): void;
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
  return {
    isLoading,
    heroListData,
    topListData,
    bottomListData,
    newsViewError,
    fetchHeroListRequest,
    fetchTopListRequest,
    fetchBottomListRequest,
  };
};
