import { StoreAppFirstSessionType, Theme } from "../../redux/appCommon/types"
import { IS_APP_FIRST_SESSION, STORE_APP_THEME } from "./actionType"
import { StoreAppThemeType } from "./types"

export const storeAppTheme = (theme: Theme): StoreAppThemeType => {
    return {
        type: STORE_APP_THEME,
        payload: { theme: theme }
    }
}

export const storeAppFirstSession = (): StoreAppFirstSessionType => {
    return {
        type: IS_APP_FIRST_SESSION,
        payload: { isAppFirstSession: false }
    }
}