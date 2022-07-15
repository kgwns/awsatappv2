import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { EMPTY_OPINION_ARTICLE_DETAIL, EMPTY_RELATED_OPINION_DATA } from 'src/redux/opinionArticleDetail/actionTypes';
import {
  useOpinionArticleDetail,
  UseOpinionArticleDetailReturn,
} from '../useOpinionArticleDetail';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useOpinionArticleDetail', () => {
  let result: RenderHookResult<undefined, UseOpinionArticleDetailReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseOpinionArticleDetailReturn>(() =>
      useOpinionArticleDetail(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchOpinionArticleDetail', () => {
    it('should call dispatch with fetchOpinionArticleDetail', () => {
      const {
        result: {
          current: {fetchOpinionArticleDetail},
        },
      } = result;

      act(() => {
        fetchOpinionArticleDetail({nid: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchRelatedOpinionData', () => {
    it('should call dispatch with fetchRelatedOpinionData', () => {
      const {
        result: {
          current: {fetchRelatedOpinionData},
        },
      } = result;

      act(() => {
        fetchRelatedOpinionData({page: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchNarratedOpinionData', () => {
    it('should call dispatch with fetchNarratedOpinionData', () => {
      const {
        result: {
          current: {fetchNarratedOpinionData},
        },
      } = result;

      act(() => {
        fetchNarratedOpinionData({jwPlayerID: '2'});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptyRelatedOpinionData', () => {
    it('should call dispatch with emptyRelatedOpinionData', () => {
      const {
        result: {
          current: {emptyRelatedOpinionData},
        },
      } = result;

      act(() => {
        emptyRelatedOpinionData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_RELATED_OPINION_DATA,
      });
    });
  });

  describe('#emptyOpinionArticleData', () => {
    it('should call dispatch with emptyOpinionArticleData', () => {
      const {
        result: {
          current: {emptyOpinionArticleData},
        },
      } = result;

      act(() => {
        emptyOpinionArticleData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: EMPTY_OPINION_ARTICLE_DETAIL,
      });
    });
  });

});
