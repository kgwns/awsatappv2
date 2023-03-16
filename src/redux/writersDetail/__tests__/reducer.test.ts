import { EMPTY_WRITER_DETAIL, FETCH_WRITER_DETAIL } from '../actionTypes';
import { emptyWriterDataAction, writerDetailActions } from '../action'
import writerReducer from '../reducer';
import { WriterDetailState, WriterDetailActions } from '../types';

describe('Writer Detail reducer', () => {
  let initialState: WriterDetailState;

  beforeEach(() => {
    initialState = {
      writersDetail: [],
      error: 'error',
      isLoading: true,
    };
  });

  test('Check loading state when writerReducer request API', () => {
    const nextState = writerReducer(initialState, {
      type: FETCH_WRITER_DETAIL,
      payload: { tid: '123' },
    });
    expect(nextState.isLoading).toBe(true);
  });

  test('fetch writer Reducer Success', () => {
    const testData = [{}];
    initialState.isLoading = true;
    const nextState = writerReducer(
      initialState,
      writerDetailActions.fetchWriterDetailSuccess({
        writersDetail: testData,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('fetch writerReducer Failure', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = writerReducer(
      initialState,
      writerDetailActions.fetchWriterDetailFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Empty Data', () => {
    const nextState = writerReducer(
      initialState, { type: EMPTY_WRITER_DETAIL }
    )
    expect(nextState.isLoading).toBe(true)
  })

  test('Default State', () => {
    const nextState = writerReducer(
      initialState, { type:'' }
    )
    expect(nextState.isLoading).toBe(true)
  })

});
