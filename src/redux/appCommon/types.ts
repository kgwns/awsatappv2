import { isAndroid } from "src/shared/utils"
import { IS_APP_FIRST_SESSION, STORE_APP_THEME, STORE_SERVER_ENVIRONMENT, STORE_FONT_SIZE, RESET_ARTICLE_FONT_SIZE, STORE_BASE_URL_CONFIG } from "./actionType"

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum ServerEnvironment {
  DEBUG = 'Debug',
  PRODUCTION = 'Production',
}

export enum ArticleFontSize {
  normal = isAndroid ? 20 : 18,
  medium = isAndroid ? 22 : 20,
  high = isAndroid ? 24 : 22,
}

export type AppCommonState = {
  theme: Theme,
  isAppFirstSession: boolean,
  serverEnvironment: ServerEnvironment
  articleFontSize: number
  baseUrlConfig: BaseUrlConfigType
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

export type BaseUrlConfigType = {
  baseUrl: string,
  umsUrl: string,
  imageUrl: string,
  profileImageUrl: string,
  liveBlogUrl: string,
}

export type StoreBaseUrlConfigPayload = {
  baseUrlConfig: BaseUrlConfigType
}

export type StoreBaseUrlConfigType = {
  type: typeof STORE_BASE_URL_CONFIG,
  payload: StoreBaseUrlConfigPayload
}

export type AppCommonAction = StoreAppThemeType
  | StoreAppFirstSessionType
  | StoreServerEnvironmentType
  | StoreArticleFontType
  | ResetArticleFontSizeType
  | StoreBaseUrlConfigType
