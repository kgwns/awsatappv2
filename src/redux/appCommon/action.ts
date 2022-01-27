import { Theme } from "../../redux/appCommon/types"
import { STORE_APP_THEME } from "./actionType"
import { StoreAppThemeType } from "./types"

export const storeAppTheme = (theme: Theme) : StoreAppThemeType => {
    return {
        type: STORE_APP_THEME,
        payload: {theme: theme}
    }
}