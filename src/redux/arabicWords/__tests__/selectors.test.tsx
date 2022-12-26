import {storeInfo} from 'src/constants/Constants';
import {getArabicData} from '../selectors';

describe('Arabic Word Selector', () => {
  const storeData = storeInfo[0];

  test('Get arabic word data', () => {
    const arabicWordData = getArabicData(storeData);
    expect(arabicWordData).toBe();
  });
});
