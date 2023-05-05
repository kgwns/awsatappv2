import {
    FETCH_DOCUMENTARY_VIDEO,
    FETCH_DOCUMENTARY_VIDEO_SUCCESS,
    FETCH_DOCUMENTARY_VIDEO_FAILED,
  } from './actionTypes';
  
  
  export interface VideoItemType {
    nid: string;
    title: string;
    created_export?: string;
    field_image_upload_export?: string|null;
    field_mp4_link_export?: string;
    field_multimedia_section_export?: any;
    field_thumbnil_multimedia_export?: string;
    description?: string|null;
    body_export?: string|null;
    isBookmarked:boolean;
    field_jwplayerinfo_export?: string;
    mediaId?: string;
  }

  export type RequestDocumentaryVideoPayload = {
    page : number,
    items_per_page: number,
  }
  
  export interface FetchDocumentaryVideoSuccessPayloadType {
    videoDocumentaryData: VideoItemType[];
  }
  
  export interface FetchDocumentaryVideoFailedPayloadtype {
    videoDocumentaryError: string;
  }
  
  export type VideoDocumentaryState = {
    videoDocumentaryData: any[];
    videoDocumentaryError: string;
    isVideoLoading: boolean;
  }
  
  export type FetchDocumentaryVideoType = {
    type: typeof FETCH_DOCUMENTARY_VIDEO;
    payload: RequestDocumentaryVideoPayload;
  };
  
  export type FetchDocumentaryVideoSuccessType = {
    type: typeof FETCH_DOCUMENTARY_VIDEO_SUCCESS;
    payload: FetchDocumentaryVideoSuccessPayloadType;
  };
  
  export type FetchDocumentaryVideoFailedType = {
    type: typeof FETCH_DOCUMENTARY_VIDEO_FAILED;
    payload: FetchDocumentaryVideoFailedPayloadtype;
  };
  
  export type VideoActions =
    | FetchDocumentaryVideoType
    | FetchDocumentaryVideoSuccessType
    | FetchDocumentaryVideoFailedType;
