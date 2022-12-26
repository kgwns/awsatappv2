import { sideMenuAction } from '../action';
import { FETCH_SIDE_MENU } from '../actionTypes';
import sideMenuReducer from '../reducer';
import { SideMenuState } from '../types';

describe('sideMenu reducer', () => {
  let initialState: SideMenuState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      sideMenuData: [],
      error: '',
    };
  });

  test('sideMenu When Initial State', () => {
    initialState.isLoading = false;
    const nextState = sideMenuReducer(
      initialState,
      {
        type: FETCH_SIDE_MENU,
      },
    );

    expect(nextState.isLoading).toBeTruthy();
  });

  test('fetchSideMenuSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = sideMenuReducer(
      initialState,
      sideMenuAction.fetchSideMenuSuccess({
        sideMenuData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchSideMenuFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = sideMenuReducer(
      initialState,
      sideMenuAction.fetchSideMenuFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Default State', () => {
    const nextState = sideMenuReducer(
      initialState, { type:'' }
    )
    expect(nextState.isLoading).toBe(false)
  })
});