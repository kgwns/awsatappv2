
import bookmarkSaga, {getBookmarked, getDetailedBookmarkInfo, removeBookmarked, sendBookMarkId} from '../sagas';
import { GET_BOOK_MARKED, GET_BOOK_MARKED_DETAIL_INFO, REMOVE_BOOK_MARKED, SEND_BOOK_MARK_ID } from '../actionType';
import { GetBookMarkIdSuccessMessageType, RemoveBookmarkDetailSuccessPayload, SendBookMarkSuccessInfoType } from '../types';
import {takeLatest, takeEvery} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

const sampleResponse1: SendBookMarkSuccessInfoType = {};

const sampleResponse2: GetBookMarkIdSuccessMessageType = {
  code: '',
  message: '',
  data: []
};

const sampleResponse3: RemoveBookmarkDetailSuccessPayload = {
  removeBookmarkInfo: {}
};

describe('Test bookmarkSaga  saga', () => {
  it('fire on bookmarkSaga', () => {
    testSaga(bookmarkSaga)
      .next()
      .all([
        takeEvery(SEND_BOOK_MARK_ID, sendBookMarkId),
        takeLatest(GET_BOOK_MARKED, getBookmarked),
        takeEvery(REMOVE_BOOK_MARKED, removeBookmarked),
        takeEvery(GET_BOOK_MARKED_DETAIL_INFO, getDetailedBookmarkInfo)
      ])
      .finish()
      .isDone();
  });
});

describe('Test bookmark  error', () => {

  it('check sendBookMarkId success', () => {
    const genObject = sendBookMarkId({
      type: SEND_BOOK_MARK_ID,
      payload: {nid: '123',bundle:'string'},
    })
    genObject.next(sampleResponse1)
    genObject.next(sampleResponse1)
  })

  it('check sendBookMarkId failed', () => {
    const genObject = sendBookMarkId({
      type: SEND_BOOK_MARK_ID,
      payload: {nid: '123',bundle:'string'},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check getBookmarked success', () => {
    const genObject = getBookmarked()
    genObject.next(sampleResponse2)
    genObject.next(sampleResponse2)
  })

  it('check getBookmarked failed', () => {
    const genObject = getBookmarked();
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check removeBookmarked success', () => {
    const genObject = removeBookmarked({
      type: REMOVE_BOOK_MARKED,
      payload: {nid: '123'},
    })
    genObject.next(sampleResponse3)
    genObject.next(sampleResponse3)
  })

  it('check removeBookmarked failed', () => {
    const genObject = removeBookmarked({
      type: REMOVE_BOOK_MARKED,
      payload: {nid: '123'},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check getDetailedBookmarkInfo success', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next([{nid: '2'}]);
    genObject.next([{nid: '2'}]);
  });

  it('check getDetailedBookmarkInfo failed', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123', page: 2},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});
