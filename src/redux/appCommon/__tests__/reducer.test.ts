import { storeAppTheme } from '../action'
import {AppCommonState} from '../types'
import appCommonReducer from '../reducer'
import { Theme } from '../types'
import { STORE_APP_THEME } from '../actionType'

describe('App Common Reducer', () => {
    let initialState: AppCommonState;
    beforeEach(() => {
        initialState = {
            theme: Theme.LIGHT
        }
        storeAppTheme(Theme.LIGHT)
    })

    test('Check app theme to DARK', () => {
        const nextState = appCommonReducer(initialState, {
            type: STORE_APP_THEME,
            payload: {theme: Theme.DARK}
        })
        expect(nextState.theme).toBe(Theme.DARK)
    })

    test('Check app theme to LIGHT', () => {
        const nextState = appCommonReducer(initialState, {
            type: STORE_APP_THEME,
            payload: {theme: Theme.LIGHT}
        })
        expect(nextState.theme).toBe(Theme.LIGHT)
    })
})