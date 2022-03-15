import {contentForYouActions} from '../action';
import {FETCH_FAVOURITE_OPINIONS, FETCH_FAVOURITE_ARTICLES} from '../actionTypes';
import contentForYouReducer from '../reducer';
import {FavouriteListState} from '../types';

describe('opinions reducer', () => {
  let initialState: FavouriteListState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      favouriteOpinionData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
      error: '',
      favouriteArticlesData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
      articleError: '',
      isArticleLoading: false,
    };
  });

  test('fetchOpinionsSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = contentForYouReducer(
      initialState,
      contentForYouActions.fetchFavouriteOpinionsSuccess({
        opinionListData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchOpinionsFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = contentForYouReducer(
      initialState,
      contentForYouActions.fetchFavouriteOpinionsFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when contentForYouReducer request API', () => {
    const nextState = contentForYouReducer(initialState, {
      type: FETCH_FAVOURITE_OPINIONS,
      payload: {page: 1},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('fetchArticlesSuccess', () => {
    const testData = [{}];
    initialState.isArticleLoading = true;
    const nextState = contentForYouReducer(
      initialState,
      contentForYouActions.fetchFavouriteArticlesSuccess({
        favouriteArticlesData: testData,
      }),
    );

    expect(nextState.isArticleLoading).toBeFalsy();
  });

  test('fetchArticlesFailure', () => {
    const testError = 'some-error';
    initialState.isArticleLoading = true;
    const nextState = contentForYouReducer(
      initialState,
      contentForYouActions.fetchFavouriteArticlesFailed({
        articleError: testError,
      }),
    );

    expect(nextState.isArticleLoading).toBeFalsy();
    expect(nextState.articleError).toEqual(testError);
  });

  test('Check loading state when articlesReducer request API', () => {
    const nextState = contentForYouReducer(initialState, {
      type: FETCH_FAVOURITE_ARTICLES,
      payload: {page: 1},
    });
    expect(nextState.isArticleLoading).toBe(true);
  });

});
