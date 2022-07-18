import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  useHome,
  UseHomeReturn,
} from '../useHome';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useHome', () => {
  let result: RenderHookResult<undefined, UseHomeReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseHomeReturn>(() =>
      useHome(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchHomeRequest', () => {
    it('should call dispatch with fetchHomeRequest', () => {
      const {
        result: {
          current: {fetchHomeRequest},
        },
      } = result;

      act(() => {
        fetchHomeRequest({page: 1});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
