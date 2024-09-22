import {
  REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_SUCCESS, REQUEST_TICKER_HERO_DATA_FAILED,
  REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_HERO_AND_TOP_LIST_FAILED,
  REQUEST_SECTION_COMBO_ONE, REQUEST_SECTION_COMBO_ONE_SUCCESS, REQUEST_SECTION_COMBO_ONE_FAILED,
  REQUEST_SECTION_COMBO_TWO, REQUEST_SECTION_COMBO_TWO_SUCCESS, REQUEST_SECTION_COMBO_TWO_FAILED,
  REQUEST_SECTION_COMBO_THREE, REQUEST_SECTION_COMBO_THREE_SUCCESS, REQUEST_SECTION_COMBO_THREE_FAILED,
  REQUEST_SECTION_COMBO_FOUR, REQUEST_SECTION_COMBO_FOUR_SUCCESS, REQUEST_SECTION_COMBO_FOUR_FAILED,
  REQUEST_OPINION_DATA_LIST_FAILED, REQUEST_OPINION_DATA_SUCCESS, REQUEST_OPINION_LIST_DATA,
  REQUEST_PODCAST_HOME_DATA, REQUEST_PODCAST_HOME_DATA_SUCCESS, REQUEST_PODCAST_HOME_DATA_FAILED, REQUEST_COVERAGE_BLOCK_SUCCESS,
  REQUEST_FEATURED_ARTICLE_BLOCK_SUCCESS, REQUEST_HORIZONTAL_ARTICLE_SUCCESS,
  REQUEST_SECTION_COMBO_FIVE, REQUEST_SECTION_COMBO_FIVE_SUCCESS, REQUEST_SECTION_COMBO_FIVE_FAILED,
  REQUEST_SECTION_COMBO_SIX, REQUEST_SECTION_COMBO_SIX_SUCCESS, REQUEST_SECTION_COMBO_SIX_FAILED,
  REQUEST_SECTION_COMBO_SEVEN, REQUEST_SECTION_COMBO_SEVEN_SUCCESS, REQUEST_SECTION_COMBO_SEVEN_FAILED,
  REQUEST_SECTION_COMBO_EIGHT, REQUEST_SECTION_COMBO_EIGHT_SUCCESS, REQUEST_SECTION_COMBO_EIGHT_FAILED,
  REQUEST_EDITORS_CHOICE_DATA, REQUEST_EDITORS_CHOICE_DATA_SUCCESS, REQUEST_EDITORS_CHOICE_DATA_FAILED,
  REQUEST_SPOTLIGHT_COMBO, REQUEST_SPOTLIGHT_COMBO_SUCCESS, REQUEST_SPOTLIGHT_COMBO_FAILED,
  REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA, REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_SUCCESS, 
  REQUEST_COVERAGE_BLOCK_FAILED, REQUEST_FEATURED_ARTICLE_BLOCK_FAILED, 
  REQUEST_HORIZONTAL_ARTICLE_FAILED, REQUEST_COVERAGE_BLOCK, 
  REQUEST_FEATURED_ARTICLE_BLOCK, REQUEST_HORIZONTAL_ARTICLE_BLOCK,
  REQUEST_INFO_GRAPHIC_BLOCK, REQUEST_INFO_GRAPHIC_BLOCK_SUCCESS, 
  REQUEST_INFO_GRAPHIC_BLOCK_FAILED, REQUEST_ARCHIVED_ARTICLE_DATA, 
  REQUEST_ARCHIVED_ARTICLE_DATA_SUCCESS, REQUEST_ARCHIVED_ARTICLE_DATA_FAILED,
  REQUEST_US_ELECTION_DATA,
  REQUEST_US_ELECTION_DATA_SUCCESS,
  REQUEST_US_ELECTION_DATA_FAILED,
  REQUEST_CONTESTANTS_DATA,
  REQUEST_CONTESTANTS_DATA_FAILED,
  REQUEST_CONTESTANTS_DATA_SUCCESS,
} from './actionType';
import { LatestNewsTabState, LatestTabAction } from './types';

