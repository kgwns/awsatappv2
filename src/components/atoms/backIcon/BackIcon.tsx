import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { isIOS, normalize } from 'src/shared/utils'
import { ImagesName } from 'src/shared/styles'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { Label } from '../label/Label'
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants'
import { CustomThemeType } from 'src/shared/styles/colors'
import { fonts } from 'src/shared/styles/fonts'

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
        paddingHorizontal: normalize(10)
    },
    prevTitleStyle: {
        fontSize: normalize(13),
        lineHeight: normalize(20),
        color: theme.primaryBlack,
        fontFamily: fonts.AwsatDigitalBetav10_Regular,
    },
    returnStyle: {
        flexDirection: 'row',
        position: 'absolute',
        left: normalize(15),
        top: isIOS ? normalize(50) : normalize(10),
        alignContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
})