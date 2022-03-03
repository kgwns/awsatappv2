import { IS_APP_FIRST_SESSION, STORE_APP_THEME } from "./actionType"

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export type AppCommonState = {
  theme: Theme,
  isAppFirstSession: boolean
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


export type AppCommonAction = StoreAppThemeType | StoreAppFirstSessionType