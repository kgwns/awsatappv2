import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { isIOS, normalize } from 'src/shared/utils'
import { ImagesName } from 'src/shared/styles'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { Label } from '../label/Label'
import { TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { CustomThemeType } from 'src/shared/styles/colors'
import { fonts } from 'src/shared/styles/fonts'

type BackIconType = {
    containerStyle?: StyleProp<ViewStyle>, 
    onPressBack: () => void
}

export const BackIcon = ({
    containerStyle,
    onPressBack
}: BackIconType) => {
    const style = useThemeAwareObject(customStyle)
    const CONST_RETURN = TranslateConstants({ key: TranslateKey.RETURN })

    return (
        <TouchableOpacity testID={'onPressbackTestID'}
            style={[style.returnStyle,containerStyle]}
            onPress={onPressBack}>
            {
                getSvgImages({
                    name: ImagesName.returnBlackSvg,
                    width: 12,
                    height: 8.8,
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
        width: 12,
        height: 8.8,
        marginEnd: 5,
        alignItems: 'center',
    },
    prevTitleStyle: {
        fontSize: 14,
        lineHeight: 30,
        color: theme.primaryBlack,
        fontFamily: fonts.AwsatDigital_Regular,
    },
    returnStyle: {
        flexDirection: 'row',
        position: 'absolute',
        left: isIOS ? normalize(15) : normalize(20),
        top: isIOS ? normalize(50) : normalize(20),
        alignContent: 'center',
        alignItems: 'center',
    },
})
