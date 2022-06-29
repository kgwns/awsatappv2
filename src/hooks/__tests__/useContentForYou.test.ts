import {renderHook, RenderHookResult} from '@testing-library/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {useContentForYou,UseContentForYouReturn} from '../useContentForYou';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('#useContentForYou', () => {
  let result: RenderHookResult<undefined,UseContentForYouReturn>;
  const mockDispatch = jest.fn()
  
  // test data
  const LoadingStateMock = true;
  const favouriteOpinionsDataMock = {};

  // selectors mock
  const selectLoadingStateMock = jest
    .fn()
    .mockReturnValueOnce(LoadingStateMock);
  const selectfavouriteOpinionsDataMock = jest
    .fn()
    .mockReturnValueOnce(favouriteOpinionsDataMock);


  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementationOnce(
      selectLoadingStateMock,
    );
    (useSelector as jest.Mock).mockImplementationOnce(
      selectfavouriteOpinionsDataMock,
    );
    (useDispatch as jest.Mock).mockImplementationOnce(mockDispatch);
    result = renderHook<undefined,UseContentForYouReturn>(() => useContentForYou());
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
  describe('#favouriteOpinionsData', () => {
    it('favouriteOpinionsData', () => {
      const {
        result: {
          current: {favouriteOpinionsData},
        },
      } = result;
      expect(favouriteOpinionsData).toBe(favouriteOpinionsDataMock);
    });
  });
});

