import { useDispatch, useSelector } from "react-redux"
import { storeArticleFontSize } from "src/redux/appCommon/action"
import { normalize } from "src/shared/utils/dimensions"
import { ArticleFontSize } from "src/redux/appCommon/types"
import { getArticleFontSize, getIsFirstSession, getThemeState } from "../redux/appCommon/selectors"
import { Theme } from "../redux/appCommon/types"

export interface UseAppCommonReturn {
    theme: Theme,
    isFirstSession: boolean
    articleFontSize: number
    storeArticleFontSizeInfo(): void
}

export const useAppCommon = (): UseAppCommonReturn => {
    const dispatch = useDispatch()

    const theme = useSelector(getThemeState)
    const isFirstSession = useSelector(getIsFirstSession)
    const articleFontSize = useSelector(getArticleFontSize)

    const storeArticleFontSizeInfo = () => {
        let newFontSize = normalize(16)
        if(articleFontSize === ArticleFontSize.normal) {
          newFontSize = normalize(18)
        } else if(articleFontSize === ArticleFontSize.medium) {
          newFontSize = normalize(20)
        }
        dispatch(storeArticleFontSize(newFontSize))
    }

    return {
        theme,
        isFirstSession,
        articleFontSize,
        storeArticleFontSizeInfo
    }
}