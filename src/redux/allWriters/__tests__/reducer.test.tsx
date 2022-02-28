import {allWritersActions} from '../action';
import {FETCH_ALL_WRITERS, SEND_SELECTED_AUTHOR, SEND_SELECTED_AUTHOR_ERROR, SEND_SELECTED_AUTHOR_SUCCESS} from '../actionTypes';
import allWriters from '../reducer';
import {AllWritersState} from '../types';

describe('allWriters reducer', () => {
  let initialState: AllWritersState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      allWritersData: [],
      error: '',
      sendAuthorInfo: {}
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

  test('Check loading state when selected author SEND_SELECTED_AUTHOR request API', () => {
    const nextState = allWriters(initialState, {
      type: SEND_SELECTED_AUTHOR,
      payload: {tid: '123'},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_SUCCESS request API', () => {
    const nextState = allWriters(initialState, {
      type: SEND_SELECTED_AUTHOR_SUCCESS,
      payload: {saveData: {}},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_AUTHOR_ERROR request API', () => {
    const nextState = allWriters(initialState, {
      type: SEND_SELECTED_AUTHOR_ERROR,
      payload: {error: 'sample error'},
    });
    expect(nextState.isLoading).toBe(false);
  });
});
