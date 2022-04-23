import {renderHook, RenderHookResult} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {useAppCommon,UseAppCommonReturn} from '../useAppCommon';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('#useAppCommon', () => {
  let result: RenderHookResult<undefined,UseAppCommonReturn>;

  // test data
  const theme = 'light';

  // selectors mock
  const selectIsLoginLoadingMock = jest
    .fn()
    .mockReturnValueOnce(theme);

    const mockDispatch = jest.fn()


  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(selectIsLoginLoadingMock);
    (useDispatch as jest.Mock).mockImplementationOnce(mockDispatch);

    result = renderHook<undefined,UseAppCommonReturn>(() => useAppCommon());
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#select theme', () => {
    it('should return theme', () => {
      const {
        result: {
          current: {theme},
        },
      } = result;
      expect(theme).toBe('light');
    });
  });
});
