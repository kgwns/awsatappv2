import {renderHook, RenderHookResult} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {useOpinionWriter,UseOpinionWriterReturn} from '../useOpinionWriter';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('#useOpinionWriter', () => {
  let result: RenderHookResult<undefined,UseOpinionWriterReturn>;
  const mockDispatch = jest.fn()
  
  // test data
  const LoadingStateMock = true;
  const opinionWriterDataMock = {};
  const opinionWriterErrorMock = {};

  // selectors mock
  const selectLoadingStateMock = jest
    .fn()
    .mockReturnValueOnce(LoadingStateMock);
  const selectopinionWriterDataMock = jest
    .fn()
    .mockReturnValueOnce(opinionWriterDataMock);
  const selectopinionWriterErrorMock = jest
    .fn()
    .mockReturnValueOnce(opinionWriterErrorMock);

  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(
      selectLoadingStateMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectopinionWriterDataMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectopinionWriterErrorMock,
    );
    (useDispatch as jest.Mock).mockImplementationOnce(mockDispatch);
    result = renderHook<undefined,UseOpinionWriterReturn>(() => useOpinionWriter());
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

  describe('#opinionWriterData', () => {
    it('opinionWriterData', () => {
      const {
        result: {
          current: {opinionWriterData},
        },
      } = result;
      expect(opinionWriterData).toBe(opinionWriterDataMock);
    });
  });

  describe('#opinionWriterError', () => {
    it('should return an error status', () => {
      const {
        result: {
          current: {opinionWriterError},
        },
      } = result;

      expect(opinionWriterError).toBe(
        opinionWriterErrorMock,
      );
    });
  });
});

