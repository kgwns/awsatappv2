import { allSiteCategoriesActions } from '../action';
import allSiteCategories from '../reducer';
import { AllSiteCategoriesState } from '../types';

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
});