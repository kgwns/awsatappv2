import { ScrollView, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { ScreenContainer } from '../ScreenContainer/ScreenContainer'
import WebView, { WebViewNavigation } from 'react-native-webview'
import { horizontalAndBottomEdge, normalize, screenHeight } from 'src/shared/utils'
import { GameIntroCard } from 'src/components/molecules'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { CROSS_WORD_GAME_BASE_ID_URL, SUDOKU_GAME_BASE_ID_URL } from 'src/services/apiUrls'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScreensConstants } from 'src/constants/Constants'


export interface DynamicGameScreenProps {
    route: any
}


export const DynamicGameScreen = ({
    route
}: DynamicGameScreenProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()

    const webviewRef = useRef<WebView>().current

    const style = useThemeAwareObject(customStyle)
    const { gameData, showIntro } = route.params

    const [currentUrl, setCurrentUrl] = useState(gameData.url || '')

    const onShouldStartLoadWithRequest = (request: any) => {
        const { url } = request

        if (url && (url.includes(SUDOKU_GAME_BASE_ID_URL) || url.includes(CROSS_WORD_GAME_BASE_ID_URL)) && currentUrl !== url) {
            navigation.push(ScreensConstants.DYNAMIC_GAME_SCREEN, { gameData: { url: url }, showIntro: false })
            webviewRef?.stopLoading()
            return false
        }

        return true
    }

    const onNavigationStateChange = (request: WebViewNavigation) => {
        const { url } = request
        setCurrentUrl(url || '')
    }

    return (
        <ScreenContainer edge={horizontalAndBottomEdge} backgroundColor={style.screenBackgroundColor?.backgroundColor}>
            <ScrollView style={style.scrollContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                {showIntro && <GameIntroCard {...gameData} hideButtonTitle={true} isDynamic/>}
                <WebView style={style.webview}
                    ref={() => webviewRef}
                    testID='DynamicGameScreenID01'
                    startInLoadingState={true}
                    originWhitelist={['*']}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    source={{ uri: gameData.url }}
                    nestedScrollEnabled={false}
                    setSupportMultipleWindows={false}
                    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                    onNavigationStateChange={onNavigationStateChange}
                />
            </ScrollView>
        </ScreenContainer>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    scrollContainer: {
        flex: 1,
        marginHorizontal: normalize(16),
    },
    webview: {
        width: '100%',
        height: 0.85 * screenHeight,
    },
    screenBackgroundColor: {
        backgroundColor: theme.gameBackground,
    }
})
