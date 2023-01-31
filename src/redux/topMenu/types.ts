import {
  FETCH_TOP_MENU,
  FETCH_TOP_MENU_ERROR,
  FETCH_TOP_MENU_SUCCESS,
} from './actionTypes';

export interface FieldTopMenuExportType {
  id: string;
  name: string;
}

export interface TopMenuItemType {
  tabName: string;
  uuid?: string;
  parentId?: string;
  link__options?: string;
  title_export?: string;
  sectionId?: number|null;
  keyName?: string;
  isSelected: boolean;
  child?: TopMenuItemType[];
  field_sections?: string;
}

export interface FetchTopMenuSuccessPayloadType {
  topMenuData: TopMenuItemType[];
}

export interface FetchTopMenuFailedPayloadtype {
  error: string;
}

export type TopMenuState = {
  topMenuData: TopMenuItemType[];
  error: string;
  isLoading: boolean;
}

export type FetchTopMenuType = {
  type: typeof FETCH_TOP_MENU;
};

export type FetchTopMenuSuccessType = {
  type: typeof FETCH_TOP_MENU_SUCCESS;
  payload: FetchTopMenuSuccessPayloadType;
};

export type FetchTopMenuFailedType = {
  type: typeof FETCH_TOP_MENU_ERROR;
  payload: FetchTopMenuFailedPayloadtype;
};

export type TopMenuActions =
  | FetchTopMenuType
  | FetchTopMenuSuccessType
  | FetchTopMenuFailedType;
