import { Theme } from '../../redux/appCommon/types'
import { IS_APP_FIRST_SESSION, STORE_APP_THEME } from './actionType';
import { AppCommonAction, AppCommonState } from './types';

const initialAuthState: AppCommonState = {
  theme: Theme.LIGHT,
  isAppFirstSession: true
};

export default (state = initialAuthState, action: AppCommonAction) => {
  switch (action.type) {
    case STORE_APP_THEME:
      return {
        ...state,
        theme: action.payload.theme
      }
    case IS_APP_FIRST_SESSION:
      return {
        ...state,
        isAppFirstSession: action.payload.isAppFirstSession
      }
    default:
      return state
  }
}
