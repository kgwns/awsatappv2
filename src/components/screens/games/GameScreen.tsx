import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { ScreenContainer } from '../ScreenContainer/ScreenContainer'
import { horizontalAndBottomEdge, normalize } from 'src/shared/utils'
import { GameIntroCard, GameIntroCardProps } from 'src/components/molecules'
import { CustomThemeType } from '~/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { ImagesName, Styles } from 'src/shared/styles'
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants'
import { useNavigation } from '@react-navigation/native'
import { ScreensConstants } from 'src/constants'
import { StackNavigationProp } from '@react-navigation/stack'
import { CROSS_WORD_URL, SUDOKU_URL } from 'src/services/apiUrls'

export enum GameType {
    CROSS_WORD,
    SUDOKU
}

export const GameScreen = () => {
    const navigation = useNavigation<StackNavigationProp<any>>()

    const style = useThemeAwareObject(customStyle)

    const crossWordInfo: GameIntroCardProps = {
        type: GameType.CROSS_WORD,
        imageBackgroundColor: Styles.color.flamingo,
        image: ImagesName.crossWord,
        title: TranslateConstants({ key: TranslateKey.CROSSWORD }),
        description: TranslateConstants({ key: TranslateKey.CROSS_WORD_AND_SUDOKU_DESCRIPTION }),
        buttonTitle: TranslateConstants({ key: TranslateKey.SOLVING_CROSS_PUZZLES }),
        url: CROSS_WORD_URL
    }

    const sudokuInfo: GameIntroCardProps = {
        type: GameType.SUDOKU,
        imageBackgroundColor: Styles.color.deepPeach,
        image: ImagesName.sudoku,
        title: TranslateConstants({ key: TranslateKey.SUDOKU }),
        description: TranslateConstants({ key: TranslateKey.CROSS_WORD_AND_SUDOKU_DESCRIPTION }),
        buttonTitle: TranslateConstants({ key: TranslateKey.SOLVING_CROSS_PUZZLES }),
        url: SUDOKU_URL
    }

    const navigateToDetailGame = (data: GameIntroCardProps) => {
        const props = { gameData: data, showIntro: true }
        navigation.navigate(ScreensConstants.DYNAMIC_GAME_SCREEN, props)
    }

    return (
        <ScreenContainer edge={horizontalAndBottomEdge}>
            <ScrollView style={style.scrollContainer}
                showsVerticalScrollIndicator={false}>
                <GameIntroCard {...crossWordInfo} onPress={() => navigateToDetailGame(crossWordInfo)} />
                <GameIntroCard {...sudokuInfo} onPress={() => navigateToDetailGame(sudokuInfo)} />
            </ScrollView>
        </ScreenContainer>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    scrollContainer: {
        flex: 1,
        marginHorizontal: normalize(16),
    }
})