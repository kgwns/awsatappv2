import { storeInfo } from 'src/constants/Constants';
import { getPodcastData } from '../selectors';

describe('PodcastAnalytics Selector', () => {
    const storeData = storeInfo[0];
    test('Check getPodcastData returns correct response', () => {
        const response = getPodcastData(storeData);
        expect(response).toEqual(storeData.podcastData);
    });
});
