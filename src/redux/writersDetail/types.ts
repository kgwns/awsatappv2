import {
  FETCH_WRITER_DETAIL,
  FETCH_WRITER_DETAIL_SUCCESS,
  FETCH_WRITER_DETAIL_ERROR,
  EMPTY_WRITER_DETAIL,
} from './actionTypes';

export interface WritersDetailBodyGet {
  tid: string
}

export interface FetchWriterDetailSuccessPayloadType {
  writersDetail: any;
}

export interface FetchWriterDetailFailedPayloadType {
  error: string;
}

export type WriterDetailDataType = {
  name: string;
  field_description: string
  field_opinion_writer_photo_export: string
  tid: string
  isFollowed: boolean;
  field_instagram_url_export: any;
  field_opinion_twitter_export: any;
  field_opinion_facebook_export: any;
}

export type WriterDetailState = {
  writersDetail: WriterDetailDataType[];
  error: string;
  isLoading: boolean;
};

export type FetchWriterDetailType = {
  type: typeof FETCH_WRITER_DETAIL;
  payload: WritersDetailBodyGet;
};

export type FetchWriterDetailSuccessType = {
  type: typeof FETCH_WRITER_DETAIL_SUCCESS;
  payload: FetchWriterDetailSuccessPayloadType;
};

export type FetchWriterDetailFailedType = {
  type: typeof FETCH_WRITER_DETAIL_ERROR;
  payload: FetchWriterDetailFailedPayloadType;
};

export type EmptyWriterDetailType = {
  type: typeof EMPTY_WRITER_DETAIL
}

export type WriterDetailActions =
  | FetchWriterDetailType
  | FetchWriterDetailSuccessType
  | FetchWriterDetailFailedType
  | EmptyWriterDetailType;
