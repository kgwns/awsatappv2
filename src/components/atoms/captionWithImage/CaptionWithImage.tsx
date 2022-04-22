import React from 'react'
import { View, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { Label, LabelTypeProp } from '..'
import { normalize, screenWidth } from 'src/shared/utils'

interface captionWithImageProps {
    title?: string,
    icon?: () => void,
    color?: string,
    style?: object,
    labelStyle?: StyleProp<TextStyle>,
    numberOfLine?: number,
}

const CaptionWithImage = ({ title, icon, color, style, labelStyle, numberOfLine }: captionWithImageProps) => {
    return (
        <View style={style}>
            <View style={captionImageStyle.container}>
                {icon &&
                    icon()
                }
                <View style={captionImageStyle.labelContainer}>
                    <Label children={title} color={color} labelType={LabelTypeProp.p5} numberOfLines={numberOfLine ? numberOfLine :1}
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
        maxWidth: screenWidth * 0.6
    },
    textLabel: {
        paddingVertical: normalize(1),
    }
})