import { useDispatch, useSelector } from 'react-redux';
import {
  getPodcastListData,
  getIsLoading,
  getPodcastListError,
  getPodcastEpisodeData,
  getPodcastEpisodeError,
} from 'src/redux/podcast/selectors';
import { fetchPodcastList, fetchPodcastEpisode } from 'src/redux/podcast/action';
import {
  PodcastListItemType,
  PodcastListBodyGet,
  PodcastEpisodeItemType,
  PodcastEpisodeBodyGet,
} from 'src/redux/podcast/types';

export interface UsePodcastReturn {
  isLoading: boolean;
  podcastListData: PodcastListItemType[];
  podcastListError: string;
  podcastEpisodeData: PodcastEpisodeItemType[];
  podcastEpisodeError: string;
  fetchPodcastListRequest(payload: PodcastListBodyGet): void;
  fetchPodcastEpisodeRequest(payload: PodcastEpisodeBodyGet): void;
}

export const usePodcast = (): UsePodcastReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const podcastListData = useSelector(getPodcastListData);
  const podcastListError = useSelector(getPodcastListError);
  const podcastEpisodeData = useSelector(getPodcastEpisodeData);
  const podcastEpisodeError = useSelector(getPodcastEpisodeError);
  const fetchPodcastListRequest = (payload: PodcastListBodyGet) => {
    dispatch(fetchPodcastList(payload));
  };
  const fetchPodcastEpisodeRequest = (payload: PodcastEpisodeBodyGet) => {
    dispatch(fetchPodcastEpisode(payload));
  };
  return {
    isLoading,
    podcastListData,
    podcastListError,
    fetchPodcastListRequest,
    podcastEpisodeData,
    podcastEpisodeError,
    fetchPodcastEpisodeRequest,
  };
};
