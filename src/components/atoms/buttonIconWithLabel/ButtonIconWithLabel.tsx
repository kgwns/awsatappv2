import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Label, LabelTypeProp } from '..'
import { ImagesName } from 'src/shared/styles'
import { normalize } from 'src/shared/utils'
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
                    width: normalize(14),
                    height: normalize(12),
                    fill: iconColor,
                })
            }
            <Label style={style.title} children={title} labelType={LabelTypeProp.h3} />
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
            fontSize: normalize(13),
            lineHeight: normalize(16),
            marginLeft: normalize(5),
            fontFamily: fonts.AwsatDigitalBetav10_Bold,
        },
    })
)
