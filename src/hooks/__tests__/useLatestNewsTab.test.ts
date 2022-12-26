import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_COVERAGE_BLOCK, REQUEST_EDITORS_CHOICE_DATA, REQUEST_FEATURED_ARTICLE_BLOCK, REQUEST_HORIZONTAL_ARTICLE_BLOCK, REQUEST_PODCAST_HOME_DATA, REQUEST_SPOTLIGHT_COMBO } from 'src/redux/latestNews/actionType';
import { useLatestNewsTab, UseLatestNewsReturn } from '../useLatestNewsTab';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('useLatestNewsTabReactHook', () => {
    let result: RenderHookResult<undefined, UseLatestNewsReturn>;
    const dispatchMock = jest.fn();

    const loadingStateMock = jest.fn().mockReturnValueOnce(false);
    const tickerMock = jest.fn().mockReturnValueOnce([]);
    const heroMock = jest.fn().mockReturnValueOnce([]);
    const heroListMock = jest.fn().mockReturnValueOnce([]);
    const topListMock = jest.fn().mockReturnValueOnce([]);
    const errorMock = jest.fn().mockReturnValueOnce('');

  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(loadingStateMock);
    (useSelector as jest.Mock).mockImplementationOnce(tickerMock);
    (useSelector as jest.Mock).mockImplementationOnce(heroMock);
    (useSelector as jest.Mock).mockImplementationOnce(heroListMock);
    (useSelector as jest.Mock).mockImplementationOnce(topListMock);
    (useSelector as jest.Mock).mockImplementationOnce(errorMock);
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UseLatestNewsReturn>(() =>
    useLatestNewsTab(),
    );
  })

  describe('#fetchTickerAndHeroArticle', () => {
    it('should call dispatch with fetchTickerAndHeroArticle', () => {
      const {
        result: {
          current: {fetchTickerAndHeroArticle},
        },
      } = result;

      act(() => {
        fetchTickerAndHeroArticle({ items_per_page: 2, page: 2, offset: 2 });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchHeroListTopList', () => {
    it('should call dispatch with fetchHeroListTopList', () => {
      const {
        result: {
          current: {fetchHeroListTopList},
        },
      } = result;

      act(() => {
        fetchHeroListTopList({ items_per_page: 2, page: 2, offset: 2 });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchOpinionTopList', () => {
    it('should call dispatch with fetchOpinionTopList', () => {
      const {
        result: {
          current: {fetchOpinionTopList},
        },
      } = result;

      act(() => {
        fetchOpinionTopList({ items_per_page: 2, page: 2, offset: 2 });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchSectionComboOne', () => {
    it('should call dispatch with fetchSectionComboOne', () => {
      const {
        result: {
          current: {fetchSectionComboOne},
        },
      } = result;

      act(() => {
        fetchSectionComboOne({ id: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchSectionComboTwo', () => {
    it('should call dispatch with fetchSectionComboTwo', () => {
      const {
        result: {
          current: {fetchSectionComboTwo},
        },
      } = result;

      act(() => {
        fetchSectionComboTwo({ id: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchSectionComboThree', () => {
    it('should call dispatch with fetchSectionComboThree', () => {
      const {
        result: {
          current: {fetchSectionComboThree},
        },
      } = result;

      act(() => {
        fetchSectionComboThree({ id: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchSectionComboFour', () => {
    it('should call dispatch with fetchSectionComboFour', () => {
      const {
        result: {
          current: {fetchSectionComboFour},
        },
      } = result;

      act(() => {
        fetchSectionComboFour({ id: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchSectionComboFive', () => {
    it('should call dispatch with fetchSectionComboFive', () => {
      const {
        result: {
          current: {fetchSectionComboFive},
        },
      } = result;

      act(() => {
        fetchSectionComboFive({ id: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchSectionComboSix', () => {
    it('should call dispatch with fetchSectionComboSix', () => {
      const {
        result: {
          current: {fetchSectionComboSix},
        },
      } = result;

      act(() => {
        fetchSectionComboSix({ id: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchSectionComboSeven', () => {
    it('should call dispatch with fetchSectionComboSeven', () => {
      const {
        result: {
          current: {fetchSectionComboSeven},
        },
      } = result;

      act(() => {
        fetchSectionComboSeven({ id: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchPodcastHome', () => {
    it('should call dispatch with fetchPodcastHome', () => {
      const {
        result: {
          current: {fetchPodcastHome},
        },
      } = result;

      act(() => {
        fetchPodcastHome();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: REQUEST_PODCAST_HOME_DATA,
      });
    });
  });

  describe('#fetchEditorsChoice', () => {
    it('should call dispatch with fetchEditorsChoice', () => {
      const {
        result: {
          current: {fetchEditorsChoice},
        },
      } = result;

      act(() => {
        fetchEditorsChoice();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: REQUEST_EDITORS_CHOICE_DATA,
      });
    });
  });

  describe('#fetchCoverageBlockData', () => {
    it('should call dispatch with fetchCoverageBlockData', () => {
      const {
        result: {
          current: {fetchCoverageBlockData},
        },
      } = result;

      act(() => {
        fetchCoverageBlockData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: REQUEST_COVERAGE_BLOCK,
      });
    });
  });

  describe('#fetchFeaturedArticleData', () => {
    it('should call dispatch with fetchFeaturedArticleData', () => {
      const {
        result: {
          current: {fetchFeaturedArticleData},
        },
      } = result;

      act(() => {
        fetchFeaturedArticleData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: REQUEST_FEATURED_ARTICLE_BLOCK,
      });
    });
  });

  describe('#fetchHorizontalArticleData', () => {
    it('should call dispatch with fetchHorizontalArticleData', () => {
      const {
        result: {
          current: {fetchHorizontalArticleData},
        },
      } = result;

      act(() => {
        fetchHorizontalArticleData();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: REQUEST_HORIZONTAL_ARTICLE_BLOCK,
      });
    });
  });

  describe('#fetchSpotlight', () => {
    it('should call dispatch with fetchSpotlight', () => {
      const {
        result: {
          current: {fetchSpotlight},
        },
      } = result;

      act(() => {
        fetchSpotlight();
      });

      expect(dispatchMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: REQUEST_SPOTLIGHT_COMBO,
      });
    });
  });

  describe('#fetchSpotlightArticleSection', () => {
    it('should call dispatch with fetchSpotlightArticleSection', () => {
      const {
        result: {
          current: {fetchSpotlightArticleSection},
        },
      } = result;

      act(() => {
        fetchSpotlightArticleSection({ id: 2, page: 2, items_per_page: 2 });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchInfoGraphicBlockData', () => {
    it('should call dispatch with fetchInfoGraphicBlockData', () => {
      const {
        result: {
          current: {fetchInfoGraphicBlockData},
        },
      } = result;

      act(() => {
        fetchInfoGraphicBlockData();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchArchivedArticleSection', () => {
    it('should call dispatch with fetchArchivedArticleSection', () => {
      const {
        result: {
          current: {fetchArchivedArticleSection},
        },
      } = result;

      act(() => {
        fetchArchivedArticleSection();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchSectionComboEight', () => {
    it('should call dispatch with fetchSectionComboEight', () => {
      const {
        result: {
          current: {fetchSectionComboEight},
        },
      } = result;

      act(() => {
        fetchSectionComboEight({
          id: 3,
          items_per_page: 3,
          page: 3,
        });
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});