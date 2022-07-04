import {renderHook, RenderHookResult} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {useBookmark,UseBookMarkReturn} from '../useBookmark';

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
  const bookmarkIdInfoMock = {
    data: []
  };

  // selectors mock
  const selectLoadingStateMock = jest
    .fn()
    .mockReturnValueOnce(LoadingStateMock);
  const selectBookMarkSuccessInfoMock = jest
    .fn()
    .mockReturnValueOnce(bookMarkSuccessInfoMock);
  const selectbookmarkIdInfoMockMock = jest
    .fn()
    .mockReturnValueOnce(bookmarkIdInfoMock);


  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(
      selectLoadingStateMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectBookMarkSuccessInfoMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectbookmarkIdInfoMockMock,
    );
    (useDispatch as jest.Mock).mockImplementationOnce(mockDispatch);
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
});

