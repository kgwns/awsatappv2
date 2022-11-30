import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { EMPTY_JOURNALIST_ARTICLE } from 'src/redux/journalist/actionType';
import {
  useJournalist,
  UseJournalistReturn,
} from '../useJournalist';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useJournalist', () => {
  let result: RenderHookResult<undefined, UseJournalistReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseJournalistReturn>(() =>
      useJournalist(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#getJournalistArticleInfo', () => {
    it('should call dispatch with getJournalistArticleInfo', () => {
      const {
        result: {
          current: {getJournalistArticleInfo},
        },
      } = result;

      act(() => {
        getJournalistArticleInfo({
          nid: '12',
          page: 12,
        });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#getJournalistDetailInfo', () => {
    it('should call dispatch with getJournalistDetailInfo', () => {
      const {
        result: {
          current: {getJournalistDetailInfo},
        },
      } = result;

      act(() => {
        getJournalistDetailInfo({
          tid: '12'
        });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptyJournalistArticleInfo', () => {
    it('should call dispatch with emptyJournalistArticleInfo', () => {
      const {
        result: {
          current: {emptyJournalistArticleInfo},
        },
      } = result;

      act(() => {
        emptyJournalistArticleInfo();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_JOURNALIST_ARTICLE,
      });
    });
  });

});
