import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Label, LabelTypeProp } from '..'
import { ImagesName } from 'src/shared/styles'
import { isIOS, normalize } from 'src/shared/utils'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts'

interface ButtonIconWithLabelProps {
    icon: ImagesName,
    iconColor: string,
    title: string,
    onPress: () => void
}

export const ButtonIconWithLabel = ({
    icon,
    iconColor,
    title,
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
            <Label style={style.title} children={title} />
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
            fontFamily: fonts.AwsatDigitalBetav10_Bold,
            paddingTop: isIOS ? 5 : 0
        },
    })
)
