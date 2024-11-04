import {
  FETCH_VIDEO,
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILED,
  FETCH_VIDEO_PAGINATION_SUCCESS,
  FETCH_VIDEO_PAGINATION_FAILED,
  FETCH_VIDEO_PAGINATION,
  FETCH_VIDEO_BY_ID,
  FETCH_VIDEO_BY_ID_SUCCESS,
  FETCH_VIDEO_BY_ID_FAILED,
} from './actionTypes';


export interface VideoItemType {
  nid: string;
  title: string;
  created_export?: string;
  field_image_upload_export?: string|null;
  field_mp4_link_export?: string;
  field_multimedia_section_export?: any;
  field_thumbnil_multimedia_export?: string;
  field_video_media_id_export?: string;
  description?: string|null;
  body_export?: string|null;
  isBookmarked:boolean;
  field_jwplayerinfo_export?: string;
  mediaId?: string;
  field_shorturl_export?: string;
  view_node?: string;
  link_node?: string;
}

export interface FetchVideoSuccessPayloadType {
  videoData: VideoItemType[];
}

export interface FetchVideoFailedPayloadtype {
  error: string;
}

export interface VideoListBodyGet {
  page?: number;
  id?: string;
  items_per_page?: number;
}

export type VideoState = {
  videoData: any;
  error: string;
  isLoading: boolean;
  isVideoLoading: boolean;
  videoPaginationData: any;
  videoByIdData: any;
  videoError: string;
}

export type FetchVideoType = {
  type: typeof FETCH_VIDEO;
  payload: VideoListBodyGet;
};

export type FetchVideoPaginationType = {
  type: typeof FETCH_VIDEO_PAGINATION;
  payload: VideoListBodyGet;
};

export type FetchVideoSuccessType = {
  type: typeof FETCH_VIDEO_SUCCESS;
  payload: FetchVideoSuccessPayloadType;
};

export type FetchVideoPaginationSuccessType = {
  type: typeof FETCH_VIDEO_PAGINATION_SUCCESS;
  payload: FetchVideoSuccessPayloadType;
};

export type FetchVideoFailedType = {
  type: typeof FETCH_VIDEO_FAILED;
  payload: FetchVideoFailedPayloadtype;
};

export type FetchVideoPaginationFailedType = {
  type: typeof FETCH_VIDEO_PAGINATION_FAILED;
  payload: FetchVideoFailedPayloadtype;
};

export type FetchVideoByIdType = {
  type: typeof FETCH_VIDEO_BY_ID;
  payload: VideoListBodyGet;
};

export type FetchVideoByIdSuccessType = {
  type: typeof FETCH_VIDEO_BY_ID_SUCCESS;
  payload: FetchVideoSuccessPayloadType;
};

export type FetchVideoByIdFailedType = {
  type: typeof FETCH_VIDEO_BY_ID_FAILED;
  payload: FetchVideoFailedPayloadtype;
};


export type RequestVideoUrlPayload = {
  mediaID: string
}

export type JWTVideoSourceType = {
  file: string,
  label: string,
  type: string,
  height: any
}

export type JWTVideoPlayListType = {
  sources: JWTVideoSourceType[],
  images?: any,
  title: string
}

export type RequestVideoUrlSuccessResponse = {
  playlist: JWTVideoPlayListType[]
}

export type VideoActions =
  | FetchVideoType
  | FetchVideoSuccessType
  | FetchVideoFailedType
  | FetchVideoPaginationType
  | FetchVideoPaginationSuccessType
  | FetchVideoPaginationFailedType
  | FetchVideoByIdType
  | FetchVideoByIdSuccessType
  | FetchVideoByIdFailedType;