const initialData: LatestNewsTabState = {
  isLoading: true,
  error: '',
  ticker: [],
  hero: [],
  heroList: [],
  topList: [],
  opinionList: [],
  sectionComboOne: [],
  sectionComboTwo: [],
  sectionComboThree: [],
  sectionComboFour: [],
  sectionComboFive: [],
  sectionComboSix: [],
  sectionComboSeven: [],
  sectionComboEight:[],
  podcastHome: [],
  coverageInfo: [],
  featuredArticle: [],
  horizontalArticle: [],
  editorsChoice: [],
  spotlight: [],
  spotlightArticleSection: [],
  infoGraphicBlockInfo: [],
  archivedArticleSection: [],
  coverageInfoLoaded: false,
  usElectionsSectionLoaded: false,
  featuredArticleLoaded: false,
  horizontalArticleLoaded: false,
  opinionLoaded: false,
  podcastHomeLoaded: false,
  editorChoiceLoaded: false,
  sectionComboOneLoaded: false,
  sectionComboTwoLoaded: false,
  sectionComboThreeLoaded: false,
  infoGraphicBlockInfoLoaded: false,
};

export default (state = initialData, action: LatestTabAction) => {
  switch (action.type) {
    case REQUEST_TICKER_HERO_DATA:
      return {
        ...state,
        isLoading: true
      }
    case REQUEST_TICKER_HERO_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ticker: action.payload.ticker,
        hero: action.payload.hero
      }
    case REQUEST_TICKER_HERO_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_HERO_AND_TOP_LIST_DATA:
      return {
        ...state,
        isLoading: true
      }
    case REQUEST_HERO_AND_TOP_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        heroList: action.payload.heroList,
        topList: action.payload.topList
      }
    case REQUEST_HERO_AND_TOP_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_OPINION_LIST_DATA:
      return {
        ...state,
        opinionLoaded: false,
      }
    case REQUEST_OPINION_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        opinionList: action.payload.opinionList,
        opinionLoaded: true,
      }
    case REQUEST_OPINION_DATA_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        opinionLoaded: true,
      }
    case REQUEST_SECTION_COMBO_ONE:
      return {
        ...state,
        sectionComboOneLoaded: false,
      }
    case REQUEST_SECTION_COMBO_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionComboOneLoaded: true,
        sectionComboOne: action.payload.sectionComboOne
      }
    case REQUEST_SECTION_COMBO_ONE_FAILED:
      return {
        ...state,
        isLoading: false,
        sectionComboOneLoaded: true,
        error: action.payload.error
      }
    case REQUEST_SECTION_COMBO_TWO:
      return {
        ...state,
        sectionComboTwoLoaded: false,
      }
    case REQUEST_SECTION_COMBO_TWO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionComboTwoLoaded: true,
        sectionComboTwo: action.payload.sectionComboTwo
      }
    case REQUEST_SECTION_COMBO_TWO_FAILED:
      return {
        ...state,
        isLoading: false,
        sectionComboTwoLoaded: true,
        error: action.payload.error
      }
    case REQUEST_SECTION_COMBO_THREE:
      return {
        ...state,
        sectionComboThreeLoaded: false,
      }
    case REQUEST_SECTION_COMBO_THREE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionComboThreeLoaded: true,
        sectionComboThree: action.payload.sectionComboThree
      }
    case REQUEST_SECTION_COMBO_THREE_FAILED:
      return {
        ...state,
        isLoading: false,
        sectionComboThreeLoaded: true,
        error: action.payload.error
      }
    case REQUEST_SECTION_COMBO_FOUR:
      return {
        ...state,
      }
    case REQUEST_SECTION_COMBO_FOUR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionComboFour: action.payload.sectionComboFour
      }
    case REQUEST_SECTION_COMBO_FOUR_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_SECTION_COMBO_FIVE:
      return {
        ...state,
      }
    case REQUEST_SECTION_COMBO_FIVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionComboFive: action.payload.sectionComboFive
      }
    case REQUEST_SECTION_COMBO_FIVE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_SECTION_COMBO_SIX:
      return {
        ...state,
      }
    case REQUEST_SECTION_COMBO_SIX_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionComboSix: action.payload.sectionComboSix
      }
    case REQUEST_SECTION_COMBO_SIX_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_SECTION_COMBO_SEVEN:
      return {
        ...state,
      }
    case REQUEST_SECTION_COMBO_SEVEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionComboSeven: action.payload.sectionComboSeven
      }
    case REQUEST_SECTION_COMBO_SEVEN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_SECTION_COMBO_EIGHT:
      return {
        ...state,
      }
    case REQUEST_SECTION_COMBO_EIGHT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionComboEight: action.payload.sectionComboEight
      }
    case REQUEST_SECTION_COMBO_EIGHT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_PODCAST_HOME_DATA:
      return {
        ...state,
        podcastHomeLoaded: false,
      }
    case REQUEST_PODCAST_HOME_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        podcastHome: action.payload.podcastHome,
        podcastHomeLoaded: true,
      }
    case REQUEST_PODCAST_HOME_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        podcastHomeLoaded: true,
      }
    case REQUEST_COVERAGE_BLOCK:
      return {
        ...state,
        coverageInfoLoaded: false,
      }
    case REQUEST_COVERAGE_BLOCK_SUCCESS:
      return {
        ...state,
        coverageInfo: action.payload.coverageInfo,
        coverageInfoLoaded: true,
        isLoading: false,
      }
    case REQUEST_COVERAGE_BLOCK_FAILED:
      return {
        ...state,
        coverageInfoLoaded: true,
      }
    case REQUEST_FEATURED_ARTICLE_BLOCK:
      return {
        ...state,
        featuredArticleLoaded: false,
      }
    case REQUEST_FEATURED_ARTICLE_BLOCK_SUCCESS:
      return {
        ...state,
        featuredArticle: action.payload.featureArticle,
        featuredArticleLoaded: true,
        isLoading: false,
      }
    case REQUEST_FEATURED_ARTICLE_BLOCK_FAILED:
      return {
        ...state,
        featuredArticleLoaded: true,
      }
    case REQUEST_HORIZONTAL_ARTICLE_BLOCK:
      return {
        ...state,
        horizontalArticleLoaded: false,
      }
    case REQUEST_HORIZONTAL_ARTICLE_SUCCESS:
      return {
        ...state,
        horizontalArticle: action.payload.horizontalArticle,
        horizontalArticleLoaded: true,
        isLoading: false,
      }
    case REQUEST_HORIZONTAL_ARTICLE_FAILED:
      return {
        ...state,
        horizontalArticleLoaded: true,
      }
    case REQUEST_EDITORS_CHOICE_DATA:
      return {
        ...state,
        editorChoiceLoaded: false,
      }
    case REQUEST_EDITORS_CHOICE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        editorsChoice: action.payload.editorsChoice,
        editorChoiceLoaded: true,
      }
    case REQUEST_EDITORS_CHOICE_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        editorChoiceLoaded: false,
      }
    case REQUEST_SPOTLIGHT_COMBO:
      return {
        ...state,
      }
    case REQUEST_SPOTLIGHT_COMBO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        spotlight: action.payload.spotlight
      }
    case REQUEST_SPOTLIGHT_COMBO_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA:
      return {
        ...state,
      }
    case REQUEST_SPOTLIGHT_ARTICLE_SECTION_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        spotlightArticleSection: action.payload.spotlightArticleSectionData
      }
    case REQUEST_INFO_GRAPHIC_BLOCK:
      return {
        ...state,
        infoGraphicBlockInfoLoaded: false,
      }
    case REQUEST_INFO_GRAPHIC_BLOCK_SUCCESS:
      return {
        ...state,
        infoGraphicBlockInfo: action.payload.infoGraphicBlockInfo,
        infoGraphicBlockInfoLoaded: true,
        isLoading: false,
      }
    case REQUEST_INFO_GRAPHIC_BLOCK_FAILED:
      return {
        ...state,
        infoGraphicBlockInfoLoaded: true,
      }
    case REQUEST_ARCHIVED_ARTICLE_DATA:
      return {
        ...state,
      }
    case REQUEST_ARCHIVED_ARTICLE_DATA_SUCCESS:
      return {
        ...state,
        archivedArticleSection: action.payload.archivedArticleSection,
        isLoading: false,
      }
    case REQUEST_ARCHIVED_ARTICLE_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_US_ELECTION_DATA:
      return {
        ...state,
        usElectionsSectionLoaded: false
      }
    case REQUEST_US_ELECTION_DATA_SUCCESS:
      return {
        ...state,
        usElectionsSection: action.payload.nodeListData,
        isLoading: false,
        usElectionsSectionLoaded: true
      }
    case REQUEST_US_ELECTION_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        usElectionsSectionLoaded: false
      }
    case REQUEST_CONTESTANTS_DATA:
      return {
        ...state
      }
    case REQUEST_CONTESTANTS_DATA_SUCCESS:
      return {
        ...state,
        contestantsSection: action.payload.nodeListData,
        isLoading: false
      }
    case REQUEST_CONTESTANTS_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    default:
      return { ...state }
  }
}
