import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import videoListSaga, {fetchVideoList, formatVideoData} from '../sagas';
import {
  fetchVideoListFailed,
  fetchVideoListSuccess,
} from '../action';
import {FETCH_VIDEO} from '../actionTypes';
import {fetchVideoListApi} from 'src/services/videoListService';
import {
  FetchVideoType,
  FetchVideoFailedPayloadtype,
  FetchVideoSuccessPayloadType,
} from '../types';

const mockString = 'mockString';
const mockValue = '12';
const requestObject = {
  items_per_page: 10,
  page: 0
}

const requestAction: FetchVideoType = {
  type: FETCH_VIDEO,
  payload: requestObject
};

const reposnseObject = {
      nid: mockValue,
      title: mockString,
      created_export: mockString,
      field_image_upload_export: mockString,
      field_mp4_link_export: mockString,
      field_multimedia_section_export: mockString,
      field_thumbnil_multimedia_export: mockString,
      description: mockString,
      body_export: mockString,
      isBookmarked: false,
      field_jwplayerinfo_export: mockString,
      mediaId: mockValue,
    }

const sucessResponseObject: FetchVideoSuccessPayloadType = {
  videoData: [
    reposnseObject
  ]
}

describe('test videoListSaga  saga', () => {
  it('fire on videoListSaga', () => {
    testSaga(videoListSaga)
      .next()
      .all([takeLatest(FETCH_VIDEO, fetchVideoList)])
      .finish()
      .isDone();
  });
});


describe('Test fetchVideoList success', () => {
  it('fire on FETCH_VIDEO', () => {
    testSaga(fetchVideoList, requestAction)
      .next()
      .call(fetchVideoListApi, requestObject)
      .next(reposnseObject)
      .put(fetchVideoListSuccess({videoData:[]}))
      .finish()
      .isDone();
  });
});

describe('Test fetchVideoList success', () => {
  it('fire on FETCH_VIDEO', () => {
    testSaga(fetchVideoList, requestAction)
      .next()
      .call(fetchVideoListApi, requestObject)
      .next({})
      .put(fetchVideoListSuccess({videoData:[]}))
      .finish()
      .isDone();
  });

  it('check SaveToken success', () => {
    const genObject = fetchVideoList(requestAction);
    genObject.next();
    genObject.next();
  });

  it('check SaveToken success', () => {
    const genObject = fetchVideoList(requestAction);
    genObject.next({rows: [
      {
        title: 'mockString',
        nid: 'mockString',
      },
    ],});
    genObject.next({rows: [
      {
        title: 'mockString',
        nid: 'mockString',
      },
    ],});
  });

  it('check SaveToken success', () => {
    const genObject = fetchVideoList(requestAction);
    genObject.next({rows: [
      {
        title: '',
        nid: 'mockString',
      },
    ],});
    genObject.next({rows: [
      {
        title: '',
        nid: 'mockString',
      },
    ],});
  });
});

describe('Test fetchVideoList success', () => {
  it('fire on FETCH_VIDEO', () => {
    testSaga(fetchVideoList, requestAction)
      .next()
      .call(fetchVideoListApi, requestObject)
      .next({rows: []})
      .put(fetchVideoListSuccess({videoData:[]}))
      .finish()
      .isDone();
  });
});

describe('test fetchVideoList  error', () => {
  const error = new Error('error');
  it('fire on FETCH_VIDEO', () => {
    testSaga(fetchVideoList, requestAction)
      .next()
      .call(fetchVideoListApi, requestObject)
      .throw(error)
      .put(fetchVideoListFailed({error: error.message}))
      .finish()
      .isDone();
  });

  describe('Test formatVideoData success', () => {
    it('fire on formatVideoData', () => {
      expect(formatVideoData({rows: {
        nid: mockValue,
        title: mockString,
        created_export: mockString,
        field_image_upload_export: mockString,
        field_mp4_link_export: mockString,
        field_multimedia_section_export: mockString,
        field_thumbnil_multimedia_export: mockString,
        description: mockString,
        body_export: mockString,
        isBookmarked: false,
        field_jwplayerinfo_export: mockString,
        mediaId: mockValue,
      }})).toStrictEqual([])
    });
  });
});
