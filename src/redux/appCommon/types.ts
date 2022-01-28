import { STORE_APP_THEME } from "./actionType"

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export type AppCommonState = {
  theme: Theme
}

export type AppThemeType = {
  theme: Theme
}

export type StoreAppThemeType = {
  type: typeof STORE_APP_THEME,
  payload: AppThemeType
}

export type AppCommonAction = StoreAppThemeType