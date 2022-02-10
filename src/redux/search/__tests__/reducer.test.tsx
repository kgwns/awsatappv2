import { searchActions } from '../action';
import searchReducer from '../reducer';
import { SearchState } from '../types';

describe('Saerch reducer', () => {
  let initialState: SearchState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      searchData: [],
      error: '',
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
});