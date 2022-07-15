import { FETCH_USER_LOGOUT } from 'src/redux/login/actionTypes';
import { userRegister, registerSuccess, registerFailed } from '../action';
import { EMPTY_USER_INFO, SOCIAL_LOGIN_END, SOCIAL_LOGIN_START } from '../actionTypes';
import registerReducer from '../reducer';
import { RegisterState } from '../types';

describe('Register reducer', () => {
  let initialState: RegisterState;

  beforeEach(() => {
    initialState = {
      userInfo: null,
      error: '',
      isLoading: false,
      socialLoginInProgress: false,
    };
  });

  test('When Initial State', () => {
    const mockString = 'mockString';
    initialState.isLoading = false;
    const nextState = registerReducer(
      initialState,
      userRegister({
        email: mockString,
        name: mockString,
        password: mockString,
        device_name: mockString,
      }),
    );

    expect(nextState.isLoading).toBeTruthy();
  });

  test('Register Request Success', () => {
    initialState.isLoading = true;
    const nextState = registerReducer(
      initialState,
      registerSuccess({
        user: null,
        token: {},
        message: {message: ''},
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('Register Request Failed', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = registerReducer(
      initialState,
      registerFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when get selected news letters FETCH_USER_LOGOUT', () => {
    const nextState = registerReducer(initialState, {
      type: FETCH_USER_LOGOUT,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters SOCIAL_LOGIN_START', () => {
    const nextState = registerReducer(initialState, {
      type: SOCIAL_LOGIN_START,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters EMPTY_USER_INFO', () => {
    const nextState = registerReducer(initialState, {
      type: EMPTY_USER_INFO,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters EMPTY_USER_INFO', () => {
    const nextState = registerReducer(initialState, {
      type: EMPTY_USER_INFO,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters SOCIAL_LOGIN_END', () => {
    const nextState = registerReducer(initialState, {
      type: SOCIAL_LOGIN_END,
    });
    expect(nextState.isLoading).toBe(false);
  });

});