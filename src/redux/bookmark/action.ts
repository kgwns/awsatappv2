import { GET_BOOK_MARKED, 
  GET_BOOK_MARKED_DETAIL_INFO, 
  GET_BOOK_MARKED_FAILED, 
  GET_BOOK_MARKED_FAILED_DETAIL_INFO, 
  GET_BOOK_MARKED_SUCCESS, 
  GET_BOOK_MARKED_SUCCESS_DETAIL_INFO, 
  REMOVE_BOOK_MARKED, REMOVE_BOOK_MARKED_FAILED, 
  REMOVE_BOOK_MARKED_SUCCESS, 
  SEND_BOOK_MARK_ID, SEND_BOOK_MARK_ID_FAILED, 
  SEND_BOOK_MARK_ID_SUCCESS, 
  UPDATED_FILTERED_DATA_SUCCESS, 
  UPDATE_ADD_REMOVE_BOOK_MARK } from "./actionType"
import {
  GetBookMarkIdFailedPayload, GetBookMarkIdFailedType, 
  GetBookmarkIdSuccessPayload, GetBookmarkIdSuccessType, GetBookmarkIdType,
  RemoveBookmarkDetailDataBody,
  RemoveBookMarkDetailFailedPayload,
  RemoveBookMarkDetailFailedType,
  RemoveBookmarkDetailSuccessPayload,
  RemoveBookmarkDetailSuccessType,
  RemoveBookMarkDetailType,
  SendBookMarkBodyGet, SendBookMarkDetailFailedPayload, 
  SendBookMarkDetailFailedType, SendBookMarkDetailSuccessPayload, 
  SendBookMarkDetailSuccessType, SendBookMarkDetailType, 
  GetBookmarkDetailInfoType, GetBookmarkDetailBodyGet, 
  GetBookMarkDetailFailedType, GetBookMarkDetailFailedPayload,
  GetBookmarkDetailSuccessType, GetBookmarkDetailSuccessPayload, 
  UpdateFilterBookmarkPayload, UpdatedFilterBookmarkType, UpdateAddRemoveBookMarkDetailType
} from "./types"

export const sendBookMarkId = (
  payload: SendBookMarkBodyGet
): SendBookMarkDetailType => {
  return {
    type: SEND_BOOK_MARK_ID,
    payload
  }
}

export const sendBookMarkIdSuccess = (
  payload: SendBookMarkDetailSuccessPayload,
): SendBookMarkDetailSuccessType => {
  return {
    type: SEND_BOOK_MARK_ID_SUCCESS,
    payload,
  };
};

export const sendBookMarkIdFailed = (
  payload: SendBookMarkDetailFailedPayload,
): SendBookMarkDetailFailedType => {
  return {
    type: SEND_BOOK_MARK_ID_FAILED,
    payload,
  };
};


export const getBookmarked = (): GetBookmarkIdType => {
  return {
    type: GET_BOOK_MARKED
  }
}

export const getBookMarkedSuccess = (
  payload: GetBookmarkIdSuccessPayload,
): GetBookmarkIdSuccessType => {
  return {
    type: GET_BOOK_MARKED_SUCCESS,
    payload,
  };
};

export const getBookmarkedFailed = (
  payload: GetBookMarkIdFailedPayload,
): GetBookMarkIdFailedType => {
  return {
    type: GET_BOOK_MARKED_FAILED,
    payload,
  };
};


export const getBookmarkedDetailInfo = (
  payload: GetBookmarkDetailBodyGet
): GetBookmarkDetailInfoType => {
  return {
    type: GET_BOOK_MARKED_DETAIL_INFO,
    payload
  }
}

export const getBookMarkedSuccessDetailInfo = (
  payload: GetBookmarkDetailSuccessPayload,
): GetBookmarkDetailSuccessType => {
  return {
    type: GET_BOOK_MARKED_SUCCESS_DETAIL_INFO,
    payload,
  };
};

export const updateBookMarkedDetailInfo = (
  payload: GetBookmarkDetailSuccessPayload,
): UpdateAddRemoveBookMarkDetailType => {
  return {
    type: UPDATE_ADD_REMOVE_BOOK_MARK,
    payload,
  };
};

export const getBookmarkedFailedDetailInfo = (
  payload: GetBookMarkDetailFailedPayload,
): GetBookMarkDetailFailedType => {
  return {
    type: GET_BOOK_MARKED_FAILED_DETAIL_INFO,
    payload,
  };
};

export const updateFilteredBookMarkedInfo = (
  payload: UpdateFilterBookmarkPayload
): UpdatedFilterBookmarkType => {
  return {
    type: UPDATED_FILTERED_DATA_SUCCESS,
    payload,
  };
};




export const removeBookmarked = (
  payload: RemoveBookmarkDetailDataBody
): RemoveBookMarkDetailType => {
  return {
    type: REMOVE_BOOK_MARKED,
    payload
  }
}

export const removeBookMarkedSuccess = (
  payload: RemoveBookmarkDetailSuccessPayload,
): RemoveBookmarkDetailSuccessType => {
  return {
    type: REMOVE_BOOK_MARKED_SUCCESS,
    payload,
  };
};

export const removeBookmarkedFailed = (
  payload: RemoveBookMarkDetailFailedPayload,
): RemoveBookMarkDetailFailedType => {
  return {
    type: REMOVE_BOOK_MARKED_FAILED,
    payload,
  };
};

export const homeActions = {
  sendBookMarkId,
  sendBookMarkIdSuccess,
  sendBookMarkIdFailed,
  getBookmarked,
  getBookMarkedSuccess,
  getBookmarkedFailed,
  removeBookmarked,
  removeBookMarkedSuccess,
  removeBookmarkedFailed,
  updateFilteredBookMarkedInfo,
  updateBookMarkedDetailInfo,
};
