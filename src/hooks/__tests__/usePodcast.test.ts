import {renderHook, RenderHookResult, act} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {
  usePodcast,
  UsePodcastReturn,
} from '../usePodcast';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('#usePodcast', () => {
  let result: RenderHookResult<undefined, UsePodcastReturn>;

  const dispatchMock = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);

    result = renderHook<undefined, UsePodcastReturn>(() =>
      usePodcast(),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
    result.unmount();
  });

  describe('#fetchPodcastEpisodeRequest', () => {
    it('should call dispatch with fetchPodcastEpisodeRequest', () => {
      const {
        result: {
          current: {fetchPodcastEpisodeRequest},
        },
      } = result;

      act(() => {
        fetchPodcastEpisodeRequest({nid: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('#fetchPodcastListRequest', () => {
    it('should call dispatch with fetchPodcastListRequest', () => {
      const {
        result: {
          current: {fetchPodcastListRequest},
        },
      } = result;

      act(() => {
        fetchPodcastListRequest({tid: 2});
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

});
