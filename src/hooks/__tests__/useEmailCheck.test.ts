import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { EMPTY_EMAIL_CHECK_DATA } from 'src/redux/auth/actionTypes';
import {
  useEmailCheck,
  UseEmailCheckReturn,
} from '../useEmailCheck';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useEmailCheck', () => {
  let result: RenderHookResult<undefined, UseEmailCheckReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseEmailCheckReturn>(() =>
      useEmailCheck(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchEmailCheckRequest', () => {
    it('should call dispatch with fetchEmailCheckRequest', () => {
      const {
        result: {
          current: {fetchEmailCheckRequest},
        },
      } = result;

      act(() => {
        fetchEmailCheckRequest({email: 'abc@gmail.com'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptyEmailCheckInfo', () => {
    it('should call dispatch with emptyEmailCheckInfo', () => {
      const {
        result: {
          current: {emptyEmailCheckInfo},
        },
      } = result;

      act(() => {
        emptyEmailCheckInfo();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_EMAIL_CHECK_DATA,
      });
    });
  });

});
