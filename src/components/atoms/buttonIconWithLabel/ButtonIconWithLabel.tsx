import { StyleProp, StyleSheet, TextStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { Label } from 'src/components/atoms/label/Label'
import { ImagesName } from 'src/shared/styles'
import { isIOS } from 'src/shared/utils'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts'

interface ButtonIconWithLabelProps {
    icon: ImagesName,
    iconColor: string,
    title: string,
    titleStyle?: StyleProp<TextStyle>;
    onPress: () => void
}

export const ButtonIconWithLabel = ({
    icon,
    iconColor,
    title,
    titleStyle,
    onPress
}: ButtonIconWithLabelProps) => {
    const style = useThemeAwareObject(customStyle)
    return (
        <TouchableOpacity style={style.container} onPress={onPress}>
            {
                getSvgImages({
                    name: icon,
                    width: 14,
                    height: 12,
                    fill: iconColor,
                })
            }
            <Label style={StyleSheet.flatten([style.title, titleStyle])} children={title} />
        </TouchableOpacity>
    )
}

const customStyle = () => (
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            fontSize: 14,
            lineHeight: 17,
            marginLeft: 5,
            fontFamily: fonts.AwsatDigital_Bold,
            paddingTop: isIOS ? 5 : 0
        },
    })
)
