import { AppState, Selector } from 'src/redux/rootReducer';
import { EditorsChoiceDataType, LatestArticleDataType, LatestOpinionDataType, LatestPodcastDataType, MainSectionBlockType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.isLoading;

export const getTickerData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.ticker;

export const getHeroData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.hero;

export const getHeroListData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.heroList;

export const getTopListData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.topList;

export const getOpinionData: Selector<LatestOpinionDataType[]> = (state: AppState) =>
state.latestNewsTab.opinionList;
export const getSectionComboOneData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.sectionComboOne;

export const getSectionComboTwoData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.sectionComboTwo;

export const getSectionComboThreeData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.sectionComboThree;

export const getSectionComboFourData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.sectionComboFour;

export const getSectionComboFiveData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.sectionComboFive;

export const getSectionComboSixData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.sectionComboSix;

export const getSectionComboSevenData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.sectionComboSeven;

export const getPodcastHomeData: Selector<LatestPodcastDataType[]> = (state: AppState) =>
  state.latestNewsTab.podcastHome;

export const getEditorsChoiceData: Selector<EditorsChoiceDataType[]> = (state: AppState) =>
  state.latestNewsTab.editorsChoice;

export const getError: Selector<string> = (state: AppState) =>
  state.latestNewsTab.error;

export const getCoverageData: Selector<MainSectionBlockType[]> = (state: AppState) =>
  state.latestNewsTab.coverageInfo;

export const getFeaturedArticle: Selector<MainSectionBlockType[]> = (state: AppState) =>
  state.latestNewsTab.featuredArticle;

export const getHorizontalData: Selector<MainSectionBlockType[]> = (state: AppState) =>
  state.latestNewsTab.horizontalArticle;
