import {newsViewActions} from '../action';
import {
  EMPTY_ALL_LIST,
  REQUEST_BOTTOM_LIST_DATA,
  REQUEST_BOTTOM_LIST_SUCCESS,
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
      topListData: [],
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
      payload: {items_per_page: 10, page: 0, offset: 0, sectionId: 1},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when newsViewReducer REQUEST_HERO_LIST_DATA request API', () => {
    const nextState = newsViewReducer(initialState, {
      type: REQUEST_HERO_LIST_DATA,
      payload: {items_per_page: 10, page: 0, offset: 0, sectionId: 1},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when newsViewReducer REQUEST_BOTTOM_LIST_DATA request API', () => {
    const nextState = newsViewReducer(initialState, {
      type: REQUEST_BOTTOM_LIST_DATA,
      payload: {items_per_page: 10, page: 0, offset: 0, sectionId: 1},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when get selected news letters EMPTY_ALL_LIST', () => {
    const nextState = newsViewReducer(initialState, {
      type: EMPTY_ALL_LIST,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters REQUEST_BOTTOM_LIST_SUCCESS', () => {
    const nextState = newsViewReducer(initialState, {
      type: REQUEST_BOTTOM_LIST_SUCCESS,
      payload: {bottomListData: {
        rows: [],
        pager: { current_page: 0, items_per_page: '' }
      }}
    });
    expect(nextState.isLoading).toBe(false);
  });

});
