import {
    FetchDocumentaryVideoSuccessPayloadType,
    FetchDocumentaryVideoFailedPayloadtype,
    FetchDocumentaryVideoSuccessType,
    FetchDocumentaryVideoFailedType,
    RequestDocumentaryVideoPayload
  } from './types';
  import {
    FETCH_DOCUMENTARY_VIDEO,
    FETCH_DOCUMENTARY_VIDEO_SUCCESS,
    FETCH_DOCUMENTARY_VIDEO_FAILED,
  } from './actionTypes';
  
  export const fetchDocumentaryVideo = (payload: RequestDocumentaryVideoPayload) => {
    return {
      type: FETCH_DOCUMENTARY_VIDEO,
      payload
    };
  };
  
  export const fetchDocumentaryVideoSuccess = (
    payload: FetchDocumentaryVideoSuccessPayloadType,
  ): FetchDocumentaryVideoSuccessType => {
    return {
      type: FETCH_DOCUMENTARY_VIDEO_SUCCESS,
      payload,
    };
  };
  
  export const fetchDocumentaryVideoFailed = (
    payload: FetchDocumentaryVideoFailedPayloadtype,
  ): FetchDocumentaryVideoFailedType => {
    return {
      type: FETCH_DOCUMENTARY_VIDEO_FAILED,
      payload,
    };
  };
  
  export const videoActions = {
    fetchDocumentaryVideo,
    fetchDocumentaryVideoSuccess,
    fetchDocumentaryVideoFailed,
  };
