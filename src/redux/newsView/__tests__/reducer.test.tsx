import {newsViewActions} from '../action';
import {
  REQUEST_BOTTOM_LIST_DATA,
  REQUEST_HERO_LIST_DATA,
  REQUEST_TOP_LIST_DATA,
} from '../actionTypes';
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

  test('Check loading state when newsViewReducer REQUEST_TOP_LIST_DATA request API', () => {
    const nextState = newsViewReducer(initialState, {
      type: REQUEST_TOP_LIST_DATA,
      payload: {items_per_page: 10, page: 0, offset: 0},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when newsViewReducer REQUEST_HERO_LIST_DATA request API', () => {
    const nextState = newsViewReducer(initialState, {
      type: REQUEST_HERO_LIST_DATA,
      payload: {items_per_page: 10, page: 0, offset: 0},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when newsViewReducer REQUEST_BOTTOM_LIST_DATA request API', () => {
    const nextState = newsViewReducer(initialState, {
      type: REQUEST_BOTTOM_LIST_DATA,
      payload: {items_per_page: 10, page: 0, offset: 0},
    });
    expect(nextState.isLoading).toBe(true);
  });
});
