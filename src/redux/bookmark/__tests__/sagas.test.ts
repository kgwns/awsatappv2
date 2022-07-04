
import {getBookmarked, getDetailedBookmarkInfo, removeBookmarked, sendBookMarkId} from '../sagas';
import { GET_BOOK_MARKED_DETAIL_INFO, REMOVE_BOOK_MARKED, SEND_BOOK_MARK_ID } from '../actionType';
import { GetBookMarkIdSuccessMessageType, RemoveBookmarkDetailSuccessPayload, SendBookMarkSuccessInfoType } from '../types';

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

  it('check getDetailedBookmarkInfo failed', () => {
    const genObject = getDetailedBookmarkInfo({
      type: GET_BOOK_MARKED_DETAIL_INFO,
      payload: {nid: '123'},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });
});
