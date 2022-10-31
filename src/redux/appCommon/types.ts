import { IS_APP_FIRST_SESSION, STORE_APP_THEME, STORE_SERVER_ENVIRONMENT, STORE_FONT_SIZE, RESET_ARTICLE_FONT_SIZE } from "./actionType"

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum ServerEnvironment {
  DEBUG = 'Debug',
  PRODUCTION = 'Production',
}

export enum ArticleFontSize {
  normal = 17,
  medium = 19,
  high = 21,
}

export type AppCommonState = {
  theme: Theme,
  isAppFirstSession: boolean,
  serverEnvironment: ServerEnvironment
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

export type StoreServerEnvironmentPayload = {
  serverEnvironment: ServerEnvironment
}

export type StoreServerEnvironmentType = {
  type: typeof STORE_SERVER_ENVIRONMENT,
  payload: StoreServerEnvironmentPayload
}

export type StoreArticleFontPayloadType = {
  fontSize: ArticleFontSize
}

export type StoreArticleFontType = {
 type: typeof STORE_FONT_SIZE,
 payload: StoreArticleFontPayloadType
}

export type ResetArticleFontSizeType = {
  type: typeof RESET_ARTICLE_FONT_SIZE
}


export type AppCommonAction = StoreAppThemeType
  | StoreAppFirstSessionType
  | StoreServerEnvironmentType
  | StoreArticleFontType
  | ResetArticleFontSizeType