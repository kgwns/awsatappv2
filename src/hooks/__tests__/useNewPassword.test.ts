import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  useNewPassword,
  UseChangePassword,
} from '../useNewPassword';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useNewPassword', () => {
  let result: RenderHookResult<undefined, UseChangePassword>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseChangePassword>(() =>
      useNewPassword(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#changePasswordInfo', () => {
    it('should call dispatch with changePasswordInfo', () => {
      const {
        result: {
          current: {changePasswordInfo},
        },
      } = result;

      act(() => {
        changePasswordInfo({ password: 'abc@Password12com', old_password: 'Password12@'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptyPasswordResponseInfo', () => {
    it('should call dispatch with emptyPasswordResponseInfo', () => {
      const {
        result: {
          current: {emptyPasswordResponseInfo},
        },
      } = result;

      act(() => {
        emptyPasswordResponseInfo();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
