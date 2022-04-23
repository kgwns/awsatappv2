import { normalize } from 'src/shared/utils';
import { Theme } from '../../redux/appCommon/types'
import { IS_APP_FIRST_SESSION, STORE_APP_THEME, STORE_FONT_SIZE } from './actionType';
import { AppCommonAction, AppCommonState } from './types';

const initialAuthState: AppCommonState = {
  theme: Theme.LIGHT,
  isAppFirstSession: true,
  articleFontSize: normalize(16)
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
    case STORE_FONT_SIZE:
      return {
        ...state,
        articleFontSize: action.payload.fontSize
      }
    default:
      return state
  }
}
