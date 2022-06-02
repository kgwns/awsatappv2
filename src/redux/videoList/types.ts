import {
  FETCH_VIDEO,
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILED,
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
}

export interface FetchVideoSuccessPayloadType {
  videoData: VideoItemType[];
}

export interface FetchVideoFailedPayloadtype {
  error: string;
}

export type VideoState = {
  videoData: any;
  error: string;
  isLoading: boolean;
}

export type FetchVideoType = {
  type: typeof FETCH_VIDEO;
};

export type FetchVideoSuccessType = {
  type: typeof FETCH_VIDEO_SUCCESS;
  payload: FetchVideoSuccessPayloadType;
};

export type FetchVideoFailedType = {
  type: typeof FETCH_VIDEO_FAILED;
  payload: FetchVideoFailedPayloadtype;
};


export type RequestVideoUrlPayload = {
  mediaID: string
}

export type JWTVideoSourceType = {
  file: string,
  label: string,
  type: string
}

export type JWTVideoPlayListType = {
  sources: JWTVideoSourceType[],
  images?: any,
}

export type RequestVideoUrlSuccessResponse = {
  playlist: JWTVideoPlayListType[]
}

export type VideoActions =
  | FetchVideoType
  | FetchVideoSuccessType
  | FetchVideoFailedType;