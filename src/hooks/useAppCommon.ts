import { useDispatch, useSelector } from "react-redux"
import { storeServerEnvironment, storeArticleFontSize, resetArticleFontSize, storeBaseUrlConfig } from "src/redux/appCommon/action";
import { getIsFirstSession, getThemeState, getServerEnvironment, getArticleFontSize, getBaseUrlConfig } from "../redux/appCommon/selectors"
import { BaseUrlConfigType, ServerEnvironment, Theme } from "../redux/appCommon/types"
import { ArticleFontSize } from "src/redux/appCommon/types"

export interface UseAppCommonReturn {
    theme: Theme,
    isFirstSession: boolean
    serverEnvironment: ServerEnvironment;
    storeServerEnvironmentInfo(type: ServerEnvironment): void;
    articleFontSize: number
    storeArticleFontSizeInfo(): void
    resetFontSizeInfo(): void;
    baseUrlConfig: BaseUrlConfigType;
    storeBaseUrlConfigInfo: (baseUrlConfigs: BaseUrlConfigType) => void;
}

export const useAppCommon = (): UseAppCommonReturn => {
    const dispatch = useDispatch()

    const theme = useSelector(getThemeState)
    const isFirstSession = useSelector(getIsFirstSession)
    const serverEnvironment = useSelector(getServerEnvironment)
    const articleFontSize = useSelector(getArticleFontSize)
    const baseUrlConfig = useSelector(getBaseUrlConfig)


    const storeServerEnvironmentInfo = (type: ServerEnvironment) => {
        dispatch(storeServerEnvironment(type))
    }

    const storeBaseUrlConfigInfo = (baseUrlConfigs: BaseUrlConfigType) => {
        dispatch(storeBaseUrlConfig({baseUrlConfig: baseUrlConfigs}));
    }

    const storeArticleFontSizeInfo = () => {
        let newFontSize = ArticleFontSize.normal;
        if(articleFontSize === ArticleFontSize.normal) {
          newFontSize = ArticleFontSize.medium
        } else if(articleFontSize === ArticleFontSize.medium) {
            newFontSize = ArticleFontSize.high
        }
        dispatch(storeArticleFontSize(newFontSize))
    }

    const resetFontSizeInfo = () => {
        dispatch(resetArticleFontSize())
    }

    return {
        theme,
        isFirstSession,
        serverEnvironment,
        baseUrlConfig,
        storeServerEnvironmentInfo,
        articleFontSize,
        storeArticleFontSizeInfo,
        resetFontSizeInfo,
        storeBaseUrlConfigInfo,
    }
}
