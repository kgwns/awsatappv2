import {opinionsActions} from '../action';
import {FETCH_OPINIONS} from '../actionTypes';
import opinionsReducer from '../reducer';
import {OpinionsListState} from '../types';

describe('opinions reducer', () => {
  let initialState: OpinionsListState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      opinionData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
      error: '',
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
      payload: {page: 1},
    });
    expect(nextState.isLoading).toBe(true);
  });
  
});
