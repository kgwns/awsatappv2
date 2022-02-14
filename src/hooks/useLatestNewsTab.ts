import { useDispatch, useSelector } from 'react-redux';
import {
    getHeroData,
    getHeroListData,
    getIsLoading, getSectionComboFourData, getSectionComboOneData, getSectionComboThreeData, getSectionComboTwoData, getTickerData, getTopListData,
} from 'src/redux/latestNews/selectors';
import { LatestArticleBodyGet, LatestArticleDataType, RequestSectionComboBodyGet } from 'src/redux/latestNews/types';
import { requestHeroListTopList, requestSectionComboFour, requestSectionComboOne, requestSectionComboThree, requestSectionComboTwo, requestTickerAndHero } from 'src/redux/latestNews/action';

export interface UseLatestNewsReturn {
    isLoading: boolean;
    ticker: LatestArticleDataType[];
    hero: LatestArticleDataType[];
    heroList: LatestArticleDataType[];
    topList: LatestArticleDataType[];
    sectionComboOne: LatestArticleDataType[];
    sectionComboTwo: LatestArticleDataType[];
    sectionComboThree: LatestArticleDataType[];
    sectionComboFour: LatestArticleDataType[];
    fetchTickerAndHeroArticle(payload: LatestArticleBodyGet): void;
    fetchHeroListTopList(payload: LatestArticleBodyGet): void
    fetchSectionComboOne(payload: RequestSectionComboBodyGet): void
    fetchSectionComboTwo(payload: RequestSectionComboBodyGet): void
    fetchSectionComboThree(payload: RequestSectionComboBodyGet): void
    fetchSectionComboFour(payload: RequestSectionComboBodyGet): void
}

export const useLatestNewsTab = (): UseLatestNewsReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const ticker = useSelector(getTickerData);
    const hero = useSelector(getHeroData);
    const heroList = useSelector(getHeroListData);
    const topList = useSelector(getTopListData);
    const sectionComboOne = useSelector(getSectionComboOneData)
    const sectionComboTwo = useSelector(getSectionComboTwoData)
    const sectionComboThree = useSelector(getSectionComboThreeData)
    const sectionComboFour = useSelector(getSectionComboFourData)
    const fetchTickerAndHeroArticle = (payload: LatestArticleBodyGet) => {
        dispatch(requestTickerAndHero(payload));
    };
    const fetchHeroListTopList = (payload: LatestArticleBodyGet) => {
        dispatch(requestHeroListTopList(payload));
    };
    const fetchSectionComboOne = (payload: RequestSectionComboBodyGet) => {
        dispatch(requestSectionComboOne(payload));
    };
    const fetchSectionComboTwo = (payload: RequestSectionComboBodyGet) => {
        dispatch(requestSectionComboTwo(payload));
    };
    const fetchSectionComboThree = (payload: RequestSectionComboBodyGet) => {
        dispatch(requestSectionComboThree(payload));
    };
    const fetchSectionComboFour = (payload: RequestSectionComboBodyGet) => {
        dispatch(requestSectionComboFour(payload));
    };

    return {
        isLoading,
        ticker,
        hero,
        heroList,
        topList,
        sectionComboOne,
        sectionComboTwo,
        sectionComboThree,
        sectionComboFour,
        fetchTickerAndHeroArticle,
        fetchHeroListTopList,
        fetchSectionComboOne,
        fetchSectionComboTwo,
        fetchSectionComboThree,
        fetchSectionComboFour
    };
};