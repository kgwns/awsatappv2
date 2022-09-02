import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  useRegister,
  UseRegisterReturn,
} from '../useRegister';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useRegister', () => {
  let result: RenderHookResult<undefined, UseRegisterReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseRegisterReturn>(() =>
      useRegister(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#createUserRequest', () => {
    it('should call dispatch with createUserRequest', () => {
      const {
        result: {
          current: {createUserRequest},
        },
      } = result;

      act(() => {
        createUserRequest({device_name: 'Samsung'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#socialLoginStarted', () => {
    it('should call dispatch with socialLoginStarted', () => {
      const {
        result: {
          current: {socialLoginStarted},
        },
      } = result;

      act(() => {
        socialLoginStarted();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
