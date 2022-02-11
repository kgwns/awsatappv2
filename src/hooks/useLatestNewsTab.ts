import { useDispatch, useSelector } from 'react-redux';
import {
    getHeroData,
    getHeroListData,
    getIsLoading, getTickerData, getTopListData,
} from 'src/redux/latestNews/selectors';
import { LatestArticleBodyGet, LatestArticleDataType } from 'src/redux/latestNews/types';
import { requestHeroListTopList, requestTickerAndHero } from 'src/redux/latestNews/action';

export interface UseLatestNewsReturn {
    isLoading: boolean;
    ticker: LatestArticleDataType[];
    hero: LatestArticleDataType[];
    heroList: LatestArticleDataType[];
    topList: LatestArticleDataType[];
    fetchTickerAndHeroArticle(payload: LatestArticleBodyGet): void;
    fetchHeroListTopList(payload: LatestArticleBodyGet): void
}

export const useLatestNewsTab = (): UseLatestNewsReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const ticker = useSelector(getTickerData);
    const hero = useSelector(getHeroData);
    const heroList = useSelector(getHeroListData);
    const topList = useSelector(getTopListData);
    const fetchTickerAndHeroArticle = (payload: LatestArticleBodyGet) => {
        dispatch(requestTickerAndHero(payload));
    };
    const fetchHeroListTopList = (payload: LatestArticleBodyGet) => {
        dispatch(requestHeroListTopList(payload));
    };

    return {
        isLoading,
        ticker,
        hero,
        heroList,
        topList,
        fetchTickerAndHeroArticle,
        fetchHeroListTopList
    };
};