import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { useSectionArticles, UseSectionArticlesReturn } from '../useSectionArticles';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useRegister', () => {
  let result: RenderHookResult<undefined, UseSectionArticlesReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseSectionArticlesReturn>(() =>
    useSectionArticles(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchSectionArticlesRequest', () => {
    it('should call dispatch with fetchSectionArticlesRequest', () => {
      const {
        result: {
          current: {fetchSectionArticlesRequest},
        },
      } = result;

      act(() => {
        fetchSectionArticlesRequest({sectionId:'2',page:20});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#emptySectionArticleData', () => {
    it('should call dispatch with emptySectionArticleData', () => {
      const {
        result: {
          current: {emptySectionArticleData},
        },
      } = result;

      act(() => {
        emptySectionArticleData();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});

