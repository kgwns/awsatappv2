import { sideMenuAction } from '../action';
import { FETCH_SIDE_MENU } from '../actionTypes';
import sideMenuReducer from '../reducer';
import { SideMenuState } from '../types';

describe('Saerch reducer', () => {
  let initialState: SideMenuState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      sideMenuData: [],
      error: '',
    };
  });

  test('When Initial State', () => {
    initialState.isLoading = false;
    const nextState = sideMenuReducer(
      initialState,
      {
        type: FETCH_SIDE_MENU,
      },
    );

    expect(nextState.isLoading).toBeTruthy();
  });

  test('fetchSearchSuccess', () => {
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

  test('fetchSearchFailure', () => {
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
});