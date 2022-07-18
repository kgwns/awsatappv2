import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  useNewsView,
  UseNewsViewReturn,
} from '../useNewsview';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useNewsView', () => {
  let result: RenderHookResult<undefined, UseNewsViewReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseNewsViewReturn>(() =>
    useNewsView(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchHeroListRequest', () => {
    it('should call dispatch with fetchHeroListRequest', () => {
      const {
        result: {
          current: {fetchHeroListRequest},
        },
      } = result;

      act(() => {
        fetchHeroListRequest({
          items_per_page: 5,
          page: 1,
          offset: 2,
          sectionId: 2,
        });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchTopListRequest', () => {
    it('should call dispatch with fetchTopListRequest', () => {
      const {
        result: {
          current: {fetchTopListRequest},
        },
      } = result;

      act(() => {
        fetchTopListRequest({
          items_per_page: 5,
          page: 1,
          offset: 2,
          sectionId: 2,
        });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchBottomListRequest', () => {
    it('should call dispatch with fetchBottomListRequest', () => {
      const {
        result: {
          current: {fetchBottomListRequest},
        },
      } = result;

      act(() => {
        fetchBottomListRequest({
          items_per_page: 5,
          page: 1,
          offset: 2,
          sectionId: 2,
        });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
