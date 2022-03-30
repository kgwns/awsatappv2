import {AppState, Selector} from 'src/redux/rootReducer';
import { WriterDetailDataType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.writerDetail.isLoading;

export const getWriterDetail: Selector<WriterDetailDataType[]> = (
  state: AppState,
) => state.writerDetail.writersDetail;

export const getWriterDetailError: Selector<string> = (state: AppState) =>
  state.writerDetail.error;
