import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  useNotificationSaveToken,
  UseSaveTokenReturn,
} from '../useNotificationSaveToken';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useNotificationSaveToken', () => {
  let result: RenderHookResult<undefined, UseSaveTokenReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseSaveTokenReturn>(() =>
      useNotificationSaveToken(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#saveTokenAfterRegistrationRequest', () => {
    it('should call dispatch with saveTokenAfterRegistrationRequest', () => {
      const {
        result: {
          current: {saveTokenAfterRegistrationRequest},
        },
      } = result;

      act(() => {
        saveTokenAfterRegistrationRequest({id: '2', uid: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
