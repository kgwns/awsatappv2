import { AppState, Selector } from 'src/redux/rootReducer';
import { VideoItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.documentaryVideo.isVideoLoading;

export const getDocumentaryVideo: Selector<VideoItemType[]> = (state: AppState) =>
  state.documentaryVideo.videoDocumentaryData;

export const getDocumentaryVideoError: Selector<string> = (state: AppState) =>
  state.documentaryVideo.videoDocumentaryError;
