import React from 'react'
import { useTranslation } from 'react-i18next'

export enum TranslateKey {
    RETURN,
    NOT_SUBSCRIBED,
    DESCRIPTION,
    SIGN_UP,
    CROSSWORD,
    SUDOKU,
    SOLVING_CROSS_PUZZLES,
    CROSS_WORD_AND_SUDOKU_DESCRIPTION,
    GAMES,
    SECTION_MAIN,
    SECTION_COMBO_ONE,
    SECTION_COMBO_TWO,
    SECTION_COMBO_THREE,
    SECTION_COMBO_FOUR,
    SECTION_COMBO_FIVE,
    SECTION_COMBO_SIX,
    SECTION_COMBO_SEVEN,
}

export const TranslateConstants = ({
    key
}: { key: TranslateKey }) => {
    const [t] = useTranslation()

    switch (key) {
        case TranslateKey.RETURN:
            return t('onBoard.common.return')
        case TranslateKey.NOT_SUBSCRIBED:
            return t('signUpAlert.notSubscribed')
        case TranslateKey.DESCRIPTION:
            return t('signUpAlert.description')
        case TranslateKey.SIGN_UP:
            return t('signUpAlert.signUp')
        case TranslateKey.CROSSWORD:
            return t('games.crossword')
        case TranslateKey.SUDOKU:
            return t('games.sudoku')
        case TranslateKey.SOLVING_CROSS_PUZZLES:
            return t('games.solvingCrossPuzzles')
        case TranslateKey.CROSS_WORD_AND_SUDOKU_DESCRIPTION:
            return t('games.crosswordAndSudokuDescription')
        case TranslateKey.GAMES:
            return t('games.games')
        case TranslateKey.SECTION_MAIN:
            return t('sectionTab.main')
        case TranslateKey.SECTION_COMBO_ONE:
            return t('latestNewsTab.sectionComboOne.headerLeft')
        case TranslateKey.SECTION_COMBO_TWO:
            return t('latestNewsTab.sectionComboTwo.headerLeft')
        case TranslateKey.SECTION_COMBO_THREE:
            return t('latestNewsTab.sectionComboThree.headerLeft')
        case TranslateKey.SECTION_COMBO_FOUR:
            return t('latestNewsTab.sectionComboFour.headerLeft')
        case TranslateKey.SECTION_COMBO_FIVE:
            return t('latestNewsTab.sectionComboFive.headerLeft')
        case TranslateKey.SECTION_COMBO_SIX:
            return t('latestNewsTab.sectionComboSix.headerLeft')
        case TranslateKey.SECTION_COMBO_SEVEN:
            return t('latestNewsTab.sectionComboSeven.headerLeft')
        default: return ''
    }
}
