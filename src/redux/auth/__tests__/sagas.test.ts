import {FETCH_EMAIL_CHECK} from '../actionTypes';
import emailCheckSaga, {fetchEmailCheck} from '../sagas';
import { all, takeLatest } from "redux-saga/effects";

const mockString = 'mockString';

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

const errorResponse1 = {
  request: { data: 'Error', status: 500, statusText: 'Error' },
  message: 'Error'
};

const errorResponse2 = {
  message: 'Error'
};

describe('<Article Detail Saga >', () => {
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    })
  })

  describe('Check emailCheckSaga sage method', () => {
    const genObject = emailCheckSaga();

    it('should wait for latest REQUEST_ARTICLE_DETAIL action and call fetchArticleDetail', () => {
        const generator = genObject.next();
        expect(generator.value).toEqual(
            all([takeLatest(FETCH_EMAIL_CHECK, fetchEmailCheck)])
        );
    });

    it('should be done on next iteration', () => {
        expect(genObject.next().done).toBeTruthy();
    });
  });

  describe('Test emailcheck', () => {
    it('check fetchEmailCheck failed', () => {
      const genObject = fetchEmailCheck({
        type: FETCH_EMAIL_CHECK,
        payload: {email: mockString},
      });
      genObject.next({emailCheckData: {}});
      genObject.next({emailCheckData: {}});
    });

    it('check fetchEmailCheck failed', () => {
      const genObject = fetchEmailCheck({
        type: FETCH_EMAIL_CHECK,
        payload: {email: mockString},
      });
      genObject.next();
      genObject.throw(errorResponse);
    });


    it('check fetchEmailCheck failed', () => {
      const genObject = fetchEmailCheck({
        type: FETCH_EMAIL_CHECK,
        payload: {email: mockString},
      });
      genObject.next();
      genObject.throw(errorResponse1);
    });


    it('check fetchEmailCheck failed', () => {
      const genObject = fetchEmailCheck({
        type: FETCH_EMAIL_CHECK,
        payload: {email: mockString},
      });
      genObject.next();
      genObject.throw(errorResponse2);
    });
    
  });

});
