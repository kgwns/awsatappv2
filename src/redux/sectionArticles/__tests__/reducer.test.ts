import { sectionArticlesAction } from '../action';
import { EMPTY_SECTION_ARTICLES, FETCH_SECTION_ARTICLES } from '../actionTypes';
import sectionArticlesReducer from '../reducer';
import { SectionArticlesBodyGet, SectionArticlesState } from '../types';

const mockPayload: SectionArticlesBodyGet = {
    sectionId: '',
    page: 1,
  };

const mockInitialData = {rows: [], pager: {current_page: 0, items_per_page: ''}}

describe('sectionArticles reducer', () => {
  let initialState: SectionArticlesState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      sectionArticlesData: mockInitialData,
      error: '',
    };
  });

  it('When Initial State', () => {
    initialState.isLoading = false;
    const nextState = sectionArticlesReducer(
      initialState,
      {
        type: FETCH_SECTION_ARTICLES,
        payload: mockPayload
      },
    );
    expect(nextState.isLoading).toBeTruthy();
  });

  it('fetchSectionArticlesSuccess action', () => {
    initialState.isLoading = true;
    const nextState = sectionArticlesReducer(
      initialState,
      sectionArticlesAction.fetchSectionArticlesSuccess({
        sectionArticlesData: mockInitialData,
      }),
    );
    expect(nextState.isLoading).toBeFalsy();
  });

  it('EMPTY_SECTION_ARTICLES action', () => {
    initialState.isLoading = true;
    const nextState = sectionArticlesReducer(
      initialState,
      {type: EMPTY_SECTION_ARTICLES} ,
    );
    expect(nextState.sectionArticlesData.rows).toEqual([]);
  });

  it('fetchSectionArticlesFailed action', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = sectionArticlesReducer(
      initialState,
      sectionArticlesAction.fetchSectionArticlesFailed({
        error: testError,
      }),
    );
    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  it('Default State', () => {
    const nextState = sectionArticlesReducer(
      initialState, { type:'' }
    )
    expect(nextState.isLoading).toBe(false)
  })
});