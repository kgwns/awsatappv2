import { AppState, Selector } from 'src/redux/rootReducer';
import { VideoItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.videoList.isLoading;

export const getVideoData: Selector<VideoItemType[]> = (state: AppState) =>
  state.videoList.videoData;

export const getVideoError: Selector<string> = (state: AppState) =>
  state.videoList.error;
  