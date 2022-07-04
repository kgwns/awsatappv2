import { AppState, Selector } from 'src/redux/rootReducer';
import { PodcastListItemType, PodcastEpisodeItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.podcast.isLoading;

export const getPodcastListData: Selector<PodcastListItemType[]> = (state: AppState) =>
  state.podcast.podcastListData;

export const getPodcastEpisodeData: Selector<PodcastEpisodeItemType[]> = (state: AppState) =>
  state.podcast.podcastEpisodeData;

export const getPodcastListError: Selector<string> = (state: AppState) =>
  state.podcast.error;

export const getPodcastEpisodeError: Selector<string> = (state: AppState) =>
  state.podcast.error;
