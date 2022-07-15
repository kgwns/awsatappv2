import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { EMPTY_ALL_DATA } from 'src/redux/contentForYou/actionTypes';
import {
  useContentForYou,
  UseContentForYouReturn,
} from '../useContentForYou';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useContentForYou', () => {
  let result: RenderHookResult<undefined, UseContentForYouReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseContentForYouReturn>(() =>
      useContentForYou(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchFavouriteOpinionsRequest', () => {
    it('should call dispatch with fetchFavouriteOpinionsRequest', () => {
      const {
        result: {
          current: {fetchFavouriteOpinionsRequest},
        },
      } = result;

      act(() => {
        fetchFavouriteOpinionsRequest({ page: 1 });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchFavouriteArticlesRequest', () => {
    it('should call dispatch with fetchFavouriteArticlesRequest', () => {
      const {
        result: {
          current: {fetchFavouriteArticlesRequest},
        },
      } = result;

      act(() => {
        fetchFavouriteArticlesRequest({ page: 1 });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptyAllData', () => {
    it('should call dispatch with emptyAllData', () => {
      const {
        result: {
          current: {emptyAllData},
        },
      } = result;

      act(() => {
        emptyAllData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_ALL_DATA,
      });
    });
  });

});
