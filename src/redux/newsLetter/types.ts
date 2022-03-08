import { EMPTY_SELECTED_NEWS_LETTERS_INFO, GET_SELECTED_NEWS_LETTERS, GET_SELECTED_NEWS_LETTERS_ERROR, GET_SELECTED_NEWS_LETTERS_SUCCESS, SEND_SELECTED_NEWS_LETTERS, SEND_SELECTED_NEWS_LETTERS_ERROR, SEND_SELECTED_NEWS_LETTERS_SUCCESS } from "./actionTypes";

export type NewsLetterState = {
  error: string;
  isLoading: boolean;
  sendNewsLettersInfo: ResponseMessage;
  selectedNewsLettersData: SelectedNewsLettersDataType;
};

export interface NewsLetterItemType {
  title: string;
  subTitle: string;
  image:string;
  tid: string;
  isSelected: boolean;
}

export interface SendSelectedNewsLettesrsSuccessPayloadType {
  saveData: ResponseMessage;
}

export interface SendSelectedNewsLettersFailedPayloadtype {
  error: string;
}

export interface SendSelectedNewsLettersBody {
  tid: string
}

export interface ResponseMessage {
  code?: number,
  message?: string
}

export interface GetDataType {
  tid: number,
  created_date: string,
}
export interface SelectedNewsLettersDataType {
  code?: number,
  message?: string,
  data?: any,
}

export interface GetSelectedNewsLettersSuccessPayloadType {
  selectedNewsLettersData: any;
}

export interface GetSelectedNewsLettersFailedPayloadtype {
  error: string;
}

export type SendSelectedNewsLettersType = {
  type: typeof SEND_SELECTED_NEWS_LETTERS;
  payload: SendSelectedNewsLettersBody;
};

export type SendSelectedNewsLettersSuccessType = {
  type: typeof SEND_SELECTED_NEWS_LETTERS_SUCCESS;
  payload: SendSelectedNewsLettesrsSuccessPayloadType;
};

export type SendSelectedNewsLettersFailedType = {
  type: typeof SEND_SELECTED_NEWS_LETTERS_ERROR;
  payload: SendSelectedNewsLettersFailedPayloadtype;
};

export type GetSelectedNewsLettersType = {
  type: typeof GET_SELECTED_NEWS_LETTERS;
};

export type GetSelectedNewsLettersSuccessType = {
  type: typeof GET_SELECTED_NEWS_LETTERS_SUCCESS;
  payload: GetSelectedNewsLettersSuccessPayloadType;
};

export type GetSelectedNewsLettersFailedType = {
  type: typeof GET_SELECTED_NEWS_LETTERS_ERROR;
  payload: GetSelectedNewsLettersFailedPayloadtype;
};

export type EmptySelectedNewsLettersInfo = {
  type: typeof EMPTY_SELECTED_NEWS_LETTERS_INFO;
};

export type NewsLettersActions =
  | SendSelectedNewsLettersType
  | SendSelectedNewsLettersSuccessType
  | SendSelectedNewsLettersFailedType
  | GetSelectedNewsLettersType
  | GetSelectedNewsLettersSuccessType
  | GetSelectedNewsLettersFailedType
  | EmptySelectedNewsLettersInfo;