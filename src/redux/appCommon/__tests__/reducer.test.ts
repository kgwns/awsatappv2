import { storeAppTheme } from '../action'
import {AppCommonState, ArticleFontSize, ServerEnvironment} from '../types'
import appCommonReducer from '../reducer'
import { Theme } from '../types'
import { IS_APP_FIRST_SESSION, RESET_ARTICLE_FONT_SIZE, STORE_APP_THEME, STORE_BASE_URL_CONFIG, STORE_FONT_SIZE, STORE_SERVER_ENVIRONMENT } from '../actionType'
import { normalize } from 'src/shared/utils';

describe('App Common Reducer', () => {
    let initialState: AppCommonState;
    let url: any;
    beforeEach(() => {
        initialState = {
            theme: Theme.LIGHT,
            isAppFirstSession: true,
            serverEnvironment: ServerEnvironment.PRODUCTION,
            articleFontSize: normalize(16),
            baseUrlConfig:{
                baseUrl: 'https://aawsat.srpcdigital.com/',
                umsUrl:  "https://awsatapi.srpcdigital.com/",
                imageUrl: 'https://static.srpcdigital.com/',
                profileImageUrl: "https://awsatapi.srpcdigital.com/storage/",
                liveBlogUrl: "https://aawsat.srpcdigital.com/livenews/",
            }
        }
        url = {
            baseUrlConfig: {
                baseUrl: 'https://aawsat.srpcdigital.com/baseUrl',
                umsUrl:  "https://awsatapi.srpcdigital.com/umsUrl",
                imageUrl: 'https://static.srpcdigital.com/imageUrl',
                profileImageUrl: "https://awsatapi.srpcdigital.com/storage/profileImageUrl",
                liveBlogUrl: "https://aawsat.srpcdigital.com/livenews/liveBlogUrl",
            }
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

    test('Check app theme to LIGHT', () => {
        const nextState = appCommonReducer(initialState, {
            type: IS_APP_FIRST_SESSION,
            payload: { isAppFirstSession: false }
        })
        expect(nextState.theme).toBe("light")
    })

    test('Check app theme to LIGHT', () => {
        const nextState = appCommonReducer(initialState, {
            type: STORE_SERVER_ENVIRONMENT,
            payload: {serverEnvironment: ServerEnvironment.PRODUCTION }
        })
        expect(nextState.theme).toBe("light")
    })

    test('Check app theme to LIGHT', () => {
        const nextState = appCommonReducer(initialState, {
            type: STORE_SERVER_ENVIRONMENT,
            payload: {serverEnvironment: ServerEnvironment.DEBUG}
        })
        expect(nextState.theme).toBe("light")
    })

    test('Check app theme to LIGHT', () => {
        const nextState = appCommonReducer(initialState, {
            type: STORE_FONT_SIZE,
            payload: {fontSize: ArticleFontSize.medium}
        })
        expect(nextState.theme).toBe("light")
    })

    test('Check app theme to LIGHT', () => {
        const nextState = appCommonReducer(initialState, {
            type: STORE_FONT_SIZE,
            payload: {fontSize: ArticleFontSize.normal}
        })
        expect(nextState.theme).toBe("light")
    })

    test('Check app theme to LIGHT', () => {
        const nextState = appCommonReducer(initialState, {
            type: STORE_FONT_SIZE,
            payload: {fontSize: ArticleFontSize.high}
        })
        expect(nextState.theme).toBe("light")
    })

    test('Check app theme to LIGHT', () => {
        const nextState = appCommonReducer(initialState, {
            type: RESET_ARTICLE_FONT_SIZE,
        })
        expect(nextState.theme).toBe("light")
    })
    test('Check base url', () => {
        const nextState = appCommonReducer(initialState, {
            type: STORE_BASE_URL_CONFIG,
            payload: {baseUrlConfig:url.baseUrlConfig}
        })
        expect(nextState.baseUrlConfig).toEqual(url.baseUrlConfig)
    })
    test('Check default action to called', () => {
        const nextState = appCommonReducer(initialState, {})
        expect(nextState).toEqual(initialState)
    })


})