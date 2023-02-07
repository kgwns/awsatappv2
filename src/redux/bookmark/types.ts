import { PopulateWidgetType } from "src/components/molecules"
import {
  GET_BOOK_MARKED, GET_BOOK_MARKED_DETAIL_INFO, GET_BOOK_MARKED_FAILED, GET_BOOK_MARKED_FAILED_DETAIL_INFO, GET_BOOK_MARKED_SUCCESS,
  GET_BOOK_MARKED_SUCCESS_DETAIL_INFO,
  REMOVE_BOOK_MARKED, REMOVE_BOOK_MARKED_FAILED, REMOVE_BOOK_MARKED_SUCCESS,
  SEND_BOOK_MARK_ID, SEND_BOOK_MARK_ID_FAILED, SEND_BOOK_MARK_ID_SUCCESS, UPDATED_FILTERED_DATA_SUCCESS, UPDATE_ADD_REMOVE_BOOK_MARK
} from "./actionType"


export type BookMarkState = {
  error: string,
  isLoading: boolean,
  sendBookMarkSuccessInfo: SendBookMarkSuccessInfoType,
  bookmarkedSuccessInfo: BookmarkIdSuccessDataFieldType[],
  bookmarkDetailSuccessInfo: any
  removeBookmarkInfo: RemoveBookMarkSuccessInfoType
  removeBookmarkError: string,
  getBookmarkDetailError: string
  bookmarkDetailLoading: boolean;
  filteredBookmarkDetailInfo: any[];
  refreshBookmarkDetail: boolean; //It will let us when new bookmark added need to refresh the archives screen
}

export interface SendBookMarkBodyGet {
  nid: string
  bundle: string
}

export interface SendBookMarkDetailType {
  type: typeof SEND_BOOK_MARK_ID,
  payload: SendBookMarkBodyGet
}

export interface ResponseMessage {
  code: number
  message: string,
  data: BookmarkIdSuccessDataFieldType[]
}

export interface SendBookMarkSuccessInfoType {
  message?: ResponseMessage
}

export type SendBookMarkDetailSuccessPayload = {
  sendBookMarkSuccessInfo: SendBookMarkSuccessInfoType
}

export interface SendBookMarkDetailSuccessType {
  type: typeof SEND_BOOK_MARK_ID_SUCCESS,
  payload: SendBookMarkDetailSuccessPayload
}

export interface SendBookMarkDetailFailedPayload {
  error: string
}

export interface SendBookMarkDetailFailedType {
  type: typeof SEND_BOOK_MARK_ID_FAILED,
  payload: SendBookMarkDetailFailedPayload
}







export interface GetBookmarkIdType {
  type: typeof GET_BOOK_MARKED
}

export interface BookmarkIdSuccessDataFieldType {
  nid: string,
  bundle: string
}

export interface GetBookMarkIdSuccessMessageType {
  code: string,
  message: string,
  data: BookmarkIdSuccessDataFieldType[]
}

export interface GetBookMarkIdSuccessInfoType {
  message?: GetBookMarkIdSuccessMessageType
}

export type GetBookmarkIdSuccessPayload = {
  bookmarkedInfo: BookmarkIdSuccessDataFieldType[]
}

export interface GetBookmarkIdSuccessType {
  type: typeof GET_BOOK_MARKED_SUCCESS,
  payload: GetBookmarkIdSuccessPayload
}

export interface GetBookMarkIdFailedPayload {
  error: string
}

export interface GetBookMarkIdFailedType {
  type: typeof GET_BOOK_MARKED_FAILED,
  payload: GetBookMarkIdFailedPayload
}






export type GetBookmarkDetailBodyGet = {
  nid: string
  page: number
  bundle?: PopulateWidgetType
}

export interface GetBookmarkDetailInfoType {
  type: typeof GET_BOOK_MARKED_DETAIL_INFO,
  payload: GetBookmarkDetailBodyGet
}

export interface BookmarkDetailDataType {
  nid: string,
  bundle: string
}

interface GetBookMarkSuccessMessageType {
  code?: string,
  message?: string,
  data?: BookmarkDetailDataType[]
}

export interface GetBookMarkDetailSuccessInfoType {
  message?: GetBookMarkSuccessMessageType
}

export type GetBookmarkDetailSuccessPayload = {
  bookmarkedDetailInfo: any[]
  page?: number
  bundle?: PopulateWidgetType
}

export interface GetBookmarkDetailSuccessType {
  type: typeof GET_BOOK_MARKED_SUCCESS_DETAIL_INFO,
  payload: GetBookmarkDetailSuccessPayload
}

export interface GetBookMarkDetailFailedPayload {
  getBookmarkDetailError: string
}

export interface GetBookMarkDetailFailedType {
  type: typeof GET_BOOK_MARKED_FAILED_DETAIL_INFO,
  payload: GetBookMarkDetailFailedPayload
}

export type UpdateFilterBookmarkPayload = {
  filteredData: any[]
}

export type UpdatedFilterBookmarkType = {
  type: typeof UPDATED_FILTERED_DATA_SUCCESS,
  payload: UpdateFilterBookmarkPayload
}










export interface RemoveBookmarkDetailDataBody {
  nid: string
}


export interface RemoveBookMarkDetailType {
  type: typeof REMOVE_BOOK_MARKED,
  payload: RemoveBookmarkDetailDataBody
}

interface RemoveBookMarkSuccessMessageType {
  code?: string,
  message?: string
}

export interface RemoveBookMarkSuccessInfoType {
  message?: RemoveBookMarkSuccessMessageType
}

export type RemoveBookmarkDetailSuccessPayload = {
  removeBookmarkInfo: RemoveBookMarkSuccessInfoType
}

export interface RemoveBookmarkDetailSuccessType {
  type: typeof REMOVE_BOOK_MARKED_SUCCESS,
  payload: RemoveBookmarkDetailSuccessPayload
}

export interface RemoveBookMarkDetailFailedPayload {
  removeBookmarkError: string
}

export interface RemoveBookMarkDetailFailedType {
  type: typeof REMOVE_BOOK_MARKED_FAILED,
  payload: RemoveBookMarkDetailFailedPayload
}

export interface UpdateAddRemoveBookMarkDetailType {
  type: typeof UPDATE_ADD_REMOVE_BOOK_MARK,
  payload: GetBookmarkDetailSuccessPayload
}


export type BookmarkAction =
  SendBookMarkDetailType
  | SendBookMarkDetailSuccessType
  | SendBookMarkDetailFailedType
  | GetBookmarkIdType
  | GetBookmarkIdSuccessType
  | GetBookMarkIdFailedType
  | RemoveBookMarkDetailType
  | RemoveBookmarkDetailSuccessType
  | RemoveBookMarkDetailFailedType
  | GetBookmarkDetailInfoType
  | GetBookmarkDetailSuccessType
  | GetBookMarkDetailFailedType
  | UpdatedFilterBookmarkType
  | UpdateAddRemoveBookMarkDetailType
