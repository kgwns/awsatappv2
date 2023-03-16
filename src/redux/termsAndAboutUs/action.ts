import { REQUEST_STATIC_DETAIL, REQUEST_STATIC_DETAIL_FAILED, REQUEST_STATIC_DETAIL_SUCCESS } from "./actionType"
import { RequestStaticDetailType, StaticDetailBodyGet, StaticDetailFailedPayload, StaticDetailFailedType, StaticDetailSuccessPayload, StaticDetailSuccessType } from "./types"

export const requestStaticDetail = (
  payload: StaticDetailBodyGet
): RequestStaticDetailType => {
  return {
    type: REQUEST_STATIC_DETAIL,
    payload
  }
}

export const requestStaticDetailSuccess = (
  payload: StaticDetailSuccessPayload,
): StaticDetailSuccessType => {
  return {
    type: REQUEST_STATIC_DETAIL_SUCCESS,
    payload,
  };
};

export const requestStaticDetailFailed = (
  payload: StaticDetailFailedPayload,
): StaticDetailFailedType => {
  return {
    type: REQUEST_STATIC_DETAIL_FAILED,
    payload,
  };
};


export const termsAndAboutUsActions = {
  requestStaticDetail,
  requestStaticDetailSuccess,
  requestStaticDetailFailed
};
