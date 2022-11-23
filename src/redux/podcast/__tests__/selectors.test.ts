import { storeInfo } from 'src/constants/Constants';
import {
    getIsLoading,
    getPodcastListData,
    getPodcastListError,
    getPodcastEpisodeData,
    getPodcastEpisodeError
} from '../selectors';
import { PodcastListItemType, PodcastEpisodeItemType } from '../types';

describe('podcast Selector', () => {
    const storeData = storeInfo[0];
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(storeData);
        expect(isLoading).toEqual(true);
    });

    test('Get all Writer data', () => {
        const allWriterData: PodcastListItemType[] = getPodcastListData(storeData);
        expect(allWriterData).toEqual([]);
    });

    test('Get error state', () => {
        const data = getPodcastListError(storeData);
        expect(data).toEqual('');
    });

    test('Get all Writer data', () => {
        const allWriterData: PodcastEpisodeItemType[] = getPodcastEpisodeData(storeData);
        expect(allWriterData).toEqual([]);
    });

    test('Get error state', () => {
        const data = getPodcastEpisodeError(storeData);
        expect(data).toEqual('');
    });

});
