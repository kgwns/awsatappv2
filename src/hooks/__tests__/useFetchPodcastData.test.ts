import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import { useFetchPodcastData } from '../useFetchPodcastData';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#useFetchPodcastData', () => {
  let result: RenderHookResult<undefined>;
  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook(() =>
        useFetchPodcastData(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchPodcastData', () => {
    it('should call dispatch with fetchPodcastData', () => {
      const {
        result: {
          current: {fetchPodcastDataAnalytics},
        },
      } = result;

      act(() => {
        fetchPodcastDataAnalytics();
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
