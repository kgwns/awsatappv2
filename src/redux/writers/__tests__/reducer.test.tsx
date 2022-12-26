import {opinionWritersActions} from '../action';
import {FETCH_OPINION_WRITER} from '../actionTypes';
import opinionWriter from '../reducer';
import {OpinionWriterListState} from '../types';

describe('opinionWriter reducer', () => {
  let initialState: OpinionWriterListState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      opinionWriterData: [],
      error: '',
    };
  });

  test('Check loading state when opinionWriter request API', () => {
    const nextState = opinionWriter(initialState, {
      type: FETCH_OPINION_WRITER,
      payload: {items_per_page: 10},
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('fetchOpinionWriterSuccess', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = opinionWriter(
      initialState,
      opinionWritersActions.fetchOpinionWriterSuccess({
        opinionWriterListData: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetchOpinionWriterFailure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = opinionWriter(
      initialState,
      opinionWritersActions.fetchOpinionWriterFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Default State', () => {
    const nextState = opinionWriter(
      initialState, { type:'' }
    )
    expect(nextState.isLoading).toBe(false)
  })

});
