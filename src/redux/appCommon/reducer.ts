import { Theme } from '../../redux/appCommon/types'
import { STORE_APP_THEME } from './actionType';
import { AppCommonAction, AppCommonState } from './types';

const initialAuthState: AppCommonState = {
  theme: Theme.LIGHT
};

export default (state = initialAuthState, action: AppCommonAction) => {
  switch (action.type) {
    case STORE_APP_THEME:
      return {
        ...state,
        theme: action.payload.theme
      }
    default:
      return { ...state }
  }
}
