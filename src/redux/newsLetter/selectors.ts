import { AppState, Selector } from 'src/redux/rootReducer';
import { ResponseMessage, SelectedNewsLettersDataType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
    state.newsLetters.isLoading;

export const getSentNewsLettersInfoData: Selector<ResponseMessage> = (
    state: AppState,
) => state.newsLetters.sendNewsLettersInfo;

export const getSelectedNewsLettersDataList: Selector<SelectedNewsLettersDataType> = (
    state: AppState,
) => state.newsLetters.selectedNewsLettersData;

export const getNewsLettersError: Selector<string> = (state: AppState) =>
    state.newsLetters.error;

export const getIsMyNewsLoading: Selector<boolean> = (state: AppState) =>
    state.newsLetters.isMyNewsLoading;

export const getMyNewsLettersDataList: Selector<SelectedNewsLettersDataType> = (
    state: AppState,
) => state.newsLetters.myNewsLetters;

export const getMyNewsLettersError: Selector<string> = (state: AppState) =>
    state.newsLetters.myNewsError;

export const getSelectedNewsLettersDataFromOnBoard: Selector<string[]> = (
    state: AppState,
) => state.newsLetters.selectedDataFromNewsLetterOnboard;
