
import newsLettersSaga, { getSelectedNewsLetters, postSelectedNewsLetters, getMyNewsLetters, emptySelectedNewsLettersInfo } from '../sagas';
import { GET_SELECTED_NEWS_LETTERS, SEND_SELECTED_NEWS_LETTERS, GET_MY_NEWS_LETTERS, EMPTY_SELECTED_NEWS_LETTERS_INFO } from '../actionTypes';
import { takeLatest } from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' },
};

describe('Test newsLettersSaga  saga', () => {
    it('fire on newsLettersSaga', () => {
      testSaga(newsLettersSaga)
        .next()
        .all([takeLatest(SEND_SELECTED_NEWS_LETTERS, postSelectedNewsLetters)])
        .next()
        .all([takeLatest(GET_SELECTED_NEWS_LETTERS, getSelectedNewsLetters)])
        .next()
        .all([takeLatest(GET_MY_NEWS_LETTERS, getMyNewsLetters)])
        .next()
        .all([takeLatest(EMPTY_SELECTED_NEWS_LETTERS_INFO, emptySelectedNewsLettersInfo)])
        .finish()
        .isDone();
    });
});

describe('Test newsletters  error', () => {
    it('check postSelectedNewsLetters failed', () => {
        const genObject = postSelectedNewsLetters({
            type: SEND_SELECTED_NEWS_LETTERS,
            payload: { tid: '123' },
        });
        genObject.next();
        genObject.throw(errorResponse);
    });

    it('check getSelectedNewsLetters failed', () => {
        const genObject = getSelectedNewsLetters({
            type: GET_SELECTED_NEWS_LETTERS
        });
        genObject.next();
        genObject.throw(errorResponse);
    });

    it('check getSelectedNewsLetters failed', () => {
        const genObject = getSelectedNewsLetters({
            type: GET_SELECTED_NEWS_LETTERS
        });
        genObject.next();
        genObject.throw({});
    });

    it('check getSelectedNewsLetters failed', () => {
        const genObject = getMyNewsLetters({
            type: GET_MY_NEWS_LETTERS
        });
        genObject.next();
        genObject.throw(errorResponse);
    });

    it('check getSelectedNewsLetters failed', () => {
        const genObject = getMyNewsLetters({
            type: GET_MY_NEWS_LETTERS
        });
        genObject.next();
        genObject.throw({});
    });
});

describe('Test newsletters  success', () => {
    it('check postSelectedNewsLetters success', () => {
        const genObject = postSelectedNewsLetters({
            type: SEND_SELECTED_NEWS_LETTERS,
            payload: { tid: '123' },
        });
        genObject.next();
        genObject.next();
    });

    it('check getSelectedNewsLetters success', () => {
        const genObject = getSelectedNewsLetters({
            type: GET_SELECTED_NEWS_LETTERS
        });
        genObject.next();
        genObject.next();
    });

    it('check getSelectedNewsLetters success', () => {
        const genObject = getMyNewsLetters({
            type: GET_MY_NEWS_LETTERS
        });
        genObject.next();
        genObject.next();
    });
});

describe('Test emptySelectedNewsLettersInfo ', () => {

    it('check emptySelectedNewsLettersInfo success', () => {
      const genObject = emptySelectedNewsLettersInfo();
      genObject.next();
      genObject.next();
    });

});