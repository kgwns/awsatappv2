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
    SOLVING_SUDOKU,
    CROSS_WORD_DESCRIPTION,
    SUDOKU_DESCRIPTION,
    GAMES,
    SECTION_MAIN,
    SECTION_COMBO_ONE,
    SECTION_COMBO_TWO,
    SECTION_COMBO_THREE,
    SECTION_COMBO_FOUR,
    SECTION_COMBO_FIVE,
    SECTION_COMBO_SIX,
    SECTION_COMBO_SEVEN,
    EDITOR_CHOICE_HEADER_TITLE,
    DRAWER_PDF_ARCHIVE,
    OPINION_COMBO_TITLE,
    OPINION_ARTICLE_TITLE,
    RICH_HTML_FACTS,
    CONST_MORE,
    CONST_READ_ARTICLE,
    RICH_OPINION_TITLE,
    TAB_ALL_TITLE,
    NO_CONTENT_TITLE,
    DRAWER_CALL_US,
    CONTACT_US_NAME,
    CONTACT_US_EMAIL,
    CONTACT_US_LETTER,
    CONTACT_US_SEND,
    TEXT_ALERT,
    COMMON_OK,
    LISTEN_TO_ARTICLE,
    ONBOARD_SUCCESS_MESSAGE,
    ONBOARD_SUCCESS_MAIL_ACKNOWLEDGEMENT,
    ONBOARD_SUCCESS_GO_TO_HOME,
    ONBOARD_SUCCESS_GO_TO_MY_NEWS,
    OPINION_SLIDER_TITLE,
    WEATHER_DETAILS_SUNRISE,
    WEATHER_DETAILS_SUNSET,
    WEATHER_DETAILS_SIDEBAR,
    WEATHER_DETAILS_MAX,
    WEATHER_DETAILS_MBAR,
    WEATHER_DETAILS_KM,
    WEATHER_DETAILS_KMH,
    WEATHER_DETAILS_HUMIDITY,
    WEATHER_DETAILS_VISIBILITY,
    WEATHER_DETAILS_PRESSURE,
    WEATHER_DETAILS_SPEED,
    WEATHER_DETAILS_SEA_CONDITION,
    WEATHER_DETAILS_ENABLE_LOCATION,
}

export const TranslateConstants = ({
    key
}: { key: TranslateKey }) => {
    const [t] = useTranslation()

    switch (key) {
        case TranslateKey.RETURN:
            return t('return')
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
        case TranslateKey.SOLVING_SUDOKU:
            return t('games.solvingSudoku')
        case TranslateKey.CROSS_WORD_DESCRIPTION:
            return t('games.crosswordDescription')
        case TranslateKey.SUDOKU_DESCRIPTION:
            return t('games.sudokuDescription')
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
        case TranslateKey.EDITOR_CHOICE_HEADER_TITLE:
            return t('latestNewsTab.editorsChoice.headerLeft')
        case TranslateKey.DRAWER_PDF_ARCHIVE:
            return t('drawer.pdfArchive')
        case TranslateKey.OPINION_COMBO_TITLE:
            return t('latestNewsTab.sectionWriters.headerLeft')
        case TranslateKey.OPINION_ARTICLE_TITLE:
            return t('opinion.opinionArticles')
        case TranslateKey.RICH_HTML_FACTS:
            return t('richHTMLContent.facts')
        case TranslateKey.CONST_MORE:
            return t('common.more')
        case TranslateKey.CONST_READ_ARTICLE:
            return t('richHTMLContent.readArticle')
        case TranslateKey.RICH_OPINION_TITLE:
            return t('richHTMLContent.opinionTitle')
        case TranslateKey.TAB_ALL_TITLE:
            return t('myNewsWriters.allTxt')
        case TranslateKey.NO_CONTENT_TITLE:
            return t('myNewsWriters.noContent')
        case TranslateKey.DRAWER_CALL_US:
            return t('drawer.callUs')
        case TranslateKey.CONTACT_US_NAME:
            return t('contactUs.name')
        case TranslateKey.CONTACT_US_EMAIL:
            return t('contactUs.email')
        case TranslateKey.CONTACT_US_LETTER:
            return t('contactUs.yourLetter')
        case TranslateKey.CONTACT_US_SEND:
            return t('contactUs.send')
        case TranslateKey.TEXT_ALERT:
            return t('profileSetting.alert');
        case TranslateKey.COMMON_OK:
            return  t('common.ok');
        case TranslateKey.LISTEN_TO_ARTICLE:
            return t('opinionArticleDetail.listenToArticle')
        case TranslateKey.ONBOARD_SUCCESS_MESSAGE:
            return t('onboardSuccess.successMessage')
        case TranslateKey.ONBOARD_SUCCESS_MAIL_ACKNOWLEDGEMENT:
            return t('onboardSuccess.mailAcknowledgement')
        case TranslateKey.ONBOARD_SUCCESS_GO_TO_HOME:
            return t('onboardSuccess.goToHome')
        case TranslateKey.ONBOARD_SUCCESS_GO_TO_MY_NEWS:
            return t('onboardSuccess.goToMyNews')
        case TranslateKey.WEATHER_DETAILS_SUNRISE:
            return t('weatherDetail.sunrise')
        case TranslateKey.WEATHER_DETAILS_SUNSET:
            return t('weatherDetail.sunset')
        case TranslateKey.WEATHER_DETAILS_SIDEBAR:
            return t('weatherDetail.sidebarTitle')
        case TranslateKey.WEATHER_DETAILS_MAX:
            return t('weatherDetail.max')
        case TranslateKey.WEATHER_DETAILS_HUMIDITY:
            return t('weatherDetail.humidity')
        case TranslateKey.WEATHER_DETAILS_SPEED:
            return t('weatherDetail.speed')
        case TranslateKey.WEATHER_DETAILS_KMH:
            return t('weatherDetail.kmh')
        case TranslateKey.WEATHER_DETAILS_VISIBILITY:
            return t('weatherDetail.visibility')
        case TranslateKey.WEATHER_DETAILS_PRESSURE:
            return t('weatherDetail.pressure')
        case TranslateKey.WEATHER_DETAILS_SEA_CONDITION:
            return t('weatherDetail.seaCondition')
        case TranslateKey.WEATHER_DETAILS_KM:
            return t('weatherDetail.km')
        case TranslateKey.WEATHER_DETAILS_MBAR:
            return t('weatherDetail.mbar')
        case TranslateKey.WEATHER_DETAILS_ENABLE_LOCATION:
            return t('weatherDetail.enableLocation')
        default: return ''
    }
}
