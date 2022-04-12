import React from 'react'
import { View, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { Label, LabelTypeProp } from '..'
import { normalize } from '../../../shared/utils'

interface captionWithImageProps {
    title?: string,
    icon?: () => void,
    color?: string,
    style?: object,
    labelStyle?: StyleProp<TextStyle>
}

const CaptionWithImage = ({ title, icon, color, style, labelStyle }: captionWithImageProps) => {
    return (
        <View style={style}>
            <View style={captionImageStyle.container}>
                {icon &&
                    icon()
                }
                <View style={captionImageStyle.labelContainer}>
                    <Label children={title} color={color} labelType={LabelTypeProp.p5} numberOfLines={1}
                        style={StyleSheet.flatten([captionImageStyle.textLabel, labelStyle])}
                    />
                </View>
            </View>
        </View>
    )
}

export default CaptionWithImage

const captionImageStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelContainer: {
        flexShrink: 1,
        flexBasis: 'auto',
        paddingRight: normalize(5),
    },
    textLabel: {
        paddingVertical: normalize(1),
    }
})