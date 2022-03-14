import {
    FETCH_PODCAST_LIST,
    FETCH_PODCAST_LIST_SUCCESS,
    FETCH_PODCAST_LIST_FAILED,
    FETCH_PODCAST_EPISODE,
    FETCH_PODCAST_EPISODE_SUCCESS,
    FETCH_PODCAST_EPISODE_FAILED,
} from 'src/redux/podcast/actionTypes';
import { fetchPodcastList, fetchPodcastListSuccess, fetchPodcastListFailed, fetchPodcastEpisode, fetchPodcastEpisodeSuccess, fetchPodcastEpisodeFailed } from 'src/redux/podcast/action';
import { PodcastListBodyGet, PodcastEpisodeBodyGet } from 'src/redux/podcast/types';

describe('podcast action', () => {
    const payload: PodcastListBodyGet = {
        tid: 123
    }

    const episodePayload: PodcastEpisodeBodyGet = {
        nid: 123
    }

    test('Check request podcast list type', () => {
        const request = fetchPodcastList(payload)
        expect(request).toEqual({
            type: FETCH_PODCAST_LIST,
            payload
        })
    })

    test('Check request podcast list success type', () => {
        const request = fetchPodcastListSuccess({
            podcastListData: {}
        })
        expect(request.type).toEqual(FETCH_PODCAST_LIST_SUCCESS)
    })

    test('Check request podcast list failed type', () => {
        const request = fetchPodcastListFailed({
            error: ''
        })
        expect(request.type).toEqual(FETCH_PODCAST_LIST_FAILED)
    })

    test('Check request fetch podcast episode type', () => {
        const request = fetchPodcastEpisode(episodePayload)
        expect(request).toEqual({
            type: FETCH_PODCAST_EPISODE,
            payload: episodePayload
        })
    })

    test('Check request fetch podcast episode success type', () => {
        const request = fetchPodcastEpisodeSuccess({
            podcastEpisodeData: {}
        })
        expect(request.type).toEqual(FETCH_PODCAST_EPISODE_SUCCESS)
    })

    test('Check request fetch podcast episode failed type', () => {
        const request = fetchPodcastEpisodeFailed({
            error: ''
        })
        expect(request.type).toEqual(FETCH_PODCAST_EPISODE_FAILED)
    })
})


