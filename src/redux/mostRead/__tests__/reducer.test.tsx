import {mostReadActions} from '../action';
import {FETCH_MOST_READ} from '../actionTypes';
import mostReadReducer from '../reducer';
import {MostReadState} from '../types';

describe('mostRead reducer', () => {
  let initialState: MostReadState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      mostReadData: [],
      error: '',
    };
  });

  test('fetchMostReadSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = mostReadReducer(
      initialState,
      mostReadActions.fetchMostReadSuccess({
        mostReadData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchMostReadFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = mostReadReducer(
      initialState,
      mostReadActions.fetchMostReadFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when mostReadReducer FETCH_MOST_READ request API', () => {
    const nextState = mostReadReducer(initialState, {
      type: FETCH_MOST_READ,
    });
    expect(nextState.isLoading).toBe(true);
  });
});
