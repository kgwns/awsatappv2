import {
  REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_SUCCESS, REQUEST_TICKER_HERO_DATA_FAILED,
  REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_HERO_AND_TOP_LIST_FAILED,
  REQUEST_SECTION_COMBO_ONE, REQUEST_SECTION_COMBO_ONE_SUCCESS, REQUEST_SECTION_COMBO_ONE_FAILED,
  REQUEST_SECTION_COMBO_TWO, REQUEST_SECTION_COMBO_TWO_SUCCESS, REQUEST_SECTION_COMBO_TWO_FAILED,
  REQUEST_SECTION_COMBO_THREE, REQUEST_SECTION_COMBO_THREE_SUCCESS, REQUEST_SECTION_COMBO_THREE_FAILED,
  REQUEST_SECTION_COMBO_FOUR, REQUEST_SECTION_COMBO_FOUR_SUCCESS, REQUEST_SECTION_COMBO_FOUR_FAILED,
  REQUEST_OPINION_DATA_LIST_FAILED, REQUEST_OPINION_DATA_SUCCESS, REQUEST_OPINION_LIST_DATA,
  REQUEST_PODCAST_HOME_DATA, REQUEST_PODCAST_HOME_DATA_SUCCESS, REQUEST_PODCAST_HOME_DATA_FAILED,
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
  podcastHome:[],
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
          isLoading: true
        }
      case REQUEST_OPINION_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          opinionList: action.payload.opinionList
        }
      case REQUEST_OPINION_DATA_LIST_FAILED:
        return {
          ...state,
          isLoading: false,
          error: action.payload.error
        }
    case REQUEST_SECTION_COMBO_ONE:
      return {
        ...state,
        isLoading: true
      }
    case REQUEST_SECTION_COMBO_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionComboOne: action.payload.sectionComboOne
      }
    case REQUEST_SECTION_COMBO_ONE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_SECTION_COMBO_TWO:
      return {
        ...state,
        isLoading: true
      }
    case REQUEST_SECTION_COMBO_TWO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionComboTwo: action.payload.sectionComboTwo
      }
    case REQUEST_SECTION_COMBO_TWO_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_SECTION_COMBO_THREE:
      return {
        ...state,
        isLoading: true
      }
    case REQUEST_SECTION_COMBO_THREE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionComboThree: action.payload.sectionComboThree
      }
    case REQUEST_SECTION_COMBO_THREE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_SECTION_COMBO_FOUR:
      return {
        ...state,
        isLoading: true
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
    case REQUEST_PODCAST_HOME_DATA:
      return {
        ...state,
        isLoading: true
      }
    case REQUEST_PODCAST_HOME_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        podcastHome: action.payload.podcastHome
      }
    case REQUEST_PODCAST_HOME_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    default:
      return { ...state }
  }
}
