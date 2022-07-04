import {
  FETCH_SECTION_ARTICLES,
  FETCH_SECTION_ARTICLES_ERROR,
  FETCH_SECTION_ARTICLES_SUCCESS,
  EMPTY_SECTION_ARTICLES,
} from './actionTypes';
import {SectionArticlesActions, SectionArticlesState} from './types';
const initialState: SectionArticlesState = {
  sectionArticlesData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
  error: '',
  isLoading: false,
};

export default (state = initialState, action: SectionArticlesActions) => {
  const concatData = (data: any) => {
    state.sectionArticlesData.rows = state.sectionArticlesData.rows.concat(
      data.rows,
    );
    state.sectionArticlesData.pager.current_page = data.pager.current_page;
    state.sectionArticlesData.pager.items_per_page = data.pager.items_per_page;
    return state.sectionArticlesData;
  };
  switch (action.type) {
    case FETCH_SECTION_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sectionArticlesData: concatData(action.payload.sectionArticlesData),
        error: '',
      };
    case FETCH_SECTION_ARTICLES_ERROR:
      return {...state, error: action.payload.error, isLoading: false};
    case FETCH_SECTION_ARTICLES:
      return {...state, isLoading: true, error: ''};
    case EMPTY_SECTION_ARTICLES:
      return {
        ...state,
        isLoading: false,
        sectionArticlesData: {
          rows: [],
          pager: {current_page: 0, items_per_page: ''},
        },
        error: '',
      };
    default:
      return {...state};
  }
};
