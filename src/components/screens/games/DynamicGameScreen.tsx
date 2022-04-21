import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { ScreenContainer } from '../ScreenContainer/ScreenContainer'
import WebView from 'react-native-webview'
import { horizontalAndBottomEdge, normalize, screenHeight } from 'src/shared/utils'
import { GameIntroCard } from 'src/components/molecules'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from '~/shared/styles/colors'


export interface DynamicGameScreenProps {
    route: any
}


export const DynamicGameScreen = ({
    route
}: DynamicGameScreenProps) => {
    const style = useThemeAwareObject(customStyle)

    const { gameData } = route.params

    const onShouldStartLoadWithRequest = (request: any) => {
        return true
    }

    return (
        <ScreenContainer edge={horizontalAndBottomEdge}>
            <ScrollView style={style.scrollContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <GameIntroCard {...gameData} hideButtonTitle={true} />
                <WebView style={style.webview}
                    startInLoadingState={true}
                    originWhitelist={['*']}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    source={{ uri: gameData.url }}
                    nestedScrollEnabled={true}
                    setSupportMultipleWindows={false}
                    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
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
        height: 0.9 * screenHeight,
    }
})