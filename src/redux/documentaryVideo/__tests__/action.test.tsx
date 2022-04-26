import {RequestDocumentaryVideoPayload} from '../types';
import {
  FETCH_DOCUMENTARY_VIDEO,
  FETCH_DOCUMENTARY_VIDEO_SUCCESS,
  FETCH_DOCUMENTARY_VIDEO_FAILED,
} from '../actionTypes';
import {
  fetchDocumentaryVideo,
  fetchDocumentaryVideoSuccess,
  fetchDocumentaryVideoFailed,
} from '../action';
describe('<DocumentaryVideo', () => {
  const errorMessage = 'This is sample error';
  const page = 1;
  const payload: RequestDocumentaryVideoPayload = {
    page: 1,
    items_per_page: 1,
  };
  it('Fetch Documentary Video', () => {
    const result = fetchDocumentaryVideo(payload);
    expect(result.type).toEqual(FETCH_DOCUMENTARY_VIDEO);
    expect(result.payload.page).toEqual(page);
  });

  it('Fetch Documentary Video success', () => {
    const result = fetchDocumentaryVideoSuccess({videoDocumentaryData: []});
    expect(result.type).toEqual(FETCH_DOCUMENTARY_VIDEO_SUCCESS);
    expect(result.payload.videoDocumentaryData).toEqual([]);
  });

  it('Fetch Documentary Video failed', () => {
    const result = fetchDocumentaryVideoFailed({
      videoDocumentaryError: errorMessage,
    });
    expect(result.type).toEqual(FETCH_DOCUMENTARY_VIDEO_FAILED);
    expect(result.payload.videoDocumentaryError).toEqual(errorMessage);
  });
});
