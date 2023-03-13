import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import { EMPTY_FORGOT_PASSWORD_RESPONSE, EMPTY_LOGIN_DATA, FETCH_USER_LOGOUT, LOGIN_SKIPPED } from 'src/redux/login/actionTypes';
import {
  useLogin,
  UseLoginReturn,
} from '../useLogin';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useLogin', () => {
  let result: RenderHookResult<undefined, UseLoginReturn>;

  const dispatchMock = jest.fn();
  const selectorMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);
    (useSelector as jest.Mock).mockReturnValue({token:{access_token:'token'}});

    result = renderHook<undefined, UseLoginReturn>(() =>
      useLogin(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchLoginRequest', () => {
    it('should call dispatch with fetchLoginRequest', () => {
      const {
        result: {
          current: {fetchLoginRequest},
        },
      } = result;

      act(() => {
        fetchLoginRequest({email: 'abc@gmail.com', password: 'Password@123', device_name: 'Samsung'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchLogoutRequest', () => {
    it('should call dispatch with fetchLogoutRequest', () => {
      const {
        result: {
          current: {fetchLogoutRequest},
        },
      } = result;

      act(() => {
        fetchLogoutRequest();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: FETCH_USER_LOGOUT,
      });
    });
  });

  describe('#loginSkipped', () => {
    it('should call dispatch with loginSkipped', () => {
      const {
        result: {
          current: {loginSkipped},
        },
      } = result;

      act(() => {
        loginSkipped();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: LOGIN_SKIPPED,
      });
    });
  });

  describe('#emptyLoginDataInfo', () => {
    it('should call dispatch with emptyLoginDataInfo', () => {
      const {
        result: {
          current: {emptyLoginDataInfo},
        },
      } = result;

      act(() => {
        emptyLoginDataInfo();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_LOGIN_DATA,
      });
    });
  });

  describe('#emptyforgotPassworResponseInfo', () => {
    it('should call dispatch with emptyforgotPassworResponseInfo', () => {
      const {
        result: {
          current: {emptyforgotPassworResponseInfo},
        },
      } = result;

      act(() => {
        emptyforgotPassworResponseInfo();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_FORGOT_PASSWORD_RESPONSE,
      });
    });
  });

  describe('#forgotPassworRequest', () => {
    it('should call dispatch with forgotPassworRequest', () => {
      const {
        result: {
          current: {forgotPassworRequest},
        },
      } = result;

      act(() => {
        forgotPassworRequest({email: 'abc@gmail.com'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
describe('#useLogin', () => {
  let result: RenderHookResult<undefined, UseLoginReturn>;

  const dispatchMock = jest.fn();
  const selectorMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);
    (useSelector as jest.Mock).mockReturnValue(selectorMock);

    result = renderHook<undefined, UseLoginReturn>(() =>
      useLogin(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#loginSkipped', () => {
    it('should call dispatch with loginSkipped', () => {
      const {
        result: {
          current: {loginSkipped},
        },
      } = result;

      act(() => {
        loginSkipped();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: LOGIN_SKIPPED,
      });
    });
  });

});
