import {renderHook, RenderHookResult} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {useHome,UseHomeReturn} from '../useHome';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('#useHome', () => {
  let result: RenderHookResult<undefined,UseHomeReturn>;
  const mockDispatch = jest.fn()
  
  // test data
  const LoadingStateMock = true;
  const homeDataMock = '';
  const homeErrorMock = '';

  // selectors mock
  const selectLoadingStateMock = jest
    .fn()
    .mockReturnValueOnce(LoadingStateMock);
  const selecthomeDataMock = jest
    .fn()
    .mockReturnValueOnce(homeDataMock);
  const selecthomeErrorMock = jest
    .fn()
    .mockReturnValueOnce(homeErrorMock);

  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(
      selectLoadingStateMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selecthomeDataMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selecthomeErrorMock,
    );
    (useDispatch as jest.Mock).mockImplementationOnce(mockDispatch);
    result = renderHook<undefined,UseHomeReturn>(() => useHome());
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
  describe('#homeData', () => {
    it('homeData', () => {
      const {
        result: {
          current: {homeData},
        },
      } = result;
      expect(homeData).toBe(homeDataMock);
    });
  });

  describe('#homeErrorMock', () => {
    it('should return an error status', () => {
      const {
        result: {
          current: {homeError},
        },
      } = result;

      expect(homeError).toBe(
        homeErrorMock,
      );
    });
  });
});

