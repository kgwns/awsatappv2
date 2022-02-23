import {allWritersActions} from '../action';
import {FETCH_ALL_WRITERS} from '../actionTypes';
import allWriters from '../reducer';
import {AllWritersState} from '../types';

describe('allWriters reducer', () => {
  let initialState: AllWritersState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      allWritersData: [],
      error: '',
    };
  });

  test('fetchAllWritersSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = allWriters(
      initialState,
      allWritersActions.fetchAllWritersSuccess({
        allWritersListData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchAllWritersFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = allWriters(
      initialState,
      allWritersActions.fetchAllWritersFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when allWriters FETCH_ALL_WRITERS request API', () => {
    const nextState = allWriters(initialState, {
      type: FETCH_ALL_WRITERS,
      payload: {items_per_page: 10},
    });
    expect(nextState.isLoading).toBe(true);
  });
});
