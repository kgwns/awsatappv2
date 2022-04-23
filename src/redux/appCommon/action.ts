import { ArticleFontSize } from "src/components/screens/opinionArticleDetail/OpinionArticleDetail"
import { StoreAppFirstSessionType, StoreArticleFontType, Theme } from "../../redux/appCommon/types"
import { IS_APP_FIRST_SESSION, STORE_APP_THEME, STORE_FONT_SIZE } from "./actionType"
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

export const storeArticleFontSize = (size: ArticleFontSize): StoreArticleFontType => {
    return {
        type: STORE_FONT_SIZE,
        payload: { fontSize: size }
    }
}