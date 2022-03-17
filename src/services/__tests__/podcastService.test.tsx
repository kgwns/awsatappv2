import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PodcastEpisodeBodyGet, PodcastListBodyGet } from 'src/redux/podcast/types';
import { fetchPodcastEpisodeApi, fetchPodcastListApi } from '../podcastService';

describe('Test Podcast Services', () => {
    const mock = new MockAdapter(axios);

    const body: PodcastListBodyGet = {
        tid: 12345,
    }

    const bodyPodcastEpisode: PodcastEpisodeBodyGet = {
        nid: 12345,
    }

    beforeEach(() => {
        jest.useFakeTimers('legacy');
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when fetchPodcastListApi response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchPodcastListApi(body).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when fetchPodcastListApi response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchPodcastListApi(body).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });

    it('test when fetchPodcastEpisodeApi response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchPodcastEpisodeApi(bodyPodcastEpisode).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when fetchPodcastEpisodeApi response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchPodcastEpisodeApi(bodyPodcastEpisode).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});