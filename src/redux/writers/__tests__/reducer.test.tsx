import {opinionWritersActions} from '../action';
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
});
