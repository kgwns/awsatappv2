import { ArticleFontSize, ServerEnvironment, Theme } from '../../redux/appCommon/types'
import { IS_APP_FIRST_SESSION, STORE_APP_THEME, STORE_SERVER_ENVIRONMENT, STORE_FONT_SIZE, RESET_ARTICLE_FONT_SIZE, STORE_BASE_URL_CONFIG } from './actionType';
import { AppCommonAction, AppCommonState } from './types';

const initialAuthState: AppCommonState = {
  theme: Theme.LIGHT,
  isAppFirstSession: true,
  serverEnvironment: ServerEnvironment.PRODUCTION,
  articleFontSize: ArticleFontSize.normal,
  baseUrlConfig: {
    baseUrl: '',
    umsUrl: '',
    imageUrl: '',
    profileImageUrl: '',
    liveBlogUrl: '',
  },
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
    case STORE_SERVER_ENVIRONMENT:
      return {
        ...state,
        serverEnvironment: action.payload.serverEnvironment
      }
    case STORE_FONT_SIZE:
      return {
        ...state,
        articleFontSize: action.payload.fontSize
      }
    case RESET_ARTICLE_FONT_SIZE:
      return {
        ...state,
        articleFontSize: ArticleFontSize.normal
      }
    case STORE_BASE_URL_CONFIG:
      return {
        ...state,
        baseUrlConfig: action.payload.baseUrlConfig,
      }
    default:
      return state
  }
}
