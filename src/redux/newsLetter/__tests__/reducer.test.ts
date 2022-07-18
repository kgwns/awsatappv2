import {EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD, EMPTY_SELECTED_NEWS_LETTERS_INFO, GET_MY_NEWS_LETTERS, GET_MY_NEWS_LETTERS_ERROR, GET_MY_NEWS_LETTERS_SUCCESS, GET_SELECTED_NEWS_LETTERS, GET_SELECTED_NEWS_LETTERS_ERROR, GET_SELECTED_NEWS_LETTERS_SUCCESS, SELECTED_DATA_FROM_NEWSLETTER_ONBOARD, SEND_SELECTED_NEWS_LETTERS, SEND_SELECTED_NEWS_LETTERS_ERROR, SEND_SELECTED_NEWS_LETTERS_SUCCESS} from '../actionTypes';
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
      isMyNewsLoading: false,
      myNewsError: '',
      myNewsLetters: {},
      selectedDataFromNewsLetterOnboard: [],
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

  test('Check loading state when get selected news letters GET_SELECTED_NEWS_LETTERS request API', () => {
    const nextState = newsLetters(initialState, {
      type: GET_MY_NEWS_LETTERS,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters GET_SELECTED_NEWS_LETTERS_SUCCESS request API', () => {
    const nextState = newsLetters(initialState, {
      type: GET_MY_NEWS_LETTERS_SUCCESS,
      payload: {myNewsLettersData: {}},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters GET_SELECTED_NEWS_LETTERS_ERROR request API', () => {
    const nextState = newsLetters(initialState, {
      type: GET_MY_NEWS_LETTERS_ERROR,
      payload: {error: 'sample error'},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters GET_SELECTED_NEWS_LETTERS request API', () => {
    const nextState = newsLetters(initialState, {
      type: EMPTY_SELECTED_NEWS_LETTERS_INFO,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters GET_SELECTED_NEWS_LETTERS request API', () => {
    const nextState = newsLetters(initialState, {
      type: EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters SELECTED_DATA_FROM_NEWSLETTER_ONBOARD request API', () => {
    const nextState = newsLetters(initialState, {
      type: SELECTED_DATA_FROM_NEWSLETTER_ONBOARD,
      payload: { data: []}
    });
    expect(nextState.isLoading).toBe(false);
  });

});
