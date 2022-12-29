import {act, renderHook, RenderHookResult} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import { GET_BOOK_MARKED, GET_BOOK_MARKED_SUCCESS, UPDATED_FILTERED_DATA_SUCCESS, UPDATE_ADD_REMOVE_BOOK_MARK } from 'src/redux/bookmark/actionType';
import {useBookmark,UseBookMarkReturn} from 'src/hooks/useBookmark';
import { PopulateWidgetType } from 'src/components/molecules';
import { recordLogEvent } from 'src/shared/utils';
import { store } from 'src/redux/store';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('#useBookmark', () => {
  let result: RenderHookResult<undefined,UseBookMarkReturn>;
  const mockDispatch = jest.fn()
  
  // test data
  const LoadingStateMock = true;
  const bookMarkSuccessInfoMock = {};
  const bookmarkIdInfoMock: any[] = []
  const bookmarkDetailMock: any = []
  const filterBookmarkDetailInfoMock:any = []
  const userProfileDataMock:any = []
  // selectors mock
  const selectLoadingStateMock = jest
    .fn()
    .mockReturnValueOnce(LoadingStateMock);
    const selectuserProfileDataMock = jest
    .fn()
    .mockReturnValueOnce(userProfileDataMock);
  const selectBookMarkSuccessInfoMock = jest
    .fn()
    .mockReturnValueOnce(bookMarkSuccessInfoMock);
  const selectbookmarkIdInfoMockMock = jest
    .fn()
    .mockReturnValueOnce(bookmarkIdInfoMock);
    const selectFilterBookmarkDetailInfoMock = jest
    .fn()
    .mockReturnValueOnce(filterBookmarkDetailInfoMock);
  const selectBookmarkDetailMock = jest.fn().mockReturnValueOnce(bookmarkDetailMock)


  beforeAll(() => {
    (useDispatch as jest.Mock).mockImplementationOnce(() => mockDispatch);

    (useSelector as jest.Mock).mockImplementationOnce(
      selectLoadingStateMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectBookMarkSuccessInfoMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectbookmarkIdInfoMockMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectFilterBookmarkDetailInfoMock,
    );
    (useSelector as jest.Mock).mockReturnValueOnce(selectuserProfileDataMock);
    (useSelector as jest.Mock).mockImplementationOnce(selectBookmarkDetailMock)

    result = renderHook<undefined,UseBookMarkReturn>(() => useBookmark());
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#isLoading', () => {
    it('isLoading', () => {
      const {
        result: {
          current: {isLoading},
        },
      } = result;
      expect(isLoading).toBe(LoadingStateMock);
    });
  });
  describe('#filterBookmarkDetailInfo', () => {
    it('filterBookmarkDetailInfo', () => {
      const {
        result: {
          current: {filterBookmarkDetailInfo},
        },
      } = result;
      expect(filterBookmarkDetailInfo).toBe(undefined);
    });
  });
  describe('#bookMarkSuccessInfo', () => {
    it('bookMarkSuccessInfo', () => {
      const {
        result: {
          current: {bookMarkSuccessInfo},
        },
      } = result;
      expect(bookMarkSuccessInfo).toBe(bookMarkSuccessInfoMock);
    });
  });
  describe('#bookmarkIdInfo', () => {
    it('bookmarkIdInfo', () => {
      const {
        result: {
          current: {bookmarkIdInfo},
        },
      } = result;
      expect(bookmarkIdInfo).toBe(bookmarkIdInfoMock);
    });
  });
  describe('#sendBookmarkInfo', () => {
    it('should call dispatch with sendBookmarkInfo', () => {
      const {
        result: {
          current: {sendBookmarkInfo},
        },
      } = result;

      act(() => {
        sendBookmarkInfo({
          nid: '',
          bundle: '',
        });
      });
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
  describe('#getBookmarkedId', () => {
    it('should call dispatch with getBookmarkedId', () => {
      const {
        result: {
          current: {getBookmarkedId},
        },
      } = result;

      act(() => {
        getBookmarkedId();
      });
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
  describe('#removeBookmark', () => {
    it('should call dispatch with removeBookmark', () => {
      const {
        result: {
          current: {removeBookmark},
        },
      } = result;
      act(() => {
        removeBookmark();
      });
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
  describe('#getBookmarkDetailData', () => {
    it('should call dispatch with getBookmarkDetailData', () => {
      const {
        result: {
          current: {getBookmarkDetailData},
        },
      } = result;
      act(() => {
        getBookmarkDetailData();
      });
      expect(mockDispatch).toBeTruthy();
    });
  });
  describe('#removeBookmarkedInfo', () => {
    it('should call dispatch with removeBookmarkedInfo', () => {
      const {
        result: {
          current: {removeBookmarkedInfo},
        },
      } = result;
      act(() => {
        removeBookmarkedInfo({
          nid: '2'
        });
      });
      expect(mockDispatch).toBeTruthy();
    });
  });
  
  describe('#getSpecificBundleFavoriteDetail', () => {
    it('should call dispatch with getSpecificBundleFavoriteDetail', () => {
      const {
        result: {
          current: {getSpecificBundleFavoriteDetail},
        },
      } = result;
      act(() => {
        getSpecificBundleFavoriteDetail(PopulateWidgetType.ALBUM,3);
      });
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});

