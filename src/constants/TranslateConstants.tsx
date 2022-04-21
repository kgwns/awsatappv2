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
        default: return ''
    }
}
