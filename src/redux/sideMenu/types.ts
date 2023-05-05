import {
    FETCH_SIDE_MENU,
    FETCH_SIDE_MENU_ERROR,
    FETCH_SIDE_MENU_SUCCESS,
  } from './actionTypes';
  
  export interface FieldSideMenuExportType {
    id: string;
    name: string;
  }
  
  export interface SideMenuItemType {
    field_sectionid_export: string;
    title: string;
  }
  
  export interface FetchSideMenuSuccessPayloadType {
    sideMenuData: any;
  }
  
  export interface FetchSideMenuFailedPayloadtype {
    error: string;
  }
  
  export type SideMenuState = {
    sideMenuData: SideMenuItemType[];
    error: string;
    isLoading: boolean;
  }
  
  export type FetchSideMenuType = {
    type: typeof FETCH_SIDE_MENU;
  };
  
  export type FetchSideMenuSuccessType = {
    type: typeof FETCH_SIDE_MENU_SUCCESS;
    payload: FetchSideMenuSuccessPayloadType;
  };
  
  export type FetchSideMenuFailedType = {
    type: typeof FETCH_SIDE_MENU_ERROR;
    payload: FetchSideMenuFailedPayloadtype;
  };
  
  export type SideMenuActions =
    | FetchSideMenuType
    | FetchSideMenuSuccessType
    | FetchSideMenuFailedType;
