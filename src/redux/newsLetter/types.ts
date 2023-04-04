import { EMPTY_SELECTED_NEWS_LETTERS_INFO, 
  GET_SELECTED_NEWS_LETTERS, GET_SELECTED_NEWS_LETTERS_ERROR, 
  GET_SELECTED_NEWS_LETTERS_SUCCESS, SEND_SELECTED_NEWS_LETTERS, 
  SEND_SELECTED_NEWS_LETTERS_ERROR, SEND_SELECTED_NEWS_LETTERS_SUCCESS, 
  GET_MY_NEWS_LETTERS, GET_MY_NEWS_LETTERS_SUCCESS, GET_MY_NEWS_LETTERS_ERROR, 
  EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD, 
  SELECTED_DATA_FROM_NEWSLETTER_ONBOARD } from "./actionTypes";

export type NewsLetterState = {
  error: string;
  isLoading: boolean;
  sendNewsLettersInfo: ResponseMessage;
  selectedNewsLettersData: SelectedNewsLettersDataType;
  myNewsLetters: any;
  isMyNewsLoading: boolean;
  myNewsError: string;
  selectedDataFromNewsLetterOnboard: string[];
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
  id: number,
  date: string,
  image: string,
  name: string,
  description: string,
}
export interface SelectedNewsLettersDataType {
  code?: number,
  message?: string,
  data?: any,
}

export interface GetSelectedNewsLettersSuccessPayloadType {
  selectedNewsLettersData: any;
}
export interface GetMyNewsLettersSuccessPayloadType {
  myNewsLettersData: any;
}

export interface GetMyNewsLettersFailedPayloadtype {
  error: string;
}

export interface GetSelectedNewsLettersFailedPayloadtype {
  error: string;
}
export interface SelectedDataFromNewsLetterOnboardPayload {
  data: string[];
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

export type GetMyNewsLettersType = {
  type: typeof GET_MY_NEWS_LETTERS;
};

export type GetMyNewsLettersSuccessType = {
  type: typeof GET_MY_NEWS_LETTERS_SUCCESS;
  payload: GetMyNewsLettersSuccessPayloadType;
};

export type GetMyNewsLettersFailedType = {
  type: typeof GET_MY_NEWS_LETTERS_ERROR;
  payload: GetMyNewsLettersFailedPayloadtype;
};

export type EmptySelectedNewsLettersInfo = {
  type: typeof EMPTY_SELECTED_NEWS_LETTERS_INFO;
};

export type SetSelectedDataFromNewsletterOnboard = {
  type: typeof SELECTED_DATA_FROM_NEWSLETTER_ONBOARD;
  payload: string[];
}

export type EmptySelectedNewsletterDataFromOnboard = {
  type: typeof EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD;
}

export type NewsLettersActions =
  | SendSelectedNewsLettersType
  | SendSelectedNewsLettersSuccessType
  | SendSelectedNewsLettersFailedType
  | GetSelectedNewsLettersType
  | GetSelectedNewsLettersSuccessType
  | GetSelectedNewsLettersFailedType
  | GetMyNewsLettersSuccessType
  | GetMyNewsLettersType
  | GetMyNewsLettersFailedType
  | EmptySelectedNewsLettersInfo
  | SetSelectedDataFromNewsletterOnboard
  | EmptySelectedNewsletterDataFromOnboard;
