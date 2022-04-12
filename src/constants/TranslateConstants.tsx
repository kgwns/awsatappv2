import React from 'react'
import { useTranslation } from 'react-i18next'

export enum TranslateKey {
    RETURN
}

export const TranslateConstants = ({
    key
}: { key: TranslateKey }) => {
    const [t] = useTranslation()

    switch (key) {
        case TranslateKey.RETURN:
            return t('onBoard.common.return')
        default: return ''
    }
}
