import {AppState, Selector} from 'src/redux/rootReducer';
import {OpinionsListItemType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.opinions.isLoading;

export const getOpinionsData: Selector<OpinionsListItemType[]> = (
  state: AppState,
) => state.opinions.opinionData.rows;

export const getOpinionsByIdData: Selector<OpinionsListItemType[]> = (
  state: AppState,
) => state.opinions.opinionByIdData.rows;

export const getOpinionsError: Selector<string> = (state: AppState) =>
  state.opinions.error;

export const getWriterOpinionIsLoading: Selector<boolean> = (state: AppState) =>
  state.opinions.writerOpinionLoading;

export const getWriterOpinionsData: Selector<OpinionsListItemType[]> = (
  state: AppState,
) => state.opinions.writerOpinionData.rows;

export const getWriterOpinionsError: Selector<string> = (state: AppState) =>
  state.opinions.writerOpinionError;

export const getHomeOpinionNidData: Selector<string> = (state: AppState) =>
  state.opinions.homeOpinionNid
