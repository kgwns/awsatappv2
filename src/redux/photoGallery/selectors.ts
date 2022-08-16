import {AppState, Selector} from 'src/redux/rootReducer';
import {AlbumListItemType, AlbumDetailType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.albumList.isLoading;

export const getAlbumListData: Selector<AlbumListItemType[]> = (
  state: AppState,
) => state.albumList.albumData.rows;

export const getAlbumListDataError: Selector<string> = (state: AppState) =>
  state.albumList.error;

export const getAlbumDetailLoading: Selector<boolean> = (state: AppState) =>
  state.albumList.albumDetailLoading;

export const getAlbumDetailData: Selector<AlbumDetailType[]> = (
  state: AppState,
) => state.albumList.albumDetailData.rows;

export const getAlbumDetailDataError: Selector<string> = (state: AppState) =>
  state.albumList.albumDetailError;
