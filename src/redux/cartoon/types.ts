import {
  FETCH_CARTOON_LIST,
  FETCH_CARTOON_LIST_SUCCESS,
  FETCH_CARTOON_LIST_FAILED,
} from './actionTypes';

export type CartoonState = {
  cartoonList: CartoonDataType[];
  error: string;
  isLoading: boolean;
  hasNextPage: boolean;
};

export type CartoonDataType = {
  nid: string;
  title: string;
  created: string;
  body: string;
  type: string;
  image: string;
  shortUrl: string;
};

export type CartoonListBodyType = {
  page: number;
  items_per_page?: number;
};

export type FetchCartoonListType = {
  type: typeof FETCH_CARTOON_LIST;
  payload: CartoonListBodyType;
};

export type FetchCartoonListSuccessPayloadType = {
  data: CartoonDataType[];
  hasNextPage: boolean;
};

export type FetchCartoonListSuccessType = {
  type: typeof FETCH_CARTOON_LIST_SUCCESS;
  payload: FetchCartoonListSuccessPayloadType;
};


export type FetchCartoonListFailedPayloadType = {
  error: string;
}

export type FetchCartoonDetailFailedType = {
  type: typeof FETCH_CARTOON_LIST_FAILED;
  payload: FetchCartoonListFailedPayloadType;
};


export type CartoonListActions =
  | FetchCartoonListType
  | FetchCartoonListSuccessType
  | FetchCartoonDetailFailedType;
