import {
  REQUEST_HOME_SUCCESS,
  REQUEST_HOME,
  REQUEST_HOME_ERROR,
} from './actionType';

export interface HomeBodyType {
  page:number
}

// -- maybe it required only type, because response is not
export interface HomeSuccessPayloadType {
  homeData: any;
}

export interface HomeFailedPayloadtype {
  error: string;
}

export interface HomeState {
  homeData: string;
  error: string;
  isLoading: boolean;
}

export type RequestHomeType = {
  type: typeof REQUEST_HOME;
  payload: HomeBodyType;
};

export type HomeSuccessType = {
  type: typeof REQUEST_HOME_SUCCESS;
  payload: HomeSuccessPayloadType;
};

export type HomeFailedType = {
  type: typeof REQUEST_HOME_ERROR;
  payload: HomeFailedPayloadtype;
};

export type HomeActions =
  | RequestHomeType
  | HomeSuccessType
  | HomeFailedType;
