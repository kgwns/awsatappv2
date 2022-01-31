import { storeAppTheme } from "../action"
import { STORE_APP_THEME } from "../actionType"
import { Theme } from "../types"

describe('<App Common Action>', () => {
    test('Check storeAppTheme return', () => {
        const nextState = storeAppTheme(
            Theme.DARK
        )
        expect(nextState).toBe({
            type: STORE_APP_THEME,
            payload: { theme: Theme.DARK }
        })
    })
})