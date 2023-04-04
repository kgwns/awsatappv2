import {
  FETCH_TOP_MENU,
  FETCH_TOP_MENU_ERROR,
  FETCH_TOP_MENU_SUCCESS
} from './actionTypes';
import { TopMenuActions, TopMenuState } from './types';
const initialAuthState: TopMenuState = {
topMenuData: [],
error: '',
isLoading: false,
};

export default (state = initialAuthState, action: TopMenuActions) => {
switch (action.type) {
  case FETCH_TOP_MENU_SUCCESS:
    return {
      ...state,
      isLoading: false,
      topMenuData: action.payload.topMenuData,
      error: '',
    };
  case FETCH_TOP_MENU_ERROR:
    return { ...state, error: action.payload.error, isLoading: false };
  case FETCH_TOP_MENU:
    return { ...state, isLoading: true, error: '' };
  default:
    return { ...state };
}
};
