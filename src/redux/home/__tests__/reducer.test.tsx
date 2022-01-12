import {homeActions} from '../action';
import homeReducer from '../reducer';
import {HomeState} from '../types';

describe('dashbaord reducer', () => {
  let initialState: HomeState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      homeData: '',
      error: '',
    };
  });

  test('homeRequest', () => {
    const nextState = homeReducer(
      initialState,
      homeActions.requestHome({page:1}),
    );

    expect(nextState.isLoading).toBeTruthy();
  });

  test('fetchHomeSuccess', () => {
    const testData = 'some-error';
    initialState.isLoading = true;
    const nextState = homeReducer(
      initialState,
      homeActions.requestHomeSuccess({
        homeData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchHomeFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = homeReducer(
      initialState,
      homeActions.requestHomeFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });
});
