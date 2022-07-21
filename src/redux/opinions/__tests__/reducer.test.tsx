import {opinionsActions} from '../action';
import {EMPTY_OPINION_DATA, EMPTY_WRITER_OPINION_DATA, FETCH_OPINIONS, FETCH_WRITER_OPINIONS, FETCH_WRITER_OPINIONS_SUCCESS, STORE_HOME_OPINION_NID} from '../actionTypes';
import opinionsReducer from '../reducer';
import {OpinionsListState} from '../types';

describe('opinions reducer', () => {
  let initialState: OpinionsListState;

  beforeEach(() => {
    initialState = {
      opinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
      error: '',
      isLoading: false,
      writerOpinionLoading: true,
      writerOpinionData: { rows: [], pager: { current_page: 0, items_per_page: '' } },
      writerOpinionError: '',
      homeOpinionNid: '',
    };
  });

  test('fetchOpinionsSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = opinionsReducer(
      initialState,
      opinionsActions.fetchOpinionsSuccess({
        opinionListData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchOpinionsFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = opinionsReducer(
      initialState,
      opinionsActions.fetchOpinionsFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when opinionsReducer request API', () => {
    const nextState = opinionsReducer(initialState, {
      type: FETCH_OPINIONS,
      payload: {page: 1, nid: '2'},
    });
    expect(nextState.isLoading).toBe(true);
  });
  
  test('Check loading state when FETCH_WRITER_OPINIONS request API', () => {
    const nextState = opinionsReducer(initialState, {
      type: FETCH_WRITER_OPINIONS,
      payload: {tid: '123',
    page: 1},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when get selected news letters FETCH_WRITER_OPINIONS_SUCCESS request API', () => {
    const nextState = opinionsReducer(initialState, {
      type: FETCH_WRITER_OPINIONS_SUCCESS,
      payload: {writerOpinionListData: {}},
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when EMPTY_WRITER_OPINION_DATA request API', () => {
    const nextState = opinionsReducer(initialState, {
      type: EMPTY_WRITER_OPINION_DATA,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when EMPTY_OPINION_DATA request API', () => {
    const nextState = opinionsReducer(initialState, {
      type: EMPTY_OPINION_DATA,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test('Check loading state when STORE_HOME_OPINION_NID request API', () => {
    const nextState = opinionsReducer(initialState, {
      type: STORE_HOME_OPINION_NID,
      payload: {nid: '2'}
    });
    expect(nextState.isLoading).toBe(false);
  });

});
