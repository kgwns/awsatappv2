import React from 'react'
import { useTranslation } from 'react-i18next'

export enum TranslateKey {
    RETURN,
    NOT_SUBSCRIBED,
    DESCRIPTION,
    SIGN_UP
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
        default: return ''
    }
}
