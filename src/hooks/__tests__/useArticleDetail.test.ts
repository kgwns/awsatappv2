import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { EMPTY_DATA } from 'src/redux/articleDetail/actionType';
import {
  useArticleDetail,
  UseArticleDetailReturn,
} from '../useArticleDetail';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useArticleDetail', () => {
  let result: RenderHookResult<undefined, UseArticleDetailReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseArticleDetailReturn>(() =>
      useArticleDetail(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#select isLoading', () => {
    it('should return isLoading', () => {
      const {
        result: {
          current: {isLoading},
        },
      } = result;
      expect(isLoading).toBe(undefined);
    });
  });

  describe('#select articleError', () => {
    it('should return articleError', () => {
      const {
        result: {
          current: {articleError},
        },
      } = result;
      expect(articleError).toBe(undefined);
    });
  });

  describe('#select articleDetailData', () => {
    it('should return articleDetailData', () => {
      const {
        result: {
          current: {articleDetailData},
        },
      } = result;
      expect(articleDetailData).toBe(undefined);
    });
  });

  describe('#select relatedArticleData', () => {
    it('should return relatedArticleData', () => {
      const {
        result: {
          current: {relatedArticleData},
        },
      } = result;
      expect(relatedArticleData).toBe(undefined);
    });
  });

  describe('#select isArticleSectionLoaded', () => {
    it('should return isArticleSectionLoaded', () => {
      const {
        result: {
          current: {isArticleSectionLoaded},
        },
      } = result;
      expect(isArticleSectionLoaded).toBe(undefined);
    });
  });

  describe('#fetchArticleDetail', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {fetchArticleDetail},
        },
      } = result;

      act(() => {
        fetchArticleDetail({nid: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchRelatedArticle', () => {
    it('should call dispatch with get token request action', () => {
      const {
        result: {
          current: {fetchRelatedArticle},
        },
      } = result;

      act(() => {
        fetchRelatedArticle({ tid: 2, nid: 2 });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptyAllData', () => {
    it('should call dispatch with get token request action', () => {
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
        type: EMPTY_DATA,
      });
    });
  });

});
