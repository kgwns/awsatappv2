import { allWritersActions } from '../action';
import allWriters from '../reducer';
import { AllWritersState } from '../types';

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
});