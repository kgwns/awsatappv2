import { topMenuAction } from '../action';
import { FETCH_TOP_MENU } from '../actionTypes';
import topMenuReducer from '../reducer';
import { TopMenuState } from '../types';

describe('topMenu reducer', () => {
  let initialState: TopMenuState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      topMenuData: [],
      error: '',
    };
  });

  test('topMenu When Initial State', () => {
    initialState.isLoading = false;
    const nextState = topMenuReducer(
      initialState,
      {
        type: FETCH_TOP_MENU,
      },
    );

    expect(nextState.isLoading).toBeTruthy();
  });

  test('fetchTopMenuSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = topMenuReducer(
      initialState,
      topMenuAction.fetchTopMenuSuccess({
        topMenuData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchSideMenuFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = topMenuReducer(
      initialState,
      topMenuAction.fetchTopMenuFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Default State', () => {
    const nextState = topMenuReducer(
      initialState, { type:'' }
    )
    expect(nextState.isLoading).toBe(false)
  })
});