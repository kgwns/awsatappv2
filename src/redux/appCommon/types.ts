import { normalize } from "src/shared/utils"
import { IS_APP_FIRST_SESSION, STORE_APP_THEME, STORE_FONT_SIZE } from "./actionType"

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum ArticleFontSize {
  normal = normalize(16),
  medium = normalize(18),
  high = normalize(20)
}

export type AppCommonState = {
  theme: Theme,
  isAppFirstSession: boolean
  articleFontSize: number
}

export type AppThemeType = {
  theme: Theme
}

export type StoreAppThemeType = {
  type: typeof STORE_APP_THEME,
  payload: AppThemeType
}

export type StoreAppFirstSessionPayloadType = {
  isAppFirstSession: false
}

export type StoreAppFirstSessionType = {
  type: typeof IS_APP_FIRST_SESSION,
  payload: StoreAppFirstSessionPayloadType
}

export type StoreArticleFontPayloadType = {
   fontSize: ArticleFontSize
}

export type StoreArticleFontType = {
  type: typeof STORE_FONT_SIZE,
  payload: StoreArticleFontPayloadType
}


export type AppCommonAction = StoreAppThemeType | StoreAppFirstSessionType | StoreArticleFontType