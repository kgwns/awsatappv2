import { useSelector } from "react-redux"
import { getIsFirstSession, getThemeState } from "../redux/appCommon/selectors"
import { Theme } from "../redux/appCommon/types"

export interface UseAppCommonReturn {
    theme: Theme,
    isFirstSession: boolean
}

export const useAppCommon = (): UseAppCommonReturn => {
    const theme = useSelector(getThemeState)
    const isFirstSession = useSelector(getIsFirstSession)
    return {
        theme,
        isFirstSession
    }
}