import {
  FETCH_FAVOURITE_OPINIONS,
  FETCH_FAVOURITE_OPINIONS_ERROR,
  FETCH_FAVOURITE_OPINIONS_SUCCESS,
  FETCH_FAVOURITE_ARTICLES,
  FETCH_FAVOURITE_ARTICLES_ERROR,
  FETCH_FAVOURITE_ARTICLES_SUCCESS,
  EMPTY_ALL_DATA,
} from './actionTypes';
import {FavouriteActions, FavouriteListState} from './types';

const initialState: FavouriteListState = {
  favouriteOpinionData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
  error: '',
  isLoading: false,
  favouriteArticlesData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
  articleError: '',
  isArticleLoading: false,
};

export default (state = initialState, action: FavouriteActions) => {
  const concatOpinionData = (data: any) => {
    state.favouriteOpinionData.rows = data.rows;
    state.favouriteOpinionData.pager.current_page = data.pager.current_page;
    state.favouriteOpinionData.pager.items_per_page = data.pager.items_per_page;
    return state.favouriteOpinionData;
  };
  const concatArticleData = (data: any) => {
    state.favouriteArticlesData.rows = data.rows;
    state.favouriteArticlesData.pager.current_page = data.pager.current_page;
    state.favouriteArticlesData.pager.items_per_page = data.pager.items_per_page;
    return state.favouriteArticlesData;
  };
  switch (action.type) {
    case FETCH_FAVOURITE_OPINIONS_SUCCESS:
      return state.favouriteOpinionData.rows.length === 0
        ? {
            ...state,
            isLoading: false,
            favouriteOpinionData: action.payload.opinionListData,
            error: '',
          }
        : {
            ...state,
            isLoading: false,
            favouriteOpinionData: concatOpinionData(action.payload.opinionListData),
            error: '',
          };
    case FETCH_FAVOURITE_OPINIONS_ERROR:
      return {...state, error: action.payload.error, isLoading: false};
    case FETCH_FAVOURITE_OPINIONS:
      return {...state, isLoading: true, error: ''};
    case FETCH_FAVOURITE_ARTICLES_SUCCESS:
      return state.favouriteArticlesData.rows.length === 0
        ? {
            ...state,
            isArticleLoading: false,
            favouriteArticlesData: action.payload.favouriteArticlesData,
            articleError: '',
          }
        : {
            ...state,
            isArticleLoading: false,
            favouriteArticlesData: concatArticleData(action.payload.favouriteArticlesData),
            articleError: '',
          };
    case FETCH_FAVOURITE_ARTICLES_ERROR:
      return {...state, articleError: action.payload.articleError, isArticleLoading: false};
    case FETCH_FAVOURITE_ARTICLES:
      return {...state, isArticleLoading: true, articleError: ''};
    case EMPTY_ALL_DATA:
      return {
        ...state,
        isLoading: false,
        isArticleLoading:false,
        favouriteArticlesData: {
          rows: [],
          pager: {current_page: 0, items_per_page: ''},
        },
        favouriteOpinionData: {
          rows: [],
          pager: {current_page: 0, items_per_page: ''},
        },
        error: '',
        articleError: '',
      };
    default:
      return {...state};
  }
};
