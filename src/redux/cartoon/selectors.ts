import { AppState, Selector } from 'src/redux/rootReducer';
import { CartoonDataType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.cartoon.isLoading;

export const getCartoonListData: Selector<CartoonDataType[]> = (
  state: AppState,
) => state.cartoon.cartoonList;

export const getHasNextPage: Selector<boolean> = (
  state: AppState,
) => state.cartoon.hasNextPage;

export const getCartoonListDataError: Selector<string> = (state: AppState) =>
  state.cartoon.error;
