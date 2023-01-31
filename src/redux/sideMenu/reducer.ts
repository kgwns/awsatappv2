import { 
    FETCH_SIDE_MENU,
    FETCH_SIDE_MENU_ERROR,
    FETCH_SIDE_MENU_SUCCESS
} from './actionTypes';
import { SideMenuActions, SideMenuState } from './types';
const initialAuthState: SideMenuState = {
  sideMenuData: [],
  error: '',
  isLoading: false,
};

export default (state = initialAuthState, action: SideMenuActions) => {
  switch (action.type) {
    case FETCH_SIDE_MENU_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sideMenuData: action.payload.sideMenuData.rows,
        error: '',
      };
    case FETCH_SIDE_MENU_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_SIDE_MENU:
      return { ...state, isLoading: true, error: '' };
    default:
      return { ...state };
  }
};
