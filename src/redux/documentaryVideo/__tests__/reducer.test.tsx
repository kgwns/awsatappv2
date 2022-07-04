import {videoActions} from '../action';
import {FETCH_DOCUMENTARY_VIDEO} from '../actionTypes';
import videoDocumentaryReducer from '../reducer';
import {VideoDocumentaryState} from '../types';

describe('video documentary reducer', () => {
  let initialState: VideoDocumentaryState;

  beforeEach(() => {
    initialState = {
      isVideoLoading: false,
      videoDocumentaryData: [],
      videoDocumentaryError: '',
    };
  });

  test('video documentary sucess', () => {
    const testData: never[] = [];
    initialState.isVideoLoading = true;
    const nextState = videoDocumentaryReducer(
      initialState,
      videoActions.fetchDocumentaryVideoSuccess({
        videoDocumentaryData: testData,
      }),
    );

    expect(nextState.isVideoLoading).toBeFalsy();
  });

  test('video documentary failure', () => {
    const testError = 'some-error';
    initialState.isVideoLoading = true;
    const nextState = videoDocumentaryReducer(
      initialState,
      videoActions.fetchDocumentaryVideoFailed({
        videoDocumentaryError: testError,
      }),
    );

    expect(nextState.isVideoLoading).toBeFalsy();
    expect(nextState.videoDocumentaryError).toEqual(testError);
  });

  test('Check loading state when videoDocumentaryReducer request API', () => {
    const nextState = videoDocumentaryReducer(initialState, {
      type: FETCH_DOCUMENTARY_VIDEO,
      payload: {page: 1, items_per_page: 1},
    });
    expect(nextState.isVideoLoading).toBe(true);
  });
});
