
import {getBookmarked, getDetailedBookmarkInfo, removeBookmarked, sendBookMarkId} from '../sagas';
import { GET_BOOK_MARKED_DETAIL_INFO, REMOVE_BOOK_MARKED, SEND_BOOK_MARK_ID } from '../actionType';

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

describe('Test bookmark  error', () => {
  it('check sendBookMarkId failed', () => {
    const genObject = sendBookMarkId({
      type: SEND_BOOK_MARK_ID,
      payload: {nid: '123',bundle:'string'},
    });
    genObject.next();
    genObject.throw(errorResponse);
  });

  it('check getBookmarked failed', () => {
    const genObject = getBookmarked();
    genObject.next();
    genObject.throw(errorResponse);
  });

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
