import {newsViewActions} from '../action';
import newsViewReducer from '../reducer';
import {NewsViewtState} from '../types';

describe('opinionWriter reducer', () => {
  let initialState: NewsViewtState;

  beforeEach(() => {
    initialState = {
      heroListData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
      topListData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
      bottomListData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
      error: '',
      isLoading: false,
    };
  });

  test('fetchHeroListSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = newsViewReducer(
      initialState,
      newsViewActions.fetchHeroListSuccess({
        heroListData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchHeroListFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = newsViewReducer(
      initialState,
      newsViewActions.fetchHeroListFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('fetchTopListSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = newsViewReducer(
      initialState,
      newsViewActions.fetchTopListSuccess({
        topListData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchTopListFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = newsViewReducer(
      initialState,
      newsViewActions.fetchTopListFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('fetchBottomListFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = newsViewReducer(
      initialState,
      newsViewActions.fetchBottomListFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });
});
