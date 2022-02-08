import { mostReadActions } from '../action';
import mostReadReducer from '../reducer';
import { MostReadState } from '../types';

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
});