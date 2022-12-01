import {storeInfo} from 'src/constants/Constants';
import {getIsLoading, getOpinionsData, getOpinionsError, getWriterOpinionIsLoading, getWriterOpinionsData, getWriterOpinionsError, getHomeOpinionNidData} from '../selectors';
import {OpinionsListItemType} from '../types';

describe('Opinions Selector', () => {
  const storeData = storeInfo[0];

  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get Opinion state', () => {
    const opinionData: OpinionsListItemType[] = getOpinionsData(storeData);
    expect(opinionData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getOpinionsError(storeData);
    expect(error).toEqual('');
  });

  test('Get getWriterOpinionIsLoading state', () => {
    const writerOpinionLoading: boolean = getWriterOpinionIsLoading(storeData);
    expect(writerOpinionLoading).toEqual(true);
  });

  test('getWriterOpinionsData', () => {
    const opinionData: OpinionsListItemType[] = getWriterOpinionsData(storeData);
    expect(opinionData).toEqual([]);
  });

  test('Get getWriterOpinionsError state', () => {
    const writerOpinionError = getWriterOpinionsError(storeData);
    expect(writerOpinionError).toEqual('');
  });

  test('Get getHomeOpinionNidData state', () => {
    const homeOpinionNid = getHomeOpinionNidData(storeData);
    expect(homeOpinionNid).toEqual('');
  });

});
