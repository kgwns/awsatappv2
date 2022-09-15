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

const sampleResponse = {
    rows: [
        {
            nid: '29',
            type: 'podcasr',
            view_node: 'example',
            field_new_sub_title_export: "abc",
            title: 'example',
            field_announcer_name_export: "abc",
            field_apple_podcast_export: {
              url: "string",
              text: "string"
            },
            body_export: "abc",
            field_duration_export: "abc",
            field_episode_export: "abc",
            field_google_podcast_export: {
              url: "string",
              text: "string"
            },
            field_podcast_image_export: "abc",
            field_podcast_sect_export: {
              id: 'example',
              title: 'example',
              url: 'example',
              bundle: 'example',
              description: 'example',
              img_podcast_desktop: 'example',
              img_podcast_mobile: 'example',
              name: 'example',
              image: 'example'
            },
            field_spotify_export: {
              url: "string",
              text: "string"
            },
            field_spreaker_episode_export: "abc",
            field_spreaker_show_export: "abc",
            isBookmarked: false,
            field_total_duration_export: 'example'
          },
    ]
}

const sampleResponse1 = {
    rows: [
        {
            nid: '29',
            type: 'podcasr',
            view_node: 'example',
            field_new_sub_title_export: "",
            title: '',
            field_announcer_name_export: "abc",
            field_apple_podcast_export: {
              url: "string",
              text: "string"
            },
            body_export: "abc",
            field_duration_export: "abc",
            field_episode_export: "abc",
            field_google_podcast_export: {
              url: "string",
              text: "string"
            },
            field_podcast_image_export: "abc",
            field_podcast_sect_export: {
              id: 'example',
              title: 'example',
              url: 'example',
              bundle: 'example',
              description: 'example',
              img_podcast_desktop: 'example',
              img_podcast_mobile: 'example',
              name: 'example',
              image: 'example'
            },
            field_spotify_export: {
              url: "string",
              text: "string"
            },
            field_spreaker_episode_export: "abc",
            field_spreaker_show_export: "abc",
            isBookmarked: false,
            field_total_duration_export: 'example'
          },
    ]
}

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

describe('Test podcastList', () => {
    it('check fetchPodcastList failed', () => {
        const genObject = fetchPodcastList({
            type: FETCH_PODCAST_LIST,
            payload: { tid: 2 },
            rows: [],
            pager: {}
        });
        genObject.next();
        genObject.next();
    });
    it('check fetchPodcastList failed', () => {
        const genObject = fetchPodcastList({
            type: FETCH_PODCAST_LIST,
            payload: { tid: 2 },
            rows: [],
            pager: {}
        });
        genObject.next(sampleResponse);
        genObject.next(sampleResponse);
    });
    it('check fetchPodcastList failed', () => {
        const genObject = fetchPodcastList({
            type: FETCH_PODCAST_LIST,
            payload: { tid: 2 },
            rows: [],
            pager: {}
        });
        genObject.next(sampleResponse1);
        genObject.next(sampleResponse1);
    });
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