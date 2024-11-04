import { AppState, Selector } from 'src/redux/rootReducer';
import { VideoItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.videoList.isLoading;

export const getVideoData: Selector<VideoItemType[]> = (state: AppState) =>
  state.videoList.videoData;

export const getVideoError: Selector<string> = (state: AppState) =>
  state.videoList.error;

export const getIsVideoLoading: Selector<boolean> = (state: AppState) =>
  state.videoList.isVideoLoading;

export const getVideoPaginationData: Selector<VideoItemType[]> = (state: AppState) =>
  state.videoList.videoPaginationData;

export const getVideoPaginationError: Selector<string> = (state: AppState) =>
  state.videoList.videoError;

export const getVideoByData: Selector<VideoItemType[]> = (state: AppState) =>
  state.videoList.videoByIdData;