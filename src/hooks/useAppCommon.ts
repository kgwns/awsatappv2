import { useDispatch, useSelector } from "react-redux"
import { storeServerEnvironment, storeArticleFontSize, resetArticleFontSize } from "src/redux/appCommon/action";
import { getIsFirstSession, getThemeState, getServerEnvironment, getArticleFontSize } from "../redux/appCommon/selectors"
import { ServerEnvironment, Theme } from "../redux/appCommon/types"
import { ArticleFontSize } from "src/redux/appCommon/types"
import { normalize } from "src/shared/utils/dimensions"


export interface UseAppCommonReturn {
    theme: Theme,
    isFirstSession: boolean
    serverEnvironment: ServerEnvironment;
    storeServerEnvironmentInfo(type: ServerEnvironment): void;
    articleFontSize: number
    storeArticleFontSizeInfo(): void
    resetFontSizeInfo(): void;
}

export const useAppCommon = (): UseAppCommonReturn => {
    const dispatch = useDispatch()

    const theme = useSelector(getThemeState)
    const isFirstSession = useSelector(getIsFirstSession)
    const serverEnvironment = useSelector(getServerEnvironment)
    const articleFontSize = useSelector(getArticleFontSize)


    const storeServerEnvironmentInfo = (type: ServerEnvironment) => {
        dispatch(storeServerEnvironment(type))
    }


    const storeArticleFontSizeInfo = () => {
        let newFontSize = 16
        if(articleFontSize === ArticleFontSize.normal) {
          newFontSize = 18
        } else if(articleFontSize === ArticleFontSize.medium) {
          newFontSize = 20
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
        storeServerEnvironmentInfo,
        articleFontSize,
        storeArticleFontSizeInfo,
        resetFontSizeInfo,
    }
}