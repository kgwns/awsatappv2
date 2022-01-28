import { useSelector } from "react-redux"
import { getThemeState } from "../redux/appCommon/selectors"
import { Theme } from "../redux/appCommon/types"

export interface UseAppCommonReturn {
    theme: Theme
}

export const useAppCommon = (): UseAppCommonReturn => {
    const theme = useSelector(getThemeState)
    return {
        theme
    }
}