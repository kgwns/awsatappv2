import { useDispatch, useSelector } from 'react-redux';
import {
    getHeroData,
    getHeroListData,
    getIsLoading, getOpinionData, getTickerData, getTopListData,
    getSectionComboFourData, getSectionComboOneData, getSectionComboThreeData, getSectionComboTwoData
} from 'src/redux/latestNews/selectors';
import {  LatestOpinionDataType } from 'src/redux/latestNews/types';
import { LatestArticleBodyGet, LatestArticleDataType, RequestSectionComboBodyGet } from 'src/redux/latestNews/types';
import { requestHeroListTopList, requestSectionComboFour, 
    requestSectionComboOne, requestSectionComboThree, 
    requestSectionComboTwo, requestTickerAndHero, requestOpinionList } from 'src/redux/latestNews/action';

export interface UseLatestNewsReturn {
    isLoading: boolean;
    ticker: LatestArticleDataType[];
    hero: LatestArticleDataType[];
    heroList: LatestArticleDataType[];
    topList: LatestArticleDataType[];
    opinionList: LatestOpinionDataType[]
    fetchTickerAndHeroArticle(payload: LatestArticleBodyGet): void;
    fetchHeroListTopList(payload: LatestArticleBodyGet): void
    fetchOpinionTopList(payload: LatestArticleBodyGet): void
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
    const opinionList = useSelector(getOpinionData);
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
    const fetchOpinionTopList = (payload: LatestArticleBodyGet) => {
        dispatch(requestOpinionList(payload));
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
        opinionList,
        fetchTickerAndHeroArticle,
        fetchHeroListTopList,
        fetchOpinionTopList,
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