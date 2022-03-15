import { podcastActions } from '../action';
import { FETCH_PODCAST_EPISODE, FETCH_PODCAST_LIST } from '../actionTypes';
import podcastReducer from '../reducer';
import { PodcastState } from '../types';

describe('podcast reducer', () => {
    let initialState: PodcastState;

    beforeEach(() => {
        initialState = {
            podcastListData: [],
            podcastEpisodeData: [],
            error: '',
            isLoading: true,
        };
    });

    test('podcast list Success', () => {
        const testData = [{}];
        initialState.isLoading = true;
        const nextState = podcastReducer(
            initialState,
            podcastActions.fetchPodcastListSuccess({
                podcastListData: testData,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
    });

    test('fetch podcast list failed', () => {
        const testError = 'some-error';
        initialState.isLoading = true;
        const nextState = podcastReducer(
            initialState,
            podcastActions.fetchPodcastListFailed({
                error: testError,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
        expect(nextState.error).toEqual(testError);
    });

    test('podcast episode Success', () => {
        const testData = [{}];
        initialState.isLoading = true;
        const nextState = podcastReducer(
            initialState,
            podcastActions.fetchPodcastEpisodeSuccess({
                podcastEpisodeData: testData,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
    });

    test('fetch podcast episode failed', () => {
        const testError = 'some-error';
        initialState.isLoading = true;
        const nextState = podcastReducer(
            initialState,
            podcastActions.fetchPodcastEpisodeFailed({
                error: testError,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
        expect(nextState.error).toEqual(testError);
    });

    test('Check loading state when FETCH_PODCAST_LIST request API', () => {
        const payload = { tid: 123 }
        const nextState = podcastReducer(initialState, {
            type: FETCH_PODCAST_LIST,
            payload,
        });
        expect(nextState.isLoading).toBe(true);
    });

    test('Check loading state when FETCH_PODCAST_EPISODE request API', () => {
        const payload = { nid: 123 }
        const nextState = podcastReducer(initialState, {
            type: FETCH_PODCAST_EPISODE,
            payload,
        });
        expect(nextState.isLoading).toBe(true);
    });

});
