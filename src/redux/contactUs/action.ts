import {
  SEND_CONTACT_US_INFO,
  SEND_CONTACT_US_INFO_SUCCESS,
  SEND_CONTACT_US_INFO_FAILED,
  EMPTY_CONTACT_US_DETAIL
} from "./actionType"
import {
  SendContactUsInfoPayload, SendContactUsInfoType,
  ContactUsInfoSuccessPayload, SendContactUsInfoSuccessType,
  ContactUsInfoFailedPayload, SendContactUsInfoFailedType, EmptyContactUsDetailType
} from "./types"

export const sendContactUsInfoDetail = (
  payload: SendContactUsInfoPayload
): SendContactUsInfoType => {
  return {
    type: SEND_CONTACT_US_INFO,
    payload
  }
}

export const sendContactUsInfoDetailSuccess = (
  payload: ContactUsInfoSuccessPayload,
): SendContactUsInfoSuccessType => {
  return {
    type: SEND_CONTACT_US_INFO_SUCCESS,
    payload,
  };
};

export const sendContactUsInfoDetailFailed = (
  payload: ContactUsInfoFailedPayload,
): SendContactUsInfoFailedType => {
  return {
    type: SEND_CONTACT_US_INFO_FAILED,
    payload,
  };
};

export const emptyContactUsDetail = (): EmptyContactUsDetailType => {
  return {
    type: EMPTY_CONTACT_US_DETAIL,
  }
}


export const termsAndAboutUsActions = {
  sendContactUsInfoDetail,
  sendContactUsInfoDetailSuccess,
  sendContactUsInfoDetailFailed,
  emptyContactUsDetail,
};
