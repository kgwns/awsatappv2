import {storeInfo} from 'src/constants/Constants';
import {
  getIsLoading,
  getNewsLettersError,
  getSelectedNewsLettersDataList,
  getSentNewsLettersInfoData,
  getIsMyNewsLoading,
  getMyNewsLettersDataList,
  getMyNewsLettersError,
  getSelectedNewsLettersDataFromOnBoard,
} from '../selectors';
import { ResponseMessage, SelectedNewsLettersDataType } from '../types';

describe('News Letters Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get selected News Letters Data state', () => {
    const error = getSelectedNewsLettersDataList(storeData);
    expect(error).toEqual({});
  });

  test('Get sent News Letters Info Data state', () => {
    const error = getSelectedNewsLettersDataList(storeData);
    expect(error).toEqual({});
  });

  test('Get error state', () => {
    const data = getNewsLettersError(storeData);
    expect(data).toEqual('');
  });

  test('getSentNewsLettersInfoData state', () => {
    const sendNewsLettersInfo: ResponseMessage = getSentNewsLettersInfoData(storeData);
    expect(sendNewsLettersInfo).toEqual({});
  });

  test('getIsMyNewsLoading state', () => {
    const isMyNewsLoading: boolean = getIsMyNewsLoading(storeData);
    expect(isMyNewsLoading).toEqual(false);
  });

  test('getMyNewsLettersDataList state', () => {
    const myNewsLetters: SelectedNewsLettersDataType = getMyNewsLettersDataList(storeData);
    expect(myNewsLetters).toEqual({});
  });

  test('getMyNewsLettersError state', () => {
    const myNewsError: string = getMyNewsLettersError(storeData);
    expect(myNewsError).toEqual('');
  });

  test('getSelectedNewsLettersDataFromOnBoard state', () => {
    const selectedDataFromNewsLetterOnboard: string[] = getSelectedNewsLettersDataFromOnBoard(storeData);
    expect(selectedDataFromNewsLetterOnboard).toEqual([]);
  });

});
