import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
    useFetchArabicData
} from '../useFetchArabicData';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useFetchArabicData', () => {
  let result: RenderHookResult<undefined>;
  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined>(() =>
    useFetchArabicData(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchArabicData', () => {
    it('should call dispatch with fetchArabicData', () => {
      const {
        result: {
          current: {fetchArabicData},
        },
      } = result;

      act(() => {
        fetchArabicData();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
