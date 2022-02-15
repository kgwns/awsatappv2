import { REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_SUCCESS, REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_HERO_AND_TOP_LIST_FAILED, REQUEST_OPINION_DATA_LIST_FAILED, REQUEST_OPINION_DATA_SUCCESS,REQUEST_OPINION_LIST_DATA } from './actionType';
import { LatestNewsTabState, LatestTabAction } from './types';

const initialData: LatestNewsTabState = {
  isLoading: true,
  error: '',
  ticker: [],
  hero: [],
  heroList: [],
  topList: [],
  opinionList: []
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
    default:
      return { ...state }
  }
}
