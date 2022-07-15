import { SaveTokenFailed, SaveTokenSuccess, SaveTokenAfterRegistrationSuccess, SaveTokenAfterRegistrationFailed } from '../action';
import {SAVE_TOKEN_AFTER_REGISTRATION_REQUEST, SAVE_TOKEN_REQUEST} from '../actionType';
import notificationSaveTokenReducer from '../reducer';
import {SaveTokenState} from '../types';

describe('mostRead reducer', () => {
  let initialState: SaveTokenState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      SaveTokenInfo: null,
      SaveTokenAfterRegistraionInfo: null,
      error: '',
    };
  });

  test('SaveTokenSuccess', () => {
    initialState.isLoading = true;
    const nextState = notificationSaveTokenReducer(
      initialState,
      SaveTokenSuccess({ id: 2,
        message: 'string'}),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('SaveTokenFailed', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = notificationSaveTokenReducer(
      initialState,
      SaveTokenFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when notificationSaveTokenReducer SAVE_TOKEN_REQUEST request API', () => {
    const nextState = notificationSaveTokenReducer(initialState, {
      type: SAVE_TOKEN_REQUEST,
      payload: {fcm_token: 'string',
      platform: 'string',
      device_name: 'string'}
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('SaveTokenAfterRegistrationSuccess', () => {
    initialState.isLoading = true;
    const nextState = notificationSaveTokenReducer(
      initialState,
      SaveTokenAfterRegistrationSuccess({ message: 'string'}),
    );
    expect(nextState.isLoading).toBeFalsy();
  });

  test('SaveTokenAfterRegistrationFailed', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = notificationSaveTokenReducer(
      initialState,
      SaveTokenAfterRegistrationFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when get selected news letters EMPTY_ALL_LIST', () => {
    const nextState = notificationSaveTokenReducer(initialState, {
      type: SAVE_TOKEN_AFTER_REGISTRATION_REQUEST,
      payload:{ id: '2', uid: 2 }
    });
    expect(nextState.isLoading).toBe(true);
  });

});
