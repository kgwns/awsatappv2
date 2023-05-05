import {
    FetchSideMenuSuccessPayloadType,
    FetchSideMenuFailedPayloadtype,
    FetchSideMenuSuccessType,
    FetchSideMenuFailedType,
  } from './types';
  import {
    FETCH_SIDE_MENU,
    FETCH_SIDE_MENU_SUCCESS,
    FETCH_SIDE_MENU_ERROR,
  } from './actionTypes';
  
  export const fetchSideMenu = () => {
    return {
      type: FETCH_SIDE_MENU,
    };
  };
  
  export const fetchSideMenuSuccess = (
    payload: FetchSideMenuSuccessPayloadType,
  ): FetchSideMenuSuccessType => {
    return {
      type: FETCH_SIDE_MENU_SUCCESS,
      payload,
    };
  };
  
  export const fetchSideMenuFailed = (
    payload: FetchSideMenuFailedPayloadtype,
  ): FetchSideMenuFailedType => {
    return {
      type: FETCH_SIDE_MENU_ERROR,
      payload,
    };
  };
  
  export const sideMenuAction = {
    fetchSideMenu,
    fetchSideMenuSuccess,
    fetchSideMenuFailed,
  };
