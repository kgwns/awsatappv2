import { resetArticleFontSize, storeAppFirstSession, storeAppTheme, storeArticleFontSize, storeBaseUrlConfig, storeServerEnvironment } from "../action"
import { IS_APP_FIRST_SESSION, RESET_ARTICLE_FONT_SIZE, STORE_APP_THEME, STORE_BASE_URL_CONFIG, STORE_FONT_SIZE, STORE_SERVER_ENVIRONMENT } from "../actionType"
import { ArticleFontSize, ServerEnvironment, Theme } from "../types"

describe('<App Common Action>', () => {
    test('Check storeAppTheme return', () => {
        const nextState = storeAppTheme(
            Theme.DARK
        )
        expect(nextState).toStrictEqual({
            type: STORE_APP_THEME,
            payload: { theme: Theme.DARK }
        })
    })

    test('Check storeAppFirstSession return', () => {
        const nextState = storeAppFirstSession()
        expect(nextState).toStrictEqual({
            type: IS_APP_FIRST_SESSION,
            payload: { isAppFirstSession: false }
        })
    })

    test('Check storeServerEnvironment return', () => {
        const nextState = storeServerEnvironment(ServerEnvironment.PRODUCTION)
        expect(nextState).toStrictEqual({
            type: STORE_SERVER_ENVIRONMENT,
            payload: { serverEnvironment: ServerEnvironment.PRODUCTION }
        })
    })

    test('Check storeArticleFontSize return', () => {
        const nextState = storeArticleFontSize(ArticleFontSize.medium)
        expect(nextState).toStrictEqual({
            type: STORE_FONT_SIZE,
            payload: { fontSize: ArticleFontSize.medium }
        })
    })

    test('Check resetArticleFontSize return', () => {
        const nextState = resetArticleFontSize()
        expect(nextState).toStrictEqual({
            type: RESET_ARTICLE_FONT_SIZE,
        })
    })

    test('Check storeBaseUrlConfig return', () => {
        const payload = {
            baseUrlConfig:{
            baseUrl: 'https://aawsat.srpcdigital.com/',
            umsUrl:  "https://awsatapi.srpcdigital.com/",
            imageUrl: 'https://static.srpcdigital.com/',
            profileImageUrl: "https://awsatapi.srpcdigital.com/storage/",
            liveBlogUrl: "https://aawsat.srpcdigital.com/livenews/",
          }}
        const nextState = storeBaseUrlConfig(payload)
        expect(nextState).toStrictEqual({
            type: STORE_BASE_URL_CONFIG,
            payload
        })
    })

})