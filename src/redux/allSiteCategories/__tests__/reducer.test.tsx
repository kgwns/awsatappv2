import {allSiteCategoriesActions} from '../action';
import {FETCH_ALL_SITE_CATEGORIES} from '../actionTypes';
import allSiteCategories from '../reducer';
import {AllSiteCategoriesState} from '../types';

describe('allSiteCategories reducer', () => {
  let initialState: AllSiteCategoriesState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      allSiteCategoriesData: [],
      error: '',
    };
  });

  test('fetchAllSiteCategoriesSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = allSiteCategories(
      initialState,
      allSiteCategoriesActions.fetchAllSiteCategoriesSuccess({
        allSiteCategoriesListData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchAllSiteCategoriesFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = allSiteCategories(
      initialState,
      allSiteCategoriesActions.fetchAllSiteCategoriesFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when allSiteCategories request API', () => {
    const nextState = allSiteCategories(initialState, {
      type: FETCH_ALL_SITE_CATEGORIES,
      payload: {items_per_page: 10},
    });
    expect(nextState.isLoading).toBe(true);
  });
});
