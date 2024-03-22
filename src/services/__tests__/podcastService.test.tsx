import { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PodcastEpisodeBodyGet, PodcastListBodyGet } from 'src/redux/podcast/types';
import { fetchPodcastEpisodeApi, fetchPodcastListApi, fetchSingleEpisodeSpreakerApi } from '../podcastService';
import * as serviceApi from 'src/services/api';
describe('Test Podcast Services', () => {
    const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);

    const body: PodcastListBodyGet = {
        tid: 12345,
    }

    const bodyPodcastEpisode: PodcastEpisodeBodyGet = {
        nid: 12345,
    }

    const bodySingleEpisodeSpreakerApi = {
        episodeId: '12345',
    }

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        cachedAxiosMock.reset();
    });

    it('test when fetchPodcastListApi response code is 200', () => {
        cachedAxiosMock.onGet().reply(200, {
            result: true,
        });

        return fetchPodcastListApi(body).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when fetchPodcastListApi throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchPodcastListApi(body).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });

    it('test when fetchPodcastEpisodeApi response code is 200', () => {
        cachedAxiosMock.onGet().reply(200, {
            result: true,
        });

        return fetchPodcastEpisodeApi(bodyPodcastEpisode).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when fetchPodcastEpisodeApi throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchPodcastEpisodeApi(bodyPodcastEpisode).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });

    it('test when fetchSingleEpisodeSpreakerApi response code is 200',() => {
        cachedAxiosMock.onGet().reply(200, {
            result: true,
        });
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockReturnValueOnce(Promise.resolve({result:true}))

        return fetchSingleEpisodeSpreakerApi(bodySingleEpisodeSpreakerApi).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    })

    it('test when fetchSingleEpisodeSpreakerApi response code is 404', () => {
        cachedAxiosMock.onGet().reply(404, {
            error: 'Something Went Wrong',
        });

        return fetchSingleEpisodeSpreakerApi(bodySingleEpisodeSpreakerApi).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(404);
        });
    });
});