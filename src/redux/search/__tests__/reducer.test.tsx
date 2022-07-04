import { searchActions } from '../action';
import { CLEAR_SEARCH_HISTORY, UPDATE_SEARCH_HISTORY } from '../actionTypes';
import searchReducer from '../reducer';
import { SearchState } from '../types';

describe('Saerch reducer', () => {
  let initialState: SearchState;

  beforeEach(() => {
    initialState = {
      searchData: [],
      error: '',
      isLoading: false,
      searchHistory: []
    };
  });

  test('When Initial State', () => {
    const mockString = 'mockString';
    initialState.isLoading = false;
    const nextState = searchReducer(
      initialState,
      searchActions.fetchSearchRequest({
        searchText: mockString,
      }),
    );

    expect(nextState.isLoading).toBeTruthy();
  });

  test('fetchSearchSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = searchReducer(
      initialState,
      searchActions.fetchSearchSuccess({
        searchData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchSearchFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = searchReducer(
      initialState,
      searchActions.fetchSearchFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when get selected news letters EMPTY_USER_INFO', () => {
    const nextState = searchReducer(initialState, {
      type: UPDATE_SEARCH_HISTORY,
      payload: []
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters EMPTY_USER_INFO', () => {
    const nextState = searchReducer(initialState, {
      type: CLEAR_SEARCH_HISTORY,
    });
    expect(nextState.isLoading).toBe(false);
  });
});