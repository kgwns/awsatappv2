import { testSaga } from 'redux-saga-test-plan';
import { FETCH_PODCAST_EPISODE, FETCH_PODCAST_LIST } from '../actionTypes';
import podcastSaga, { fetchPodcastList, fetchPodcastEpisode } from '../sagas';
import { fetchPodcastEpisodeSuccess, fetchPodcastListSuccess } from '../action';
import { fetchPodcastEpisodeApi, fetchPodcastListApi } from 'src/services/podcastService';
import { takeLatest } from 'redux-saga/effects';

import {
    FetchPodcastEpisodeSuccessPayloadtype,
    FetchPodcastEpisodeType,
    FetchPodcastListSuccessPayloadtype,
    FetchPodcastListType} from '../types';

const mockItems = 123;

const requestActionPodcastEpisode: FetchPodcastEpisodeType = {
    type: FETCH_PODCAST_EPISODE,
    payload: { nid: mockItems },
    rows: [],
    pager: {}
};

const requestActionPodcastList: FetchPodcastListType = {
    type: FETCH_PODCAST_LIST,
    payload: { tid: mockItems },
    rows: [],
    pager: {}
};

const sucessResponseObject: FetchPodcastEpisodeSuccessPayloadtype = {
    podcastEpisodeData: [],
};

const sucessResponseObjectPodcastList: FetchPodcastListSuccessPayloadtype = {
    podcastListData: [],
};

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' },
};


describe('Test podcastlist success', () => {
    it('fire on FETCH_PODCAST_LIST', () => {
        testSaga(fetchPodcastList, requestActionPodcastList)
            .next()
            .call(fetchPodcastListApi, { tid: mockItems })
            .next({})
            .put(fetchPodcastListSuccess(sucessResponseObjectPodcastList))
            .finish()
            .isDone();
    });
});

describe('Test podcastepisode success', () => {
    it('fire on FETCH_PODCAST_EPISODE', () => {
        testSaga(fetchPodcastEpisode, requestActionPodcastEpisode)
            .next()
            .call(fetchPodcastEpisodeApi, { nid: mockItems })
            .next({})
            .put(fetchPodcastEpisodeSuccess(sucessResponseObject))
            .finish()
            .isDone();
    });
});

describe('Test podcastList  error', () => {
    it('check fetchPodcastList failed', () => {
        const genObject = fetchPodcastList({
            type: FETCH_PODCAST_LIST,
            payload: { tid: 2 },
            rows: [],
            pager: {}
        });
        genObject.next();
        genObject.throw(errorResponse);
    });
});

describe('Test podcastEpisode  error', () => {
    it('check fetchPodcastEpisode failed', () => {
        const genObject = fetchPodcastEpisode({
            type: FETCH_PODCAST_EPISODE,
            payload: { nid: 2 },
            rows: [],
            pager: {}
        });
        genObject.next();
        genObject.throw(errorResponse);
    });
});

describe('Test podcastSaga  saga', () => {
    it('fire on podcastSaga', () => {
      testSaga(podcastSaga)
        .next()
        .all([takeLatest(FETCH_PODCAST_LIST, fetchPodcastList)])
        .next()
        .all([takeLatest(FETCH_PODCAST_EPISODE, fetchPodcastEpisode)])
        .finish()
        .isDone();
    });
  });