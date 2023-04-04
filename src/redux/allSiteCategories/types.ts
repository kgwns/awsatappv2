import {
  FETCH_ALL_SITE_CATEGORIES,
  FETCH_ALL_SITE_CATEGORIES_SUCCESS,
  FETCH_ALL_SITE_CATEGORIES_ERROR,
  SEND_SELECTED_TOPIC,
  SEND_SELECTED_TOPIC_ERROR,
  SEND_SELECTED_TOPIC_SUCCESS,
  GET_SELECTED_TOPICS,
  GET_SELECTED_TOPICS_SUCCESS,
  GET_SELECTED_TOPICS_ERROR,
  EMPTY_SELECTED_TOPICS_INFO,
  EMPTY_SEND_TOPICS_INFO,
  DESELECT_ALL_TOPICS_INFO,
} from './actionTypes';

export type payloadType = { rows: any[]; pager: object };

export interface AllSiteCategoriesItemType {
  name: string;
  description__value_export?: any;
  field_opinion_writer_path_export?: any;
  view_taxonomy_term: string;
  tid: string;
  vid_export?: any;
  field_description_export?: any;
  field_opinion_writer_path_export_1?: any;
  field_opinion_writer_photo_export: string;
  parent_target_id_export: any;
  isSelected?: boolean;
}

export interface AllSiteCategoriesBodyGet {
  items_per_page: number;
}

export interface AllTopicsType {
  name: string;
  tid: string;
  isSelected?: boolean;
}

export interface FetchAllSiteCategoriesListSuccessPayloadType {
  allSiteCategoriesListData: any;
}

export interface FetchAllSiteCategoriesListFailedPayloadtype {
  error: string;
}

export interface ResponseMessage {
  code?: number,
  message?: string
}

export interface GetDataType{
  tid:number,
  created_date:string,
}
export interface SelectedTopicsDataType{
  code?: number,
  message?: string,
  data?:any,
}
export interface GetSelectedTopicsSuccessPayloadType {
  selectedTopicsData: any;
}
export interface GetSelectedTopicsFailedPayloadtype {
  error: string;
}

export interface SendSelectedTopicSuccessPayloadType {
  saveData: ResponseMessage;
}

export interface SendSelectedTopicFailedPayloadtype {
  error: string;
}

export interface SendSelectedTopicBody {
  tid: string
}

export type AllSiteCategoriesState = {
  allSiteCategoriesData: AllSiteCategoriesItemType[];
  error: string;
  isLoading: boolean;
  sendTopicInfo: ResponseMessage;
  selectedTopicsData: SelectedTopicsDataType;
};

export type FetchAllSiteCategoriesType = {
  type: typeof FETCH_ALL_SITE_CATEGORIES;
  payload: AllSiteCategoriesBodyGet;
};

export type FetchAllSiteCategoriesSuccessType = {
  type: typeof FETCH_ALL_SITE_CATEGORIES_SUCCESS;
  payload: FetchAllSiteCategoriesListSuccessPayloadType;
};

export type FetchAllSiteCategoriesFailedType = {
  type: typeof FETCH_ALL_SITE_CATEGORIES_ERROR;
  payload: FetchAllSiteCategoriesListFailedPayloadtype;
};
export type SendSelectedTopicType = {
  type: typeof SEND_SELECTED_TOPIC;
  payload: SendSelectedTopicBody;
};

export type SendSelectedTopicSuccessType = {
  type: typeof SEND_SELECTED_TOPIC_SUCCESS;
  payload: SendSelectedTopicSuccessPayloadType;
};

export type SendSelectedTopicFailedType = {
  type: typeof SEND_SELECTED_TOPIC_ERROR;
  payload: SendSelectedTopicFailedPayloadtype;
};

export type GetSelectedTopicsType = {
  type: typeof GET_SELECTED_TOPICS;
};

export type GetSelectedTopicsSuccessType = {
  type: typeof GET_SELECTED_TOPICS_SUCCESS;
  payload: GetSelectedTopicsSuccessPayloadType;
};

export type GetSelectedTopicsFailedType = {
  type: typeof GET_SELECTED_TOPICS_ERROR;
  payload: GetSelectedTopicsFailedPayloadtype;
};

export type EmptySelectedTopicsInfo = {
  type: typeof EMPTY_SELECTED_TOPICS_INFO;
};

export type EmptySendTopicsInfo = {
  type: typeof EMPTY_SEND_TOPICS_INFO;
};

export type DeselectAllTopicsInfo = {
  type: typeof DESELECT_ALL_TOPICS_INFO;
  payload: string[];
}

export type AllSiteCategoriesActions =
  | FetchAllSiteCategoriesType
  | FetchAllSiteCategoriesSuccessType
  | FetchAllSiteCategoriesFailedType
  | SendSelectedTopicType
  | SendSelectedTopicSuccessType
  | SendSelectedTopicFailedType
  | GetSelectedTopicsType
  | GetSelectedTopicsSuccessType
  | GetSelectedTopicsFailedType
  | EmptySelectedTopicsInfo
  | EmptySendTopicsInfo
  | DeselectAllTopicsInfo
