import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import videoListSaga, {fetchVideoList} from '../sagas';
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

const requestAction: FetchVideoType = {
  type: FETCH_VIDEO,
};

const reposnseObject = [
    {
    nid: mockString,
    title: mockString,
    }
  ]

const sucessResponseObject: FetchVideoSuccessPayloadType = {
  videoData: reposnseObject
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
    testSaga(fetchVideoList)
      .next()
      .call(fetchVideoListApi)
      .next(reposnseObject)
      .put(fetchVideoListSuccess({videoData:[]}))
      .finish()
      .isDone();
  });
});

describe('test fetchVideoList  error', () => {
  const error = new Error('error');
  it('fire on FETCH_VIDEO', () => {
    testSaga(fetchVideoList)
      .next()
      .call(fetchVideoListApi)
      .throw(error)
      .put(fetchVideoListFailed({error: error.message}))
      .finish()
      .isDone();
  });
});
