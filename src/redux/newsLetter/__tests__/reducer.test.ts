import {GET_SELECTED_NEWS_LETTERS, GET_SELECTED_NEWS_LETTERS_ERROR, GET_SELECTED_NEWS_LETTERS_SUCCESS, SEND_SELECTED_NEWS_LETTERS, SEND_SELECTED_NEWS_LETTERS_ERROR, SEND_SELECTED_NEWS_LETTERS_SUCCESS} from '../actionTypes';
import newsLetters from '../reducer';
import {NewsLetterState} from '../types';

describe('news letters reducer', () => {
  let initialState: NewsLetterState;

  beforeEach(() => {
    initialState = {
        error: '',
        isLoading: false,
        sendNewsLettersInfo: {},
        selectedNewsLettersData: {},
    };
  });

  test('Check loading state when selected news letters SEND_SELECTED_NEWS_LETTERS request API', () => {
    const nextState = newsLetters(initialState, {
      type: SEND_SELECTED_NEWS_LETTERS,
      payload: {tid: '123'},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when selected news letters SEND_SELECTED_NEWS_LETTERS_SUCCESS request API', () => {
    const nextState = newsLetters(initialState, {
      type: SEND_SELECTED_NEWS_LETTERS_SUCCESS,
      payload: {saveData: {}},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when selected author SEND_SELECTED_NEWS_LETTERS_ERROR request API', () => {
    const nextState = newsLetters(initialState, {
      type: SEND_SELECTED_NEWS_LETTERS_ERROR,
      payload: {error: 'sample error'},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters GET_SELECTED_NEWS_LETTERS request API', () => {
    const nextState = newsLetters(initialState, {
      type: GET_SELECTED_NEWS_LETTERS,
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('Check loading state when get selected news letters GET_SELECTED_NEWS_LETTERS_SUCCESS request API', () => {
    const nextState = newsLetters(initialState, {
      type: GET_SELECTED_NEWS_LETTERS_SUCCESS,
      payload: {selectedNewsLettersData: {}},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters GET_SELECTED_NEWS_LETTERS_ERROR request API', () => {
    const nextState = newsLetters(initialState, {
      type: GET_SELECTED_NEWS_LETTERS_ERROR,
      payload: {error: 'sample error'},
    });
    expect(nextState.isLoading).toBe(false);
  });

});
