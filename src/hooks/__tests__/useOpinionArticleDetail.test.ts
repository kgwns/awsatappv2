import {renderHook, RenderHookResult} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {useOpinionArticleDetail,UseOpinionArticleDetailReturn} from '../useOpinionArticleDetail';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('#useOpinionArticleDetail', () => {
  let result: RenderHookResult<undefined,UseOpinionArticleDetailReturn>;
  const mockDispatch = jest.fn()
  
  // test data
  const LoadingStateMock = true;
  const opinionArticleDetailDataMock = {};
  const opinionArticleErrorMock = {};

  // selectors mock
  const selectLoadingStateMock = jest
    .fn()
    .mockReturnValueOnce(LoadingStateMock);
  const selectopinionArticleDetailDataMock = jest
    .fn()
    .mockReturnValueOnce(opinionArticleDetailDataMock);
  const selectopinionArticleErrorMock = jest
    .fn()
    .mockReturnValueOnce(opinionArticleErrorMock);

  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(
      selectLoadingStateMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectopinionArticleDetailDataMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectopinionArticleErrorMock,
    );
    (useDispatch as jest.Mock).mockImplementationOnce(mockDispatch);
    result = renderHook<undefined,UseOpinionArticleDetailReturn>(() => useOpinionArticleDetail());
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

  describe('#opinionArticleDetailData', () => {
    it('opinionArticleDetailData', () => {
      const {
        result: {
          current: {opinionArticleDetailData},
        },
      } = result;
      expect(opinionArticleDetailData).toBe(opinionArticleDetailDataMock);
    });
  });

  describe('#opinionArticleError', () => {
    it('should return an error status', () => {
      const {
        result: {
          current: {opinionArticleError},
        },
      } = result;

      expect(opinionArticleError).toBe(
        opinionArticleErrorMock,
      );
    });
  });
});

