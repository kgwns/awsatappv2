import {
  SEND_CONTACT_US_INFO,
  SEND_CONTACT_US_INFO_SUCCESS,
  SEND_CONTACT_US_INFO_FAILED,
  EMPTY_CONTACT_US_DETAIL,
} from "./actionType"

export type ContactUsInfoState = {
  isLoading: boolean,
  sendContactInfoSuccess: ContactUsInfoSuccessPayload
  sendContactInfoError: string
}

export interface SendContactUsInfoPayload {
  name: string;
  email: string;
  msg: string;
}

export interface SendContactUsInfoType {
  type: typeof SEND_CONTACT_US_INFO,
  payload: SendContactUsInfoPayload
}

export interface ContactUsInfoSuccessPayload {
  code?: number;
  message?: string;
}

export type ContactUsInfoResponseType = {
  message: ContactUsInfoSuccessPayload
}

export interface SendContactUsInfoSuccessType {
  type: typeof SEND_CONTACT_US_INFO_SUCCESS,
  payload: ContactUsInfoSuccessPayload
}

export interface ContactUsInfoFailedPayload {
  error: string
}

export interface SendContactUsInfoFailedType {
  type: typeof SEND_CONTACT_US_INFO_FAILED,
  payload: ContactUsInfoFailedPayload
}

export type EmptyContactUsDetailType = {
  type: typeof EMPTY_CONTACT_US_DETAIL
}

export type ContactUsInfoAction =
  SendContactUsInfoType
  | SendContactUsInfoSuccessType
  | SendContactUsInfoFailedType
  | EmptyContactUsDetailType
