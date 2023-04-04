import {
  REQUEST_STATIC_DETAIL,
  REQUEST_STATIC_DETAIL_SUCCESS,
  REQUEST_STATIC_DETAIL_FAILED
} from "./actionType"

export interface StaticDetailBodyGet {
  id: number
}

export interface RequestStaticDetailType {
  type: typeof REQUEST_STATIC_DETAIL,
  payload: StaticDetailBodyGet
}

export interface StaticDetailDataType {
  title: string,
  body: string
}

export type StaticDetailSuccessPayload = {
  data: StaticDetailDataType[]
}

export type StaticDetailState = {
  error: string,
  isLoading: boolean,
  data: StaticDetailDataType[]
}

export interface StaticDetailSuccessType {
  type: typeof REQUEST_STATIC_DETAIL_SUCCESS,
  payload: StaticDetailSuccessPayload
}

export interface StaticDetailFailedPayload {
  error: string
}

export interface StaticDetailFailedType {
  type: typeof REQUEST_STATIC_DETAIL_FAILED,
  payload: StaticDetailFailedPayload
}

export type StaticDetailAction =
  RequestStaticDetailType
  | StaticDetailSuccessType
  | StaticDetailFailedType
