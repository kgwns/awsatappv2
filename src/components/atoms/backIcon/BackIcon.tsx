import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { isIOS, normalize } from 'src/shared/utils'
import { ImagesName } from 'src/shared/styles'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { Label } from '../label/Label'
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants'
import { CustomThemeType } from 'src/shared/styles/colors'

type BackIconType = {
    onPressBack: () => void
}

export const BackIcon = ({
    onPressBack
}: BackIconType) => {
    const style = useThemeAwareObject(customStyle)
    const CONST_RETURN = TranslateConstants({ key: TranslateKey.RETURN })

    return (
        <TouchableOpacity testID={'onPressbackTestID'}
            style={style.returnStyle}
            onPress={onPressBack}>
            {
                getSvgImages({
                    name: ImagesName.returnBlackSvg,
                    width: normalize(12),
                    height: normalize(8.8),
                    style: style.prevIconStyle
                })
            }
            <Label style={style.prevTitleStyle}
                children={CONST_RETURN}
            />
        </TouchableOpacity>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    prevIconStyle: {
        width: normalize(12),
        height: normalize(8.8),
        marginEnd: normalize(5),
        alignItems: 'center',
        // color: Styles.color.white,
        paddingHorizontal: normalize(10)
    },
    prevTitleStyle: {
        fontSize: normalize(13),
        lineHeight: normalize(16),
        color: theme.primaryBlack,
    },
    returnStyle: {
        flexDirection: 'row',
        position: 'absolute',
        left: normalize(15),
        top: isIOS ? normalize(50) : 0,
        alignContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
})