import { Animated, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { ScreenContainer } from '../ScreenContainer/ScreenContainer'
import { horizontalAndBottomEdge, isDarkTheme, normalize } from 'src/shared/utils'
import { GameIntroCard, GameIntroCardProps } from 'src/components/molecules'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { ImagesName } from 'src/shared/styles'
import { TranslateConstants, TranslateKey, ScreensConstants } from 'src/constants/Constants'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { CROSS_WORD_URL, SUDOKU_URL } from 'src/services/apiUrls'
import { useAppCommon } from 'src/hooks'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export enum GameType {
    CROSS_WORD,
    SUDOKU
}

export const GameScreen = React.memo(({tabIndex, currentIndex, scrollY}: {tabIndex?:number; currentIndex?:number; scrollY?: any}) => {
    const navigation = useNavigation<StackNavigationProp<any>>()

    const { theme } = useAppCommon()
    const isDarkMode = isDarkTheme(theme)
    const style = useThemeAwareObject(customStyle)
    const scrollYValue = scrollY ? scrollY : new Animated.Value(0);

    const ref = React.useRef(null);
    useEffect(() => {
        if(tabIndex === currentIndex){
            global.refFlatList = ref;
        }
    }, [currentIndex])


    const crossWordInfo: GameIntroCardProps = {
        type: GameType.CROSS_WORD,
        imageBackgroundColor: style.imageBackgroundColor.backgroundColor,
        image: isDarkMode ? ImagesName.crosswordImageDarkName : ImagesName.crosswordImageName,
        title: TranslateConstants({ key: TranslateKey.CROSSWORD }),
        description: TranslateConstants({ key: TranslateKey.CROSS_WORD_DESCRIPTION }),
        buttonTitle: TranslateConstants({ key: TranslateKey.SOLVING_CROSS_PUZZLES }),
        url: CROSS_WORD_URL
    }

    const sudokuInfo: GameIntroCardProps = {
        type: GameType.SUDOKU,
        imageBackgroundColor: style.imageBackgroundColor.backgroundColor,
        image: isDarkMode ? ImagesName.sudokuImageDarkName : ImagesName.sudokuImageName,
        title: TranslateConstants({ key: TranslateKey.SUDOKU }),
        description: TranslateConstants({ key: TranslateKey.SUDOKU_DESCRIPTION }),
        buttonTitle: TranslateConstants({ key: TranslateKey.SOLVING_SUDOKU }),
        url: SUDOKU_URL
    }

    const navigateToDetailGame = (data: GameIntroCardProps) => {
        const props = { gameData: data, showIntro: true }
        navigation.navigate(ScreensConstants.DYNAMIC_GAME_SCREEN, props)
    }
    return (
        <ScreenContainer edge={horizontalAndBottomEdge} showPlayer={false} backgroundColor={style.screenBackgroundColor.backgroundColor}>
            <AnimatedScrollView ref={ref} 
                onScrollBeginDrag={() => global.refFlatList = ref}  
                style={style.scrollContainer}
                onScroll={Animated.event(
                    [{nativeEvent: { contentOffset: {y: scrollYValue}}}],
                    {useNativeDriver: false}
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}>
                <GameIntroCard {...crossWordInfo} onPress={() => navigateToDetailGame(crossWordInfo)} />
                <GameIntroCard {...sudokuInfo} onPress={() => navigateToDetailGame(sudokuInfo)} />
            </AnimatedScrollView>
        </ScreenContainer>
    )
})

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    scrollContainer: {
        flex: 1,
        marginHorizontal: normalize(16),
    },
    imageBackgroundColor: {
        backgroundColor: theme.gamesImageBackground
    },
    screenBackgroundColor: {
        backgroundColor: theme.backgroundColor,
    }
})
