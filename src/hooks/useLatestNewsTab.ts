import { useDispatch, useSelector } from 'react-redux';
import {
    getHeroData,
    getHeroListData,
    getIsLoading, getOpinionData, getTickerData, getTopListData,
    getSectionComboFourData, getSectionComboOneData, getSectionComboThreeData, getSectionComboTwoData,
    getPodcastHomeData,
    getCoverageData,
    getFeaturedArticle,
    getHorizontalData,
} from 'src/redux/latestNews/selectors';
import {  LatestOpinionDataType, LatestPodcastDataType, MainSectionBlockType } from 'src/redux/latestNews/types';
import { LatestArticleBodyGet, LatestArticleDataType, RequestSectionComboBodyGet } from 'src/redux/latestNews/types';
import { requestHeroListTopList, requestSectionComboFour, 
    requestSectionComboOne, requestSectionComboThree, 
    requestSectionComboTwo, requestTickerAndHero, requestOpinionList,
    requestPodcastHomeData,
    requestCoverageBlock,
    requestHorizontalArticleBlock,
    requestFeatureArticleBlock,
} from 'src/redux/latestNews/action';

export interface UseLatestNewsReturn {
    isLoading: boolean;
    ticker: LatestArticleDataType[];
    hero: LatestArticleDataType[];
    heroList: LatestArticleDataType[];
    topList: LatestArticleDataType[];
    opinionList: LatestOpinionDataType[]
    fetchOpinionTopList(payload: LatestArticleBodyGet): void
    sectionComboOne: LatestArticleDataType[];
    sectionComboTwo: LatestArticleDataType[];
    sectionComboThree: LatestArticleDataType[];
    sectionComboFour: LatestArticleDataType[];
    podcastHome: LatestPodcastDataType[];
    coverage: MainSectionBlockType[];
    featuredArticle: MainSectionBlockType[];
    horizontalArticle: MainSectionBlockType[];
    fetchTickerAndHeroArticle(payload: LatestArticleBodyGet): void;
    fetchHeroListTopList(payload: LatestArticleBodyGet): void
    fetchSectionComboOne(payload: RequestSectionComboBodyGet): void
    fetchSectionComboTwo(payload: RequestSectionComboBodyGet): void
    fetchSectionComboThree(payload: RequestSectionComboBodyGet): void
    fetchSectionComboFour(payload: RequestSectionComboBodyGet): void
    fetchPodcastHome(): void
    fetchCoverageBlockData(): void
    fetchFeaturedArticleData(): void;
    fetchHorizontalArticleData(): void;
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
    const podcastHome = useSelector(getPodcastHomeData)
    const coverage = useSelector(getCoverageData)
    const featuredArticle = useSelector(getFeaturedArticle)
    const horizontalArticle = useSelector(getHorizontalData)

    const fetchTickerAndHeroArticle = (payload: LatestArticleBodyGet) => {
        dispatch(requestTickerAndHero(payload));
    };
    const fetchHeroListTopList = (payload: LatestArticleBodyGet) => {
        dispatch(requestHeroListTopList(payload));
    };
    const fetchOpinionTopList = (payload: LatestArticleBodyGet) => {
        dispatch(requestOpinionList(payload));
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
    const fetchPodcastHome = () => {
        dispatch(requestPodcastHomeData());
    };

    const fetchCoverageBlockData = () => {
        dispatch(requestCoverageBlock());
    }

    const fetchFeaturedArticleData = () => {
        dispatch(requestFeatureArticleBlock())
    }

    const fetchHorizontalArticleData = () => {
        dispatch(requestHorizontalArticleBlock())
    }


    return {
        isLoading,
        ticker,
        hero,
        heroList,
        topList,
        opinionList,
        coverage,
        featuredArticle,
        horizontalArticle,
        fetchTickerAndHeroArticle,
        fetchHeroListTopList,
        fetchOpinionTopList,
        sectionComboOne,
        sectionComboTwo,
        sectionComboThree,
        sectionComboFour,
        fetchSectionComboOne,
        fetchSectionComboTwo,
        fetchSectionComboThree,
        fetchSectionComboFour,
        podcastHome,
        fetchPodcastHome,
        fetchCoverageBlockData,
        fetchFeaturedArticleData,
        fetchHorizontalArticleData,
    };
};