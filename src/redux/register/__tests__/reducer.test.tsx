import { userRegister, registerSuccess, registerFailed } from '../action';
import registerReducer from '../reducer';
import { RegisterState } from '../types';

describe('Register reducer', () => {
  let initialState: RegisterState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      userInfo: null,
      error: '',
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
      }),
    );

    expect(nextState.isLoading).toBeTruthy();
  });

  test('Register Request Success', () => {
    const testData = {};
    initialState.isLoading = true;
    const nextState = registerReducer(
      initialState,
      registerSuccess({
        userInfo: testData,
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
});