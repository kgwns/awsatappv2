import { AppState, Selector } from 'src/redux/rootReducer';
import {
  ArchivedArticleDataType,
  EditorsChoiceDataType,
  InfoGraphicBlockType,
  LatestArticleDataType,
  LatestOpinionDataType,
  LatestPodcastDataType,
  MainSectionBlockType,
  SpotlightDataType
} from './types';

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

export const getSectionComboEightData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.sectionComboEight;

export const getPodcastHomeData: Selector<LatestPodcastDataType[]> = (state: AppState) =>
  state.latestNewsTab.podcastHome;

export const getEditorsChoiceData: Selector<EditorsChoiceDataType[]> = (state: AppState) =>
  state.latestNewsTab.editorsChoice;

export const getSpotlightData: Selector<SpotlightDataType[]> = (state: AppState) =>
  state.latestNewsTab.spotlight;

export const getSpotlightArticleSectionData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.spotlightArticleSection;

export const getError: Selector<string> = (state: AppState) =>
  state.latestNewsTab.error;

export const getCoverageData: Selector<MainSectionBlockType[]> = (state: AppState) =>
  state.latestNewsTab.coverageInfo;

export const getFeaturedArticle: Selector<MainSectionBlockType[]> = (state: AppState) =>
  state.latestNewsTab.featuredArticle;

export const getHorizontalData: Selector<MainSectionBlockType[]> = (state: AppState) =>
  state.latestNewsTab.horizontalArticle;

export const getCoverageDataLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.coverageInfoLoaded;

export const getFeaturedArticleLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.featuredArticleLoaded;

export const getHorizontalDataLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.horizontalArticleLoaded;

export const getOpinionDataLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.opinionLoaded;

export const getPodcastHomeDataLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.podcastHomeLoaded;

export const getEditorChoiceDataLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.editorChoiceLoaded;

export const getSectionComboOneLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.sectionComboOneLoaded;

export const getSectionComboTwoLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.sectionComboTwoLoaded;

export const getSectionComboThreeLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.sectionComboThreeLoaded;

export const getInfoGraphicBlockData: Selector<InfoGraphicBlockType[]> = (state: AppState) =>
state.latestNewsTab.infoGraphicBlockInfo;

export const getInfoGraphicBlockDataLoading: Selector<boolean> = (state: AppState) =>
state.latestNewsTab.infoGraphicBlockInfoLoaded;

export const getArchivedArticleSectionData: Selector<ArchivedArticleDataType[]> = (state: AppState) =>
state.latestNewsTab.archivedArticleSection;

export const getUsElectionsSectionData: Selector<MainSectionBlockType[]> = (state: AppState) =>
  state.latestNewsTab.usElectionsSection;

export const getUsElectionsSectionDataLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.usElectionsSectionLoaded;

export const getContestantsSectionData: Selector<MainSectionBlockType[]> = (state: AppState) =>
  state.latestNewsTab.contestantsSection;
