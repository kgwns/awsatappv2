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
    getSectionComboFiveData,
    getSectionComboSixData,
    getSectionComboSevenData,
    getEditorsChoiceData,
    getSpotlightData,
    getSpotlightArticleSectionData,
} from 'src/redux/latestNews/selectors';
import {  LatestOpinionDataType, LatestPodcastDataType, MainSectionBlockType, LatestArticleBodyGet, LatestArticleDataType, RequestSectionComboBodyGet, EditorsChoiceDataType, SpotlightDataType, SpotlightArticleSectionBodyGet } from 'src/redux/latestNews/types';
import { requestHeroListTopList, requestSectionComboFour, 
    requestSectionComboOne, requestSectionComboThree, 
    requestSectionComboTwo, requestTickerAndHero, requestOpinionList,
    requestCoverageBlock,
    requestHorizontalArticleBlock,
    requestFeatureArticleBlock,
    requestPodcastHomeData, requestSectionComboFive, requestSectionComboSix, requestSectionComboSeven, 
    requestEditorsChoiceData, requestSpotlightData, requestSpotlightArticleSection, 
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
    sectionComboFive: LatestArticleDataType[];
    sectionComboSix: LatestArticleDataType[];
    sectionComboSeven: LatestArticleDataType[];
    podcastHome: LatestPodcastDataType[];
    coverage: MainSectionBlockType[];
    featuredArticle: MainSectionBlockType[];
    horizontalArticle: MainSectionBlockType[];
    editorsChoice: EditorsChoiceDataType[];
    spotlight: SpotlightDataType[];
    spotlightArticleSection: LatestArticleDataType[];
    fetchTickerAndHeroArticle(payload: LatestArticleBodyGet): void;
    fetchHeroListTopList(payload: LatestArticleBodyGet): void
    fetchSectionComboOne(payload: RequestSectionComboBodyGet): void
    fetchSectionComboTwo(payload: RequestSectionComboBodyGet): void
    fetchSectionComboThree(payload: RequestSectionComboBodyGet): void
    fetchSectionComboFour(payload: RequestSectionComboBodyGet): void
    fetchSectionComboFive(payload: RequestSectionComboBodyGet): void
    fetchSectionComboSix(payload: RequestSectionComboBodyGet): void
    fetchSectionComboSeven(payload: RequestSectionComboBodyGet): void
    fetchPodcastHome(): void
    fetchCoverageBlockData(): void
    fetchFeaturedArticleData(): void;
    fetchHorizontalArticleData(): void;
    fetchEditorsChoice(): void;
    fetchSpotlight():void;
    fetchSpotlightArticleSection(payload: SpotlightArticleSectionBodyGet): void;
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
    const sectionComboFive = useSelector(getSectionComboFiveData)
    const sectionComboSix = useSelector(getSectionComboSixData)
    const sectionComboSeven = useSelector(getSectionComboSevenData)
    const podcastHome = useSelector(getPodcastHomeData)
    const coverage = useSelector(getCoverageData)
    const featuredArticle = useSelector(getFeaturedArticle)
    const horizontalArticle = useSelector(getHorizontalData)
    const editorsChoice = useSelector(getEditorsChoiceData)
    const spotlight = useSelector(getSpotlightData)
    const spotlightArticleSection = useSelector(getSpotlightArticleSectionData)
    
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

    const fetchSectionComboFive = (payload: RequestSectionComboBodyGet) => {
        dispatch(requestSectionComboFive(payload));
    };

    const fetchSectionComboSix = (payload: RequestSectionComboBodyGet) => {
        dispatch(requestSectionComboSix(payload));
    };

    const fetchSectionComboSeven = (payload: RequestSectionComboBodyGet) => {
        dispatch(requestSectionComboSeven(payload));
    };

    const fetchPodcastHome = () => {
        dispatch(requestPodcastHomeData());
    };
    const fetchEditorsChoice = () => {
        dispatch(requestEditorsChoiceData());
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

    const fetchSpotlight = () => {
        dispatch(requestSpotlightData());
    };

    const fetchSpotlightArticleSection = (payload: SpotlightArticleSectionBodyGet) => {
        dispatch(requestSpotlightArticleSection(payload));
    };

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
        sectionComboFive,
        sectionComboSix,
        sectionComboSeven,
        fetchSectionComboOne,
        fetchSectionComboTwo,
        fetchSectionComboThree,
        fetchSectionComboFour,
        fetchSectionComboFive,
        fetchSectionComboSix,
        fetchSectionComboSeven,
        podcastHome,
        fetchPodcastHome,
        fetchCoverageBlockData,
        fetchFeaturedArticleData,
        fetchHorizontalArticleData,
        editorsChoice,
        fetchEditorsChoice,
        spotlight,
        fetchSpotlight,
        spotlightArticleSection,
        fetchSpotlightArticleSection,
    };
};