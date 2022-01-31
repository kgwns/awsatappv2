import { Theme } from "../../../redux/appCommon/types"
import { isDarkTheme } from ".."

describe('<Utilities>', () => {
    it('Check isDarkTheme', () => {
        const isDark = isDarkTheme(Theme.DARK)
        expect(isDark).toBeTruthy()
    })
})