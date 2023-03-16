import { ServerEnvironment, StoreAppFirstSessionType, 
    StoreServerEnvironmentType, Theme, 
    StoreArticleFontType, ArticleFontSize, 
    ResetArticleFontSizeType, 
    StoreBaseUrlConfigType,
    StoreBaseUrlConfigPayload} from "../../redux/appCommon/types"
import { IS_APP_FIRST_SESSION, STORE_APP_THEME, STORE_SERVER_ENVIRONMENT, STORE_FONT_SIZE, RESET_ARTICLE_FONT_SIZE, STORE_BASE_URL_CONFIG } from "./actionType"
import { StoreAppThemeType } from "./types"

export const storeAppTheme = (appTheme: Theme): StoreAppThemeType => {
    return {
        type: STORE_APP_THEME,
        payload: { theme: appTheme }
    }
}

export const storeAppFirstSession = (): StoreAppFirstSessionType => {
    return {
        type: IS_APP_FIRST_SESSION,
        payload: { isAppFirstSession: false }
    }
}

export const storeServerEnvironment = (serverType: ServerEnvironment): StoreServerEnvironmentType => {
    return {
        type: STORE_SERVER_ENVIRONMENT,
        payload: { serverEnvironment: serverType }
    }
}

export const storeArticleFontSize = (size: ArticleFontSize): StoreArticleFontType => {
    return {
        type: STORE_FONT_SIZE,
        payload: { fontSize: size }
    }
}

export const resetArticleFontSize = (): ResetArticleFontSizeType => {
    return {
        type: RESET_ARTICLE_FONT_SIZE
    }
}

export const storeBaseUrlConfig = (data: StoreBaseUrlConfigPayload): StoreBaseUrlConfigType => {
    return {
        type: STORE_BASE_URL_CONFIG,
        payload: { baseUrlConfig: data.baseUrlConfig }
    }
}
